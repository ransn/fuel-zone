import React, {useState, useEffect} from 'react';
import { RefreshControl, ScrollView, View, Text, Alert } from 'react-native';
import { Card, ListItem, Avatar, Badge, SpeedDial, Divider, Button } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

const badgeStatus = {
  "N": "primary",
  "A": "success",
  "I": "error",
  "D": "deleted"
}

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function WorkScreen({ navigation, route }) {
  const workRef = firestore().collection('works');
  const [workList,setWorkList] = useState([]);
  const [open,setOpen] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const createWork = () => {
    setOpen(false);
    navigation.navigate("WorkDetails");
  }

  useEffect(() => {
    const subscriber = workRef.where('status', "!=", 'D').onSnapshot(onResult, onError);
    return () => subscriber();
  }, []);

  function onResult(querySnapshot) {
    const list = [];
    querySnapshot.forEach(documentSnapshot => {
      const data = documentSnapshot.data();
        list.push(data);
    });
    setWorkList(list);
  }

  function onError(error) {
    console.error(error);
  }

  const navigateTo = (work) => {
    if(work.status == "I"){
      navigation.navigate('WorkReport', {workId: work.id})
    }else{
      navigation.navigate('WorkDetails', {workItem: work})
    }
  }

  return (
    <View style={{flex:1}}>
    {
      workList.length == 0 &&
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Text style={{color:'#3a414e', fontSize:18, fontWeight:'bold'}}> 
            Out of work
        </Text>
        <Text style={{color:'#3a414e', fontSize:15, fontWeight:'bold'}}> 
            Please click + below to Add Work
        </Text>
      </View>
    }
    
    <ScrollView 
      style={{flex:1}}
      refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
    >
  {
    workList.map((l, i) => (
      <ListItem key={i} bottomDivider onPress={() => navigateTo(l)}>
        <Avatar rounded source={require('../../images/pump.png')} />
        <ListItem.Content>
          <ListItem.Title>{l.name}</ListItem.Title>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color:'gray'}}>Pump: </Text>
            <Text style={{color:'gray', fontWeight:'bold'}}>{ l.pumpName}</Text>
            <Text style={{color:'gray'}}>, Assigned:</Text>
            <Text style={{color:'gray', fontWeight:'bold'}}> { l.operatorName}</Text>
          </View>
        </ListItem.Content>
        <Badge status={badgeStatus[l.status]} value={l.status}/>
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
      onPress={createWork}
    />
  </SpeedDial>
</View>
  );
}

export default WorkScreen;