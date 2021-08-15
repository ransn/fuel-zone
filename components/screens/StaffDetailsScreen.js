import React from 'react';
import { View, Image, useColorScheme, ScrollView } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card, ListItem, Avatar, Divider, Icon, Button, Text } from 'react-native-elements';

function StaffDetailsScreen({ navigation }) {
  return (
    <ScrollView>
      <View>
        <Text style={{padding: 10, fontSize:20, fontWeight:'bold' }}>Reading:</Text>
        <Divider />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex:1}}>
          <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold', color: 'green' }}>Petrol</Text>
          <Divider />
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex:2.2}}>
              <Text style={{ flex:1, padding: 10, fontSize:15 }}>Opening: </Text>
            </View>
            <View style={{flex:3}}>
              <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold', color: 'green'}}>10000</Text>
            </View>
          </View>
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex:2.2}}>
              <Text style={{ flex:1, padding: 10, fontSize:15}}>Closing: </Text>
            </View>
            <View style={{flex:3}}>
              <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold', color: 'green'}}>10000</Text>
            </View>
          </View>
        </View>
        <View style={{flex:1}}>
          <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>Diesel</Text>
          <Divider />
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex:2.2}}>
              <Text style={{ flex:1, padding: 10, fontSize:15}}>Opening: </Text>
            </View>
            <View style={{flex:3}}>
              <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold'}}>10000</Text>
            </View>
          </View>
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex:2.2}}>
              <Text style={{ flex:1, padding: 10, fontSize:15 }}>Closing: </Text>
            </View>
            <View style={{flex:3}}>
              <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold'}}>10000</Text>
            </View>
          </View>
        </View>
      </View>

      <View>
        <Text style={{padding: 10, fontSize:20, fontWeight:'bold' }}>Sales:</Text>
        <Divider />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex:1}}>
          <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold', color: 'green' }}>Petrol</Text>
          <Divider />
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex:2.2}}>
              <Text style={{ flex:1, padding: 10, fontSize:15 }}>Ltrs: </Text>
            </View>
            <View style={{flex:3}}>
              <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold', color: 'green'}}>500</Text>
            </View>
          </View>
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex:2.2}}>
              <Text style={{ flex:1, padding: 10, fontSize:15}}>Amount: </Text>
            </View>
            <View style={{flex:3}}>
              <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold', color: 'green'}}>52500</Text>
            </View>
          </View>
        </View>
        <View style={{flex:1}}>
          <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>Diesel</Text>
          <Divider />
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex:2.2}}>
              <Text style={{ flex:1, padding: 10, fontSize:15}}>Ltrs: </Text>
            </View>
            <View style={{flex:3}}>
              <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold'}}>500</Text>
            </View>
          </View>
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex:2.2}}>
              <Text style={{ flex:1, padding: 10, fontSize:15 }}>Amount: </Text>
            </View>
            <View style={{flex:3}}>
              <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold'}}>50000</Text>
            </View>
          </View>
        </View>
      </View>
      

      <View>
        <Text style={{padding: 10, fontSize:20, fontWeight:'bold' }}>Oils:</Text>
        <Divider />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex:1}}>
          {/* <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold', color: 'green' }}>Petrol</Text>
          <Divider /> */}
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex:1}}>
              <Text style={{ flex:1, padding: 10, fontSize:15 }}>Packets: </Text>
            </View>
            <View style={{flex:4}}>
              <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold'}}>10</Text>
            </View>
          </View>
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex:1}}>
              <Text style={{ flex:1, padding: 10, fontSize:15}}>Amount: </Text>
            </View>
            <View style={{flex:4}}>
              <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold'}}>200</Text>
            </View>
          </View>
        </View>
      </View>

      <View>
        <Text style={{padding: 10, fontSize:20, fontWeight:'bold', color: 'dodgerblue' }}>Returns:</Text>
        <Divider />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex:1}}>
          <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>Safedrops</Text>
          <Divider />
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex:2.2}}>
              <Text style={{ flex:1, padding: 10, fontSize:15 }}>Count: </Text>
            </View>
            <View style={{flex:3}}>
              <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold'}}>10</Text>
            </View>
          </View>
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex:2.2}}>
              <Text style={{ flex:1, padding: 10, fontSize:15}}>Amount: </Text>
            </View>
            <View style={{flex:3}}>
              <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold'}}>80000</Text>
            </View>
          </View>
        </View>
        <View style={{flex:1}}>
          <Text style={{padding: 10, fontSize:15, fontWeight:'bold' }}>Lastcash</Text>
          <Divider />
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex:2.2}}>
              <Text style={{ flex:1, padding: 10, fontSize:15}}>Amount: </Text>
            </View>
            <View style={{flex:3}}>
              <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold'}}>7500</Text>
            </View>
          </View>
        </View>
      </View>
      {/* <Card containerStyle={{padding: 5, borderRadius:10}}>
      <Card.Title h4>Today's Details:</Card.Title>
      <Card.Divider />
      <View style={{paddingTop: 10, justifyContent: 'space-around', alignItems: 'flex-start'}}>
        <Text style={{ padding: 5, fontSize:15, fontWeight:'bold' }}>Sales:</Text>
      </View>
      <Card.Divider />
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Card containerStyle={{borderRadius:10, borderColor:'green'}}>
          <Card.Title>Petrol</Card.Title>
          <Card.Divider/>
          <Text style={{ padding: 5, fontSize:15 }}>Ltrs: 500</Text>
          <Text style={{ padding: 5, fontSize:15 }}>Amount: 52500</Text>
        </Card>
        <Card containerStyle={{borderRadius:10, borderColor:'black'}}>
            <Card.Title>Diesel</Card.Title>
            <Card.Divider/>
            <Text style={{ padding: 5, fontSize:15 }}>Ltrs: 500</Text>
            <Text style={{ padding: 5, fontSize:15 }}>Amount: 52500</Text>
        </Card>
      </View>
      <Card containerStyle={{padding: 5, borderRadius:10, borderColor:'deepskyblue'}}>
          <Card.Title>Oils</Card.Title>
          <Card.Divider/>
          <Text style={{ padding: 5, fontSize:15 }}>Packets: 10</Text>
          <Text style={{ padding: 5, fontSize:15 }}>Amount: 500</Text>
      </Card>
      <View style={{paddingTop: 10, justifyContent: 'space-around', alignItems: 'flex-start'}}>
        <Text style={{ padding: 5, fontSize:15, fontWeight:'bold' }}>Returns:</Text>
      </View>
      <Card.Divider />
      <Card containerStyle={{borderRadius:10, borderColor:'skyblue'}}>
          <Card.Title>Safedrops</Card.Title>
          <Card.Divider/>
          <Text style={{ padding: 5, fontSize:15 }}>Count: 10</Text>
          <Text style={{ padding: 5, fontSize:15 }}>Amount: 8000</Text>
          <Card.Divider/>
          <Text style={{ padding: 5, fontSize:15 }}>Lastcash: 85000</Text>
      </Card>
      <View style={{paddingBottom: 10}} />
    </Card> */}
    </ScrollView>
  );
}

export default StaffDetailsScreen;