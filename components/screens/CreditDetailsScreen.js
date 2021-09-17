import React, {useState, useEffect} from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { CheckBox, ListItem, Divider, Icon, Button, Text, Overlay, Input } from 'react-native-elements';
import AddCreditOverlay from "./AddCreditOverlay";

function CreditDetailsScreen({ route, navigation }) {
  const {credit} = route.params;
  const [credits, setCredits] = useState([]);
  const [balance, setBalance] = useState(Number(0));

  useEffect(() => {
    navigation.setOptions({ title: credit.userName});
  });

  const addCredit = (details) => {
    credits.push(details);
    setCredits(credits);
    setBalance(Number(balance)+Number(details.amount));
  }

  const deleteCredit = (credit, index) => {
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
            var filteredCreditList = credits.filter(function(credit, ind, arr){
              return ind != index;
            });
            setCredits(filteredCreditList);
            setBalance(Number(balance)-Number(credit.amount));
        } }
      ]
    );
  }

  
  return (
    <ScrollView>
    <View style={{flex:1, flexDirection: 'row', padding:10}}>
        <View style={{flex:2.5, alignItems:'flex-start'}}>
          <Text style={{ paddingTop:10, fontSize:20, fontWeight:'bold' }}>Balance: {balance.toFixed(2)}</Text>
        </View>
        <View style={{flex:1, alignItems:'flex-end'}}>
          <AddCreditOverlay update={addCredit}/>
        </View>
    </View>
    <Divider />
    {
      credits.map( (l, i) => (
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
          <Text style={{padding: 5, fontSize:15, fontWeight:'bold'}}>{l.date}</Text>
          <View style={{flex:1, flexDirection: 'row', paddingLeft:5}}>
            <Text style={{ flex:1, fontSize:15}}>{l.fuelType} Liters: {l.liters}</Text>
            <Text style={{ flex:1, fontSize:15 }}>Amount: {l.amount}</Text>
          </View>
        </ListItem.Content>
        <Button icon={{name: 'trash', type:'ionicon', size: 20, color: "dodgerblue"}} 
          type='clear' onPress={() => deleteCredit(l, i)}/>
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