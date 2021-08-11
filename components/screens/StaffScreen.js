import React from 'react';
import { Button, View, Text, useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ListItem, Avatar } from 'react-native-elements';

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://i.imgur.com//ee89Mrg.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
    subtitle: 'Vice Chairman'
  }
]
function StaffScreen({ navigation }) {
  return (
    <View>
  {
    list.map((l, i) => (
      <ListItem key={i} bottomDivider>
        <Avatar rounded source={{uri: l.avatar_url}} />
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

export default StaffScreen;