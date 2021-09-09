import React, {useState, useEffect} from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import { Card, ListItem, Avatar, Badge, SpeedDial, Divider, Button } from 'react-native-elements';

const badgeStatus = {
  "N": "primary",
  "A": "success",
  "I": "error"
}

function WorkScreen({ navigation, route }) {
  const [workList,setWorkList] = useState([]);
  const [open,setOpen] = useState(false);
  const createWork = () => {
    let workName = '';
    if(workList.length == 0){
      workName = "Work "+parseInt(workList.length+1);
    }else{
      let lastWork = workList[workList.length-1];
      let nameParts = lastWork.name.split(' ');
      let lastNumber = parseInt(nameParts[1]);
      workName = "Work "+parseInt(lastNumber+1);
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

  return (
    <View style={{flex:1}}>
    {
      workList.length == 0 &&
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Text style={{color:'#3a414e', fontSize:18, fontWeight:'bold'}}> 
            Out of work, Please Add Work
        </Text>
      </View>
    }
    
    <ScrollView style={{flex:1}}>
  {
    workList.map((l, i) => (
      <ListItem.Swipeable key={i} bottomDivider onPress={() => navigation.navigate('WorkDetails', {workItem: l})}
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
      icon={{ name: 'edit', color: '#fff' }}
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