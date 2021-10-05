import React, {useState, useContext, useEffect} from 'react';
import { Button, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card } from "react-native-elements";
import StaffStack  from "./StaffStack";
import WorkStack from "./WorkStack";
import CreditStack from "./CreditStack";
import SettingsStack from "./SettingsStack";
import DashboardScreen from "./DashboardScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import PriceContext, {priceDetails} from "../PriceContext";


const Tab = createBottomTabNavigator();
function HomeScreen({ navigation }) {
  
  
  const updatePriceDetails = (latestPriceDetails) => {
    setPriceWrapper({...priceWrapper, priceDetails: latestPriceDetails});
  }
  const [priceWrapper, setPriceWrapper] = useState({
    priceDetails: priceDetails,
    updatePriceDetails: updatePriceDetails
  });
  
  return (
    <PriceContext.Provider value={priceWrapper}>
        <Tab.Navigator initialRouteName="Dashboard">
          <Tab.Screen name="Dashboard" component={DashboardScreen} options={{
            tabBarLabel: 'Home', tabBarIcon: () => (
              <Ionicons name="home-outline" size={20} />
            )
          }}/>
          <Tab.Screen name="Work" component={WorkStack} options={{ 
            tabBarLabel: 'Assign & Start', 
            headerShown: false,
            tabBarIcon: () => (
              <Ionicons name="person-outline" size={20} />
            ) 
          }}/>
          <Tab.Screen name="Credit" component={CreditStack} options={{ 
            tabBarLabel: 'Credits', 
            headerShown: false,
            tabBarIcon: () => (
              <Ionicons name="card-outline" size={20} />
            ) 
          }}/>
          <Tab.Screen name="SettingsStack" component={SettingsStack} options={{ 
            tabBarLabel: 'Settings', 
            headerShown: false, 
            tabBarIcon: () => (
              <Ionicons name="settings-outline" size={20} />
            ) 
          }}/>
        </Tab.Navigator>
      </PriceContext.Provider>
  );
}

export default HomeScreen;