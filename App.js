import React, {useState} from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen  from "./components/screens/HomeScreen";
import StaffStack  from "./components/screens/StaffStack";
import WorkStack from "./components/screens/WorkStack";
import PumpStack from "./components/screens/PumpStack";
import CreditStack from "./components/screens/CreditStack";
import SettingsStack from "./components/screens/SettingsStack";
import Ionicons from 'react-native-vector-icons/Ionicons';
import PriceContext, {priceDetails} from "./components/PriceContext";

const Tab = createBottomTabNavigator();
function App() {
  const scheme = useColorScheme();
  const updatePriceDetails = (latestPriceDetails) => {
    setPriceWrapper({...priceWrapper, priceDetails: latestPriceDetails});
  }
  const [priceWrapper, setPriceWrapper] = useState({
    priceDetails: priceDetails,
    updatePriceDetails: updatePriceDetails
  });
  
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
    <PriceContext.Provider value={priceWrapper}>
      <Tab.Navigator initialRouteName="Dashboard">
        <Tab.Screen name="Dashboard" component={HomeScreen} options={{
          tabBarLabel: 'Home', tabBarIcon: () => (
            <Ionicons name="home-outline" size={20} />
          )
        }}/>
        {/* <Tab.Screen name="Pump" component={PumpStack} options={{ 
          tabBarLabel: 'Pumps', 
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="water-outline" size={20} />
          ) 
        }}/> */}
        {/* <Tab.Screen name="Staff" component={StaffStack} options={{ 
          tabBarLabel: 'Staff', 
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="person-outline" size={20} />
          ) 
        }}/> */}
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
    </NavigationContainer>
  );
}

export default App;