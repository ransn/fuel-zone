import React, {useState, useEffect} from 'react';
import { ListItem, Icon } from 'react-native-elements'
import { Button, View, Text } from 'react-native';

const list = [
  {
    title: 'Set Fuel Prize',
    icon: 'rupee',
    navigateTo: 'FuelPrize'
  }
]
function SettingsScreen({ navigation, route }) {
  const [prizeDetails, setPrizeDetails] = useState({});
  useEffect(()=>{
    if(route.param?.prizeDetails ){
      setPrizeDetails(prizeDetails);
    }
  }, []);
  return (
    <View>
  {
    list.map((item, i) => (
      <ListItem key={i} bottomDivider onPress={ () => {navigation.navigate(item.navigateTo)}}>
        <Icon name={item.icon}   type='font-awesome'/>
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ))
  }
</View>
  );
}

export default SettingsScreen;