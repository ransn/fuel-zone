import React from 'react';
import { View, Text } from 'react-native';
import { ListItem, Avatar, Divider } from 'react-native-elements';

const list = [
  {
    name: 'Pump 1',
    avatar_url: 'https://i.imgur.com//ee89Mrg.jpg'
  },
  {
    name: 'Pump 2',
    avatar_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg'
  },
  {
    name: 'Pump 3',
    avatar_url: 'https://i.imgur.com//ee89Mrg.jpg'
  },
  {
    name: 'Pump 4',
    avatar_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg'
  }
]
function PumpScreen({ navigation }) {
  return (
    <View>
  {
    list.map((l, i) => (
      <ListItem key={i} bottomDivider onPress={() => navigation.navigate('PumpDetails', {pump: l})}>
        <Avatar rounded source={require('../../images/pump.png')} />
        <ListItem.Content>
          <ListItem.Title>{l.name}</ListItem.Title>
          <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ))
  }
</View>
  );
}

export default PumpScreen;