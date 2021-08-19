import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from "./SettingsScreen";
import FuelPrizeScreen from "./FuelPrizeScreen";
import OilPrizeScreen from "./OilPrizeScreen";
const SettingsScreensStack = createNativeStackNavigator();

function SettingsStack() {
     return (
      <SettingsScreensStack.Navigator>
        <SettingsScreensStack.Screen name="Settings" component={SettingsScreen} options={{title: 'Settings'}}/>
        <SettingsScreensStack.Screen name="FuelPrize" component={FuelPrizeScreen} options={{title: 'Fuel Prize'}}/>
        <SettingsScreensStack.Screen name="OilPrize" component={OilPrizeScreen} options={{title: 'Oil Prize'}}/>
        
      </SettingsScreensStack.Navigator>
  );
}

export default SettingsStack;