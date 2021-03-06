import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from "./SettingsScreen";
import FuelPrizeScreen from "./FuelPrizeScreen";
import OilPrizeScreen from "./OilPrizeScreen";
import PumpSettingsScreen from "./PumpSettingsScreen";
import FuelLoadUnloadScreen from "./FuelLoadUnloadScreen";
import StaffScreen from "./StaffScreen";
import StaffDetailsScreen from "./StaffDetailsScreen";

const SettingsScreensStack = createNativeStackNavigator();

function SettingsStack() {
     return (
      <SettingsScreensStack.Navigator>
        <SettingsScreensStack.Screen name="Settings" component={SettingsScreen} options={{title: 'Settings'}}/>
        <SettingsScreensStack.Screen name="FuelPrize" component={FuelPrizeScreen} options={{title: 'Fuel Prize'}}/>
        <SettingsScreensStack.Screen name="StaffList" component={StaffScreen} options={{title: 'Staffs'}}/>
        <SettingsScreensStack.Screen name="StaffDetails" component={StaffDetailsScreen} options={{title: 'Pump 1'}}/>
        {/* <SettingsScreensStack.Screen name="PumpSettings" component={PumpSettingsScreen} options={{title: 'Active/In-Active'}} />
        <SettingsScreensStack.Screen name="FuelLoadUnload" component={FuelLoadUnloadScreen} options={{title: 'Load/Unload'}} /> */}
      </SettingsScreensStack.Navigator>
  );
}

export default SettingsStack;