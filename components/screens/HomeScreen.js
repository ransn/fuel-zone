import React, {useState, useContext} from 'react';
import { Button, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card } from "react-native-elements";
import PriceContext from "../PriceContext";


function HomeScreen({ navigation }) {
  const priceDetails = useContext(PriceContext);
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
        <Card.Title h4>Oil: {priceDetails.oil}</Card.Title>
        <Card.Divider />
        <Text style={{fontSize: 20, fontWeight:'bold'}}>Count: 150 </Text>
      </Card>
    </View>
  );
}

export default HomeScreen;