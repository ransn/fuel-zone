import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PumpScreen from "./PumpScreen";
import PumpDetailsScreen from "./PumpDetailsScreen";
const StaffScreensStack = createNativeStackNavigator();

function PumpStack() {
     return (
      <StaffScreensStack.Navigator initialRouteName="PumpList">
        <StaffScreensStack.Screen name="PumpList" component={PumpScreen} options={{title: 'Pumps'}}/>
        <StaffScreensStack.Screen name="PumpDetails" component={PumpDetailsScreen} options={{title: 'Pump1'}}/>
      </StaffScreensStack.Navigator>
  );
}

export default PumpStack;