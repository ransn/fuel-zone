import React, {useState, useEffect} from 'react';
import { RefreshControl, ScrollView, View, Alert } from 'react-native';
import { Text, Card, ListItem, Input, Avatar, Badge, SpeedDial, Divider, Button, SearchBar, Overlay } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function CreditScreen({ navigation, route }) {
  const ref = firestore().collection('creditUsers');
  const [search, setSearch] = useState('');
  const [visibleForm, setVisibleForm] = useState(false);
  const [creditUsers,setCreditUsers] = useState([]);
  const [filteredUsers,setFilteredUsers] = useState([]);
  const [open,setOpen] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [userDetails, setUserDetails] = useState({
    userName:'',
    userMobileNumber: '',
    totalBalance: Number(0)
  })
  const [editUser, setEditUser] = useState(false);

  useEffect(() => {
    const subscriber = ref.onSnapshot(onResult, onError);
    return () => subscriber();
  }, []);

  function onResult(querySnapshot) {
    const list = [];
    querySnapshot.forEach(documentSnapshot => {
      const data = documentSnapshot.data();
        list.push({
          id: documentSnapshot.id,
          userName: data.userName,
          userMobileNumber: data.userMobileNumber,
          totalBalance: data.totalBalance
        });
    });
    setCreditUsers(list);
    setFilteredUsers(list);
  }

  function onError(error) {
    console.error(error);
  }
 
  updateSearch = (query) => {
    setSearch(query);
    if(query.length > 0){
      var filteredUsersList = creditUsers.filter(function(user, index, arr){
        return user.userName.toUpperCase().includes(query.toUpperCase());
      });
      setFilteredUsers(filteredUsersList);
    }else{
      setFilteredUsers(creditUsers);
    }
  }

  const toggleAddCreditUserOverlay = () => {
    setVisibleForm(!visibleForm);
    setOpen(!visibleForm);
  };

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);

  const addCreditUser = () => {
    ref.add(userDetails).then(()=>{
      console.log('Added successfully');
    });
    toggleAddCreditUserOverlay();
  };

  const updateCreditUser = () => {
    ref.doc(userDetails.id).update(userDetails).then(() => {
      console.log('Updated successfully');
    });
    toggleAddCreditUserOverlay();
  };
  
  const onCreateUser = () => {
    setEditUser(false);
    setUserDetails({
      userName:'',
      userMobileNumber: '',
      totalBalance: Number(0)
    });
    toggleAddCreditUserOverlay()
  }

  const onEditUser = (user) => {
    setEditUser(true);
    setUserDetails(user);
    toggleAddCreditUserOverlay()
  }

  return (
    <View style={{flex:1}}>
    {
      creditUsers.length == 0 &&
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Text style={{color:'#3a414e', fontSize:18, fontWeight:'bold'}}> 
            No credit users
        </Text>
        <Text style={{color:'#3a414e', fontSize:15, fontWeight:'bold'}}> 
            Click + below to add credit user
        </Text>
      </View>
    }
    
    <ScrollView 
      style={{flex:1}}>
    <Overlay overlayStyle={{height: 280, width: 350, borderRadius: 10}} isVisible={visibleForm} onBackdropPress={toggleAddCreditUserOverlay} supportedOrientations={['portrait', 'landscape']}>
          <ScrollView style={{flex: 1}}>
            <Text style={{flex:0.9, padding: 5, fontSize:15, fontWeight:'bold' }}>Credit User:</Text>
            <Input label='Name' 
                onChangeText={name => setUserDetails({...userDetails, userName:name})} 
                value={userDetails.userName.toString()}/>
            <Input label='Mobile' 
                maxLength={10} 
                onChangeText={mobileNumber => setUserDetails({...userDetails, userMobileNumber: mobileNumber})} 
                keyboardType='numeric' 
                value={userDetails.userMobileNumber.toString()}/>
            <Button title={editUser ? 'Save':'Add'} onPress={editUser ? updateCreditUser:addCreditUser}/>
          </ScrollView>
      </Overlay>
  {
    creditUsers.length > 0 &&
    <View>
    <SearchBar
        placeholder="Type Name..."
        onChangeText={text => updateSearch(text)}
        value={search}
        lightTheme = 'false'
        round = 'true'
      />
    </View>
  }
     
   {
    filteredUsers.map((l, i) => (
      <ListItem key={i} bottomDivider onPress={()=>{
        navigation.navigate('CreditDetails', {
          credit: l
        })
      }}>
        <Avatar rounded source={require('../../images/user.png')} icon={{name: 'person', type: 'ionicon'}}/>
        <ListItem.Content>
          <ListItem.Title>{l.userName}</ListItem.Title>
          <Text style={{color:'#3a414e', fontSize:13}}> 
            Mobile: {l.userMobileNumber}
          </Text>
          <Text style={{color:'#3a414e', fontSize:13, fontWeight:'bold'}}> 
            Balance: {l.totalBalance}
          </Text>
        </ListItem.Content>
        <Button icon={{name: "create-outline", type:'ionicon', size: 20, color: "dodgerblue"}} type='clear' onPress={()=>{onEditUser(l)}}/>
        <ListItem.Chevron />
      </ListItem>
    ))
  }
  
  
</ScrollView>
    <SpeedDial
      isOpen={open}
      icon={{ name: 'add', color: '#fff' }}
      openIcon={{ name: 'close', color: '#fff' }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
    >
      <SpeedDial.Action
        icon={{ name: 'add', color: '#fff' }}
        title="Add"
        onPress={onCreateUser}
      />
    </SpeedDial>
</View>
  );
}

export default CreditScreen;