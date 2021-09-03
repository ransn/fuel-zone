import React, {useState, useEffect} from 'react';
import { View, ScrollView } from 'react-native';
import { ListItem, Divider, Icon, Button, Text, Overlay, Input } from 'react-native-elements';

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
  }
]

function CreditDetailsScreen({ route, navigation }) {
  const {credit} = route.params;
  const [visible, setVisible] = useState(false);
  const [visibleEditOverlay, setVisibleEditOverlay] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const toggleEditCreditUserOverlay = () => {
    setVisibleEditOverlay(!visibleEditOverlay);
  };

  useEffect(() => {
    navigation.setOptions({ title: credit.name});
  });
  
  return (
    <ScrollView>
    <Divider />
    <View style={{flex:1, flexDirection: 'row', padding:10}}>
        <View style={{flex:2.5, alignItems:'flex-start'}}>
          <Text style={{ paddingTop:10, fontSize:20, fontWeight:'bold' }}>Balance: {credit.subtitle}</Text>
        </View>
        <View style={{flex:1, flexDirection: 'row', alignItems:'flex-end'}}>
          <Button icon={{name: "create", type:'ionicon', size: 30, color: "dodgerblue"}} type='clear' onPress={toggleEditCreditUserOverlay}/>
          <Overlay overlayStyle={{height: 280, width: 350, borderRadius: 10}} isVisible={visibleEditOverlay} onBackdropPress={toggleEditCreditUserOverlay} supportedOrientations={['portrait', 'landscape']}>
            <ScrollView style={{flex: 1}}>
              <Text style={{flex:0.9, padding: 10, fontSize:15, fontWeight:'bold' }}>Edit:</Text>
              <Input label='Name' value={credit.name}/>
              <Input label='Mobile' value={credit.mobile}/>
              <Button title='Save' onPress={toggleEditCreditUserOverlay}/>
            </ScrollView>
          </Overlay>
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
        }}/>
      </ListItem>
    ))
    }
    <View style={{padding:10}}>
      <Button title='Delete Account'/>
    </View>
    </ScrollView>
  );
}

export default CreditDetailsScreen;