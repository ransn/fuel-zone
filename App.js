import React from 'react';
import { Button, View, Text, useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen  from "./components/screens/HomeScreen";
import StaffScreen  from "./components/screens/StaffScreen";
import PumpScreen from "./components/screens/PumpScreen";
import SettingsScreen from "./components/screens/SettingsScreen";
const Tab = createBottomTabNavigator();

function App() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Dashboard' }}/>
        <Tab.Screen name="Staff" component={StaffScreen} />
        <Tab.Screen name="Pump" component={PumpScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;