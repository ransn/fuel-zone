import React from 'react';
import { ListItem, Icon } from 'react-native-elements'
import { Button, View, Text } from 'react-native';

const list = [
  {
    title: 'Set Fuel Prize',
    icon: 'rupee',
    subtitle: 'petrol: 105.25, diesel: 103.23',
    navigateTo: 'FuelPrize'
  },
  {
    title: 'Set Oil Prize',
    icon: 'rupee',
    subtitle: 'oil: 20',
    navigateTo: 'OilPrize'
  },
  {
    title: 'Active/Inactive Pumps',
    icon: 'rupee',
    subtitle: 'pump 4'
  },
  {
    title: 'Load/Unload Fuel',
    icon: 'rupee'
  }
]
function SettingsScreen({ navigation }) {
  return (
    <View>
  {
    list.map((item, i) => (
      <ListItem key={i} bottomDivider onPress={ () => {navigation.navigate(item.navigateTo)}}>
        <Icon name={item.icon}   type='font-awesome'/>
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
          <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ))
  }
</View>
  );
}

export default SettingsScreen;