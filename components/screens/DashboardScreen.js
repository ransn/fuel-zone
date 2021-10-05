import React, {useState, useContext, useEffect} from 'react';
import { Button, ScrollView, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card } from "react-native-elements";
import PriceContext from "../PriceContext";
import firestore from '@react-native-firebase/firestore';

function DashboardScreen({ navigation }) {
  const {priceDetails, updatePriceDetails} = useContext(PriceContext);
  const ref = firestore().collection('fuelPrizeList');
    useEffect(() => {
      if(priceDetails.petrol == 0){
        const subscriber = ref.orderBy('createdAt', 'desc').limit(1).onSnapshot(onResult, onError);
        return () => subscriber();
      } 
    }, []);

    function onResult(querySnapshot) {
        querySnapshot.forEach(documentSnapshot => {
            const data = documentSnapshot.data();
            updatePriceDetails({
                id: documentSnapshot.id,
                createdAt: data.createdAt,
                petrol: data.petrol,
                diesel: data.diesel,
                oilPacket: data.oilPacket
            });
        });
    }

    function onError(error) {
        console.error(error);
    }

  return (
    <ScrollView style={{ flex: 1 }}>
      <Card containerStyle={{borderRadius: 10, backgroundColor: 'lightgray', borderColor: 'green'}}>
        <Card.Title h4>Fuel Price</Card.Title>
        <Card.Divider />
        <Text style={{fontSize: 18, fontWeight:'bold'}}>Petrol: {priceDetails.petrol}</Text>
        <Text style={{fontSize: 18, fontWeight:'bold'}}>Diesel: {priceDetails.diesel}</Text>
        <Text style={{fontSize: 18, fontWeight:'bold'}}>Oil: {priceDetails.oilPacket}</Text>
      </Card>
      <Card containerStyle={{borderRadius: 10, backgroundColor: 'lavender', borderColor: 'black'}}>
        <Card.Title h4>Credits</Card.Title>
        <Card.Divider />
        <Text style={{fontSize: 18, fontWeight:'bold'}}>Total: 0</Text>
      </Card>
      <Card containerStyle={{borderRadius: 10, backgroundColor: 'mintcream', borderColor: 'chocolate'}}>
        <Card.Title h4>Readings</Card.Title>
        <Card.Divider />
        <Text style={{fontSize: 18, fontWeight:'bold'}}>Pump 1: 0 </Text>
        <Text style={{fontSize: 18, fontWeight:'bold'}}>Pump 2: 0 </Text>
        <Text style={{fontSize: 18, fontWeight:'bold'}}>Pump 3: 0 </Text>
        <Text style={{fontSize: 18, fontWeight:'bold'}}>Pump 4: 0 </Text>
      </Card>
    </ScrollView>
  );
}

export default DashboardScreen;