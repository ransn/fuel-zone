import React, {useState, useEffect} from 'react';
import { ActivityIndicator, View, ScrollView, Alert } from 'react-native';
import { CheckBox, ListItem, Divider, Icon, Button, Text, Overlay, Input } from 'react-native-elements';
import AddCreditOverlay from "./AddCreditOverlay";
import firestore from '@react-native-firebase/firestore';

function CreditDetailsScreen({ route, navigation }) {
  const {credit} = route.params;
  const ref = firestore().collection('creditUsers/'+credit.id+'/credits');
  const creditUsersRef = firestore().collection('creditUsers');
  const [credits, setCredits] = useState([]);
  const [balance, setBalance] = useState(Number(0));
  useEffect(() => {
    navigation.setOptions({ title: credit.userName});
    const subscriber = ref.orderBy('createdAt', 'desc').onSnapshot(onResult, onError);
    return () => subscriber();
  }, []);

  function onResult(querySnapshot) {
    const list = [];
    querySnapshot.forEach(documentSnapshot => {
      const data = documentSnapshot.data();
      const date = data.createdAt && data.createdAt.toDate();
      const jsDate = date && date.getDate();
      const jsMonth = date && date.getMonth() + 1;
      const jsFullYear = date && date.getFullYear();
      const completeDate = jsDate+'/'+jsMonth+'/'+jsFullYear;
        list.push({
          id: documentSnapshot.id,
          createdAt: completeDate,
          fuelType: data.fuelType,
          liters: data.liters,
          amount: data.amount
        });
    });
    setBalance(credit.totalBalance);
    setCredits(list);
  }

  function onError(error) {
    console.error(error);
  }

  const addCredit = (details) => {
    ref.add(details).then(()=>{
      console.log('Added credit details');
      const totalBalance = (Number(balance)+Number(details.amount)).toFixed(2);
      updateBalance(totalBalance);
    })
    
  }

  const deleteCredit = (creditDetails, index) => {
    Alert.alert(
      "Delete Credit",
      "Are you sure to delete this credit ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
            ref.doc(creditDetails.id).delete().then(()=>{
              console.log('Credit details deleted');
              console.log(creditDetails.amount);
              const totalBalance = (Number(balance)-Number(creditDetails.amount)).toFixed(2);
              console.log(totalBalance);
              updateBalance(totalBalance);
            })
        } }
      ]
    );
  }

  function updateBalance(totalBalance){
    creditUsersRef.doc(credit.id).update({totalBalance: totalBalance}).then(()=>{
      console.log('Balance Updated');
      setBalance(totalBalance);
    })
  }

  const deleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure to delete this account ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
            creditUsersRef.doc(credit.id).delete().then(()=>{
              console.log('Credit acount deleted');
              navigation.navigate({
                name: 'CreditList'
              })
            })
          } 
        }
      ]
    );
  }

  
  return (
    <ScrollView>
    <View style={{flex:1, flexDirection: 'row', padding:10}}>
        <View style={{flex:2.5, alignItems:'flex-start'}}>
          <Text style={{ paddingTop:10, fontSize:20, fontWeight:'bold' }}>Balance: {balance}</Text>
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
          <Text style={{padding: 5, fontSize:15}}>{l.createdAt}</Text>
          <View style={{flex:1, flexDirection: 'row', paddingLeft:5}}>
            <Text style={{ flex:1, fontSize:15, fontWeight:'bold'}}>{l.fuelType} Liters: {l.liters}</Text>
            <Text style={{ flex:1, fontSize:15, fontWeight:'bold' }}>Amount: {l.amount}</Text>
          </View>
        </ListItem.Content>
        <Button icon={{name: 'trash', type:'ionicon', size: 20, color: "dodgerblue"}} 
          type='clear' onPress={() => deleteCredit(l, i)}/>
      </ListItem>
    ))
    }
    <View style={{padding:10}}>
      <Button title='Delete Account' onPress={deleteAccount}/>
    </View>
    </ScrollView>
  );
}

export default CreditDetailsScreen;