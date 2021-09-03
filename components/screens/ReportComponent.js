import React, {useState} from 'react';
import { View } from "react-native";
import { Card, Text, Divider } from "react-native-elements";
function ReportComponent(){
    return(
        <Card>
            <Card.Title>Summary</Card.Title>
                    <View style={{flex: 1, padding:10}}>
                      <View style={{flex:1, flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                          <View style={{flex: 1}}>
                            <Text style={{ flex:1, padding: 5, fontSize:15}}>Petrol: 64500</Text>
                          </View>
                          <View style={{flex: 1}}>
                            <Text style={{ flex:1, padding: 5, fontSize:15}}>Diesel: 50000</Text>
                          </View>
                          <View style={{flex: 1}}>
                            <Text style={{ flex:1, padding: 5, fontSize:15}}>Oils: 200</Text>
                          </View>
                        </View>
                        <View style={{flex: 1}}>
                          <View style={{flex: 1}}>
                            <Text style={{ flex:1, padding: 5, fontSize:15, color:'green'}}>Safedrops: 80000</Text>
                          </View>
                          <View style={{flex: 1}}>
                            <Text style={{ flex:1, padding: 5, fontSize:15, color:'green'}}>Lastcash: 7500</Text>
                          </View>
                          <View style={{flex: 1}}>
                            <Text style={{ flex:1, padding: 5, fontSize:15, color:'green'}}>Card: 12000</Text>
                          </View>
                          <View style={{flex: 1}}>
                            <Text style={{ flex:1, padding: 5, fontSize:15, color:'green'}}>UPI: 15000</Text>
                          </View>
                        </View>
                      </View>
                      <View style={{flex:1, flexDirection: 'column'}}> 
                        <Divider width={3}/>
                        <Text style={{ flex:1, padding: 5, fontSize:15, fontWeight:'bold'}}>Total Sales: 114700</Text>
                        <Text style={{ flex:1, padding: 5, fontSize:15, fontWeight:'bold', color: 'green'}}>Total Returns: 114500</Text>
                        <Text style={{ flex:1, padding: 5, fontSize:15, fontWeight:'bold', color: 'red'}}>Difference: 200</Text>
                      </View>
                    </View>            
          </Card>
    )
}

export default ReportComponent;