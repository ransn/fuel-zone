import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkScreen from "./WorkScreen";
import WorkDetailsScreen from "./WorkDetailsScreen";
const WorkScreensStack = createNativeStackNavigator();

function WorkStack() {
     return (
      <WorkScreensStack.Navigator>
        <WorkScreensStack.Screen name="WorkList" component={WorkScreen} options={{title: 'Works'}}/>
        <WorkScreensStack.Screen name="WorkDetails" component={WorkDetailsScreen} options={{title: 'Default'}}/>
      </WorkScreensStack.Navigator>
  );
}

export default WorkStack;