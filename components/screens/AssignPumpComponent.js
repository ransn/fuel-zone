import React, {useEffect} from 'react';
import { Button, View, Text, useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ListItem, Avatar, Divider, CheckBox } from 'react-native-elements';

const list = [
  {
    name: 'Pump 1',
    subtitle: 'Assigned: Pump 1',
  },
  {
    name: 'Pump 2',
    subtitle: 'Assigned: Pump 2'
  },
  {
    name: 'Pump 3',
    subtitle: 'Assigned: Pump 3'
  },
  {
    name: 'Pump 4',
    subtitle: 'Assigned: Pump 4'
  },
  {
    name: 'Air Pump',
    subtitle: 'Assigned: Air Pump'
  }
]
function AssignPumpComponent(props, { navigation }) {

  useEffect(() => {
    
  }, [props.actionName]);

  return (
    <View>
  {
    list.map((l, i) => (
      <ListItem key={i} bottomDivider onPress={props.actionName(l.name)}>
        <CheckBox
          center
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={false}
        />
        <ListItem.Content>
          <ListItem.Title>{l.name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    ))
  }
</View>
  );
}

export default AssignPumpComponent;