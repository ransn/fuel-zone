import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card, ListItem, Avatar, Badge } from 'react-native-elements';

const list = [
  {
    name: 'Work 1',
    pumpName: 'Pump 1',
    staffName: 'Amy Farha',
    status: "A"
  },
  {
    name: 'Work 2',
    pumpName: 'Pump 2',
    staffName: 'Chris Jackson',
    status: "I"
  },
  {
    name: 'Work 3',
    pumpName: 'Pump 3',
    staffName: 'Sharath',
    status: "A"
  },
  {
    name: 'Work 4',
    pumpName: 'Pump 4',
    staffName: 'Raju',
    status: "N"
  }
]

const badgeStatus = {
  "N": "primary",
  "A": "success",
  "I": "error"
}

function PumpScreen({ navigation }) {
  return (
    <ScrollView style={{flex:1}}>
  {
    list.map((l, i) => (
      <ListItem key={i} bottomDivider onPress={() => navigation.navigate('StaffDetails', {pump: l})}>
        <Avatar rounded source={require('../../images/pump.png')} />
        <ListItem.Content>
          <ListItem.Title>{l.name}</ListItem.Title>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color:'gray'}}>Pump: </Text>
            <Text style={{color:'gray', fontWeight:'bold'}}>{ l.pumpName}</Text>
            <Text style={{color:'gray'}}>, Assigned:</Text>
            <Text style={{color:'gray', fontWeight:'bold'}}> { l.staffName}</Text>
          </View>
        </ListItem.Content>
        <Badge status={badgeStatus[l.status]} value={l.status}/>
        <ListItem.Chevron />
      </ListItem>
    ))
  }
</ScrollView>
  );
}

export default PumpScreen;