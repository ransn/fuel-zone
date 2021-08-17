import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreditScreen from "./CreditScreen";
import CreditDetailsScreen from "./CreditDetailsScreen";
import { Button } from "react-native-elements";
const StaffScreensStack = createNativeStackNavigator();

function CreditStack() {
     return (
      <StaffScreensStack.Navigator>
        <StaffScreensStack.Screen name="CreditList" component={CreditScreen} options={{title: 'Credits', headerRight: () => (
            <Button type='clear'
              onPress={() => alert('This is a button!')}
              title="Add"
            />
          )}}/>
        <StaffScreensStack.Screen name="CreditDetails" component={CreditDetailsScreen} options={({ route }) => ({ title: route.params.name })}/>
      </StaffScreensStack.Navigator>
  );
}

export default CreditStack;