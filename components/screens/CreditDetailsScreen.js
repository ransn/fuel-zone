import React, {useState, useEffect} from 'react';
import { View, Image, useColorScheme, ScrollView } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card, ListItem, Avatar, Divider, Icon, Button, Text, Overlay, Input } from 'react-native-elements';

var list = [
  {
    date: '10/7/2021',
    liters: 10,
    amount: '1050'
  },
  {
    date: '11/7/2021',
    liters: 11,
    amount: '1050'
  },
  {
    date: '12/7/2021',
    liters: 12,
    amount: '1050'
  },
  {
    date: '13/7/2021',
    liters: 13,
    amount: '1050'
  },
  {
    date: '14/7/2021',
    liters: 14,
    amount: '1050'
  },
  {
    date: '10/7/2021',
    liters: 10,
    amount: '1050'
  },
  {
    date: '11/7/2021',
    liters: 11,
    amount: '1050'
  },
  {
    date: '12/7/2021',
    liters: 12,
    amount: '1050'
  },
  {
    date: '13/7/2021',
    liters: 13,
    amount: '1050'
  },
  {
    date: '14/7/2021',
    liters: 14,
    amount: '1050'
  },
  {
    date: '10/7/2021',
    liters: 10,
    amount: '1050'
  },
  {
    date: '11/7/2021',
    liters: 11,
    amount: '1050'
  },
  {
    date: '12/7/2021',
    liters: 12,
    amount: '1050'
  },
  {
    date: '13/7/2021',
    liters: 13,
    amount: '1050'
  },
  {
    date: '14/7/2021',
    liters: 14,
    amount: '1050'
  }
]

function CreditDetailsScreen({ route, navigation }) {
  const {credit} = route.params;
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    navigation.setOptions({ title: credit.name});
  });
  
  return (
    <ScrollView>
    <View style={{flex:1, alignItems:'center', padding:10}}>
      <Text h4 style={{fontWeight: 'bold'}}>Credit Details</Text>
    </View>
    <Divider />
    <View style={{flex:1, flexDirection: 'row', padding:10}}>
        <View style={{flex:1, alignItems:'flex-start'}}>
          <Text style={{ paddingTop:10, fontSize:20, fontWeight:'bold' }}>Balance: {credit.subtitle}</Text>
        </View>
        <View style={{flex:1, alignItems:'flex-end'}}>
          <Button icon={{name: 'add-circle', type:'ionicon', size: 30, color: "dodgerblue"}} type='clear' onPress={toggleOverlay}/>
          <Overlay overlayStyle={{height: 200, width: 350, borderRadius: 10}} isVisible={visible} onBackdropPress={toggleOverlay} supportedOrientations={['portrait', 'landscape']}>
          <ScrollView style={{flex: 1}}>
            <Text style={{flex:0.9, padding: 10, fontSize:15, fontWeight:'bold' }}>Add Credit:</Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}}><Input label='Liters*'/></View>
              <View style={{flex:1}}><Input label='Amount*'/></View>
            </View>
            <Button title='Add' onPress={toggleOverlay}/>
          </ScrollView>
        </Overlay>
        </View>
    </View>
    <Divider />
    {
      list.map( (l, i) => (
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
          <Text style={{padding: 5, fontSize:15, fontWeight:'bold'}}>{l.date}</Text>
          <View style={{flex:1, flexDirection: 'row', paddingLeft:5}}>
            <Text style={{ flex:1, fontSize:15}}>Liters: {l.liters}</Text>
            <Text style={{ flex:1, fontSize:15 }}>Amount: {l.amount}</Text>
          </View>
        </ListItem.Content>
        <Button icon={{name: 'trash', type:'ionicon', size: 20, color: "dodgerblue"}} type='clear' onPress={() => {
          console.log(i);
          // var item = list.splice(i,1);
          // console.log(item.liters);
        }}/>
      </ListItem>
    ))
    }
    </ScrollView>
  );
}

export default CreditDetailsScreen;