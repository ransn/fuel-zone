import React, {useState, useEffect} from 'react';
import { RefreshControl, ScrollView, View, Text, Alert } from 'react-native';
import { Card, ListItem, Avatar, Badge, SpeedDial, Divider, Button } from 'react-native-elements';

const badgeStatus = {
  "N": "primary",
  "A": "success",
  "I": "error"
}

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function WorkScreen({ navigation, route }) {
  const [workList,setWorkList] = useState([]);
  const [open,setOpen] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const createWork = () => {
    let workName = '';
    if(workList.length == 0){
      workName = "Work "+Number(workList.length+1);
    }else{
      let lastWork = workList[workList.length-1];
      let nameParts = lastWork.name.split(' ');
      let lastNumber = Number(nameParts[1]);
      workName = "Work "+Number(lastNumber+1);
    }
    navigation.navigate("WorkDetails", {workName: workName});
  }

  useEffect(()=>{
    if (route.params?.work) {
      const{work} = route.params;
      let nameArray = workList.map(item => {
        return item.name;
      });
      if(!nameArray.includes(work.name)){
        workList.push(work);
        setWorkList(workList);
        setOpen(!open);
      }
    }
  }, [route.params?.work]);

  const deleteWork = (workName) => {
    Alert.alert(
      "Delete Work",
      "Are you sure to delete this work ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
            var filteredWorkList = workList.filter(function(work, index, arr){
              return work.name != workName;
            });
            setWorkList(filteredWorkList);
        } }
      ]
    );
  }

  const navigateTo = (work) => {
    if(work.status == "I"){
      navigation.navigate('WorkReport', {workItem: work})
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
      <ListItem.Swipeable key={i} bottomDivider onPress={() => navigateTo(l)}
          rightContent={
            <Button
              title="Delete"
              icon={{ name: 'delete', color: 'white' }}
              buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
              onPress={()=>{deleteWork(l.name)}}
            />
          }
      >
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
      onPress={createWork}
    />
  </SpeedDial>
</View>
  );
}

export default WorkScreen;