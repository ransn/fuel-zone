import React, {useState, useEffect} from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen  from "./components/screens/HomeScreen";
import LoginScreen from "./components/screens/login/LoginScreen";
import firestore from '@react-native-firebase/firestore';

const AppScreensStack = createNativeStackNavigator();
function App() {
  const scheme = useColorScheme();
    return (
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AppScreensStack.Navigator initialRouteName='Login' >
          <AppScreensStack.Screen name="Login" component={LoginScreen} options={{title: 'Login', headerShown: false}}/>
          <AppScreensStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        </AppScreensStack.Navigator>
      </NavigationContainer>
    );
}

export default App;