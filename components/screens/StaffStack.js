import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StaffScreen from "./StaffScreen";
import StaffDetailsScreen from "./StaffDetailsScreen";
const StaffScreensStack = createNativeStackNavigator();

function StaffStack() {
     return (
      <StaffScreensStack.Navigator>
        <StaffScreensStack.Screen name="StaffList" component={StaffScreen} options={{title: 'Staffs'}}/>
        <StaffScreensStack.Screen name="StaffDetails" component={StaffDetailsScreen} options={{title: 'Pump 1'}}/>
      </StaffScreensStack.Navigator>
  );
}

export default StaffStack;