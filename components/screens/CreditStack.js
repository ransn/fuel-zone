import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreditScreen from "./CreditScreen";
import CreditDetailsScreen from "./CreditDetailsScreen";
const StaffScreensStack = createNativeStackNavigator();

function CreditStack() {
     return (
      <StaffScreensStack.Navigator>
        <StaffScreensStack.Screen name="CreditList" component={CreditScreen} options={{title: 'Credits'}}/>
        <StaffScreensStack.Screen name="CreditDetails" component={CreditDetailsScreen}/>
      </StaffScreensStack.Navigator>
  );
}

export default CreditStack;