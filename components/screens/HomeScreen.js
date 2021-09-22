import React, {useState, useContext, useEffect} from 'react';
import { Button, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card } from "react-native-elements";
import PriceContext from "../PriceContext";
import firestore from '@react-native-firebase/firestore';

function HomeScreen({ navigation }) {
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
    <View style={{ flex: 1 }}>
      <Card containerStyle={{borderRadius: 10, backgroundColor: 'lightgray', borderColor: 'green'}}>
        <Card.Title h4>Petrol: {priceDetails.petrol}</Card.Title>
        <Card.Divider />
        <Text style={{fontSize: 20, fontWeight:'bold'}}>Total: 3000 lts</Text>
      </Card>
      <Card containerStyle={{borderRadius: 10, backgroundColor: 'lavender', borderColor: 'black'}}>
        <Card.Title h4>Diesel: {priceDetails.diesel}</Card.Title>
        <Card.Divider />
        <Text style={{fontSize: 20, fontWeight:'bold'}}>Total: 1500 lts</Text>
      </Card>
      <Card containerStyle={{borderRadius: 10, backgroundColor: 'mintcream', borderColor: 'chocolate'}}>
        <Card.Title h4>Oil: {priceDetails.oilPacket}</Card.Title>
        <Card.Divider />
        <Text style={{fontSize: 20, fontWeight:'bold'}}>Count: 150 </Text>
      </Card>
    </View>
  );
}

export default HomeScreen;