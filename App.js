import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen  from "./components/screens/HomeScreen";
import StaffStack  from "./components/screens/StaffStack";
import PumpStack from "./components/screens/PumpStack";
import SettingsScreen from "./components/screens/SettingsScreen";
//const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function App() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tab.Navigator initialRouteName="Dashboard">
        <Tab.Screen name="Dashboard" component={HomeScreen}/>
        <Tab.Screen name="Pump" component={PumpStack} options={{ tabBarLabel: 'Pumps', headerShown: false }}/>
        <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;