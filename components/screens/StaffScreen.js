import React, {useState, useEffect} from 'react';
import { RefreshControl, ScrollView, View, Text, Alert } from 'react-native';
import { Input, Card, ListItem, Avatar, Badge, SpeedDial, Divider, Button, Overlay } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

function StaffScreen({ navigation }) {
  const ref = firestore().collection('staffs');
  const [staffs, setStaffs] = useState([]);
  const [visibleForm, setVisibleForm] = useState(false);
  const [staffDetails, setStaffDetails] = useState({
    name: '',
    mobileNumber: 0,
    status:'A'
  });
  const [open,setOpen] = useState(false);
  const [editUser, setEditUser] = useState(false);

  useEffect(() => {
    const subscriber = ref.where("status", "==", 'A').onSnapshot(onResult, onError);
    return () => subscriber();
  }, []);

  function onResult(querySnapshot) {
    const list = [];
    querySnapshot.forEach(documentSnapshot => {
      const data = documentSnapshot.data();
        list.push({
          id: documentSnapshot.id,
          name: data.name,
          mobileNumber: data.mobileNumber
        });
    });
    setStaffs(list);
  }

  function onError(error) {
    console.error(error);
  }

  const toggleStaffDetailsOverlay = () => {
    setVisibleForm(!visibleForm);
    setOpen(!visibleForm);
  };

  const addStaff = () => {
    ref.add(staffDetails).then(()=>{
      console.log('Staff details added');
    });
    toggleStaffDetailsOverlay();
  };

  const updateStatus = (details) => {
    Alert.alert(
      "Inactivate Staff",
      "Are you sure to inactivate this staff ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
            ref.doc(details.id).update({status: 'I', updatedAt: firestore.FieldValue.serverTimestamp()}).then(() => {
              console.log('Updated to Inactive staff');
            });
          } 
        }
      ]
    );
  };

  const updateStaff = () => {
    ref.doc(staffDetails.id).update({...staffDetails, updatedAt: firestore.FieldValue.serverTimestamp()}).then(() => {
      console.log('Staff details updated');
    });
    toggleStaffDetailsOverlay();
  };

  const onCreateStaff = () => {
    setEditUser(false);
    setStaffDetails({
      name:'',
      mobileNumber: '',
      status: 'A',
      createdAt: firestore.FieldValue.serverTimestamp()
    });
    toggleStaffDetailsOverlay();
  }

  const onEditStaff = (staff) => {
    setEditUser(true);
    setStaffDetails(staff);
    toggleStaffDetailsOverlay()
  }

  return (
    <View style={{flex:1}}>
      <ScrollView style={{flex:1}}>
      <Overlay overlayStyle={{height: 280, width: 350, borderRadius: 10}} isVisible={visibleForm} onBackdropPress={toggleStaffDetailsOverlay} supportedOrientations={['portrait', 'landscape']}>
          <ScrollView style={{flex: 1}}>
            <Text style={{flex:0.9, padding: 5, fontSize:15, fontWeight:'bold' }}>Staff Details:</Text>
            <Input label='Name' 
                onChangeText={name => setStaffDetails({...staffDetails, name:name})} 
                value={staffDetails.name.toString()}/>
            <Input label='Mobile' 
                maxLength={10} 
                onChangeText={mobileNumber => setStaffDetails({...staffDetails, mobileNumber: mobileNumber})} 
                keyboardType='numeric' 
                value={staffDetails.mobileNumber.toString()}/>
            <Button title={editUser ? 'Save':'Add'} onPress={editUser ? updateStaff:addStaff}/>
          </ScrollView>
      </Overlay>
  {
    staffs.map((l, i) => (
      <ListItem.Swipeable key={i} bottomDivider
          rightContent={
            <Button
              title="Inactive"
              icon={{ name: 'delete', color: 'white' }}
              buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
              onPress={()=>{updateStatus(l)}}
            />
          }
      >
        <Avatar rounded source={require('../../images/user.png')} />
        <ListItem.Content>
          <ListItem.Title>{l.name}</ListItem.Title>
          <ListItem.Subtitle>{l.mobileNumber}</ListItem.Subtitle>
        </ListItem.Content>
        <Button icon={{name: "create-outline", type:'ionicon', size: 20, color: "dodgerblue"}} type='clear' onPress={()=>{onEditStaff(l)}}/>
      </ListItem.Swipeable>
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
      onPress={onCreateStaff}
    />
  </SpeedDial>
</View>
  );
}

export default StaffScreen;