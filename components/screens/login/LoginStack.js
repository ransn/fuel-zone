import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./LoginScreen";
const LoginScreensStack = createNativeStackNavigator();

function LoginStack() {
     return (
      <LoginScreensStack.Navigator initialRouteName='Login' >
        <LoginScreensStack.Screen name="Login" component={LoginScreen} options={{title: 'Login'}}/>
        {/* <LoginScreensStack.Screen name="SignUp" component={SignUpScreen} options={{title: 'SignUp'}}/> */}
      </LoginScreensStack.Navigator>
  );
}

export default LoginStack;