import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkScreen from "./WorkScreen";
import WorkDetailsScreen from "./WorkDetailsScreen";
import WorkReportScreen from "./WorkReportScreen";
const WorkScreensStack = createNativeStackNavigator();

function WorkStack() {
     return (
      <WorkScreensStack.Navigator>
        <WorkScreensStack.Screen name="WorkList" component={WorkScreen} options={{title: 'Works'}}/>
        <WorkScreensStack.Screen name="WorkDetails" component={WorkDetailsScreen} options={{title: 'Default'}}/>
        <WorkScreensStack.Screen name="WorkReport" component={WorkReportScreen} options={{title: 'Report'}} />
      </WorkScreensStack.Navigator>
  );
}

export default WorkStack;