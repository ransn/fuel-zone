import React, {useState} from 'react';
import { Button, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card } from "react-native-elements";



function HomeScreen({ navigation }) {
  const [value,setValue] = useState('50');
  return (
    <View style={{ flex: 1 }}>
      <Card containerStyle={{borderRadius: 10, backgroundColor: 'lightgray', borderColor: 'dodgerblue'}}>
        <Card.Title h4>Petrol: 105.25</Card.Title>
        <Card.Divider />
        <Text style={{fontSize: 20, fontWeight:'bold'}}>Total: 3000 lts</Text>
      </Card>
      <Card containerStyle={{borderRadius: 10, backgroundColor: 'lavender', borderColor: 'chocolate'}}>
        <Card.Title h4>Diesel: 103.23</Card.Title>
        <Card.Divider />
        <Text style={{fontSize: 20, fontWeight:'bold'}}>Total: 1500 lts</Text>
      </Card>
      <Card containerStyle={{borderRadius: 10, backgroundColor: 'lightsteelblue', borderColor: 'gray'}}>
        <Card.Title h4>Oil: 20</Card.Title>
        <Card.Divider />
        <Text style={{fontSize: 20, fontWeight:'bold'}}>Count: 150 </Text>
      </Card>
    </View>
  );
}

export default HomeScreen;