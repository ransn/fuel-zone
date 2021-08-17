import React from 'react';
import { View, Image, useColorScheme, ScrollView } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card, ListItem, Avatar, Divider, Icon, Button, Text } from 'react-native-elements';

function CreditDetailsScreen({ navigation }) {
  return (
    <ScrollView>
      <Card containerStyle={{padding: 5, paddingBottom:20, borderRadius:10}}>
      <Card.Title h4>Credit Details:</Card.Title>
      <View style={{flex:1, flexDirection: 'row'}}>
        <View style={{flex:1, alignItems:'flex-start'}}>
          <Text style={{ paddingTop:10, fontSize:20, fontWeight:'bold' }}>Balance: 5500</Text>
        </View>
        <View style={{flex:1, alignItems:'flex-end'}}>
          <Button icon={{name: 'add-circle', type:'ionicon', size: 30, color: "dodgerblue"}} type='clear' />
        </View>
      </View>
      <Card.Divider />
      <Card containerStyle={{padding: 5, borderRadius:10, borderColor:'deepskyblue'}}>
          <View style={{flex:1, flexDirection: 'row', padding: 5}}>
            <View style={{flex:1, alignItems:'flex-start'}}>
              <Text style={{paddingTop: 10, fontSize:15, fontWeight:'bold'}}>10/7/2021</Text>
            </View>
            <View style={{flex:1, alignItems:'flex-end'}}>
              <Button icon={{name: 'trash', type:'ionicon', size: 20, color: "dodgerblue"}} type='clear' />
            </View>
          </View>
          <Card.Divider/>
          <View style={{flex:1, flexDirection: 'row', padding: 5}}>
            <Text style={{ flex:1, padding: 5, fontSize:15 }}>Liters: 10</Text>
            <Text style={{ flex:1, padding: 5, fontSize:15 }}>Amount: 1050</Text>
          </View>
      </Card>
      <Card containerStyle={{padding: 5, borderRadius:10, borderColor:'deepskyblue'}}>
          <View style={{flex:1, flexDirection: 'row', padding: 5}}>
            <View style={{flex:1, alignItems:'flex-start'}}>
              <Text style={{paddingTop: 10, fontSize:15, fontWeight:'bold'}}>10/7/2021</Text>
            </View>
            <View style={{flex:1, alignItems:'flex-end'}}>
              <Button icon={{name: 'trash', type:'ionicon', size: 20, color: "dodgerblue"}} type='clear' />
            </View>
          </View>
          <Card.Divider/>
          <View style={{flex:1, flexDirection: 'row', padding: 5}}>
            <Text style={{ flex:1, padding: 5, fontSize:15 }}>Liters: 10</Text>
            <Text style={{ flex:1, padding: 5, fontSize:15 }}>Amount: 1050</Text>
          </View>
      </Card>
      <Card containerStyle={{padding: 5, borderRadius:10, borderColor:'deepskyblue'}}>
          <View style={{flex:1, flexDirection: 'row', padding: 5}}>
            <View style={{flex:1, alignItems:'flex-start'}}>
              <Text style={{paddingTop: 10, fontSize:15, fontWeight:'bold'}}>10/7/2021</Text>
            </View>
            <View style={{flex:1, alignItems:'flex-end'}}>
              <Button icon={{name: 'trash', type:'ionicon', size: 20, color: "dodgerblue"}} type='clear' />
            </View>
          </View>
          <Card.Divider/>
          <View style={{flex:1, flexDirection: 'row', padding: 5}}>
            <Text style={{ flex:1, padding: 5, fontSize:15 }}>Liters: 10</Text>
            <Text style={{ flex:1, padding: 5, fontSize:15 }}>Amount: 1050</Text>
          </View>
      </Card>
      <Card containerStyle={{padding: 5, borderRadius:10, borderColor:'deepskyblue'}}>
          <View style={{flex:1, flexDirection: 'row', padding: 5}}>
            <View style={{flex:1, alignItems:'flex-start'}}>
              <Text style={{paddingTop: 10, fontSize:15, fontWeight:'bold'}}>10/7/2021</Text>
            </View>
            <View style={{flex:1, alignItems:'flex-end'}}>
              <Button icon={{name: 'trash', type:'ionicon', size: 20, color: "dodgerblue"}} type='clear' />
            </View>
          </View>
          <Card.Divider/>
          <View style={{flex:1, flexDirection: 'row', padding: 5}}>
            <Text style={{ flex:1, padding: 5, fontSize:15 }}>Liters: 10</Text>
            <Text style={{ flex:1, padding: 5, fontSize:15 }}>Amount: 1050</Text>
          </View>
      </Card>
    </Card>
    </ScrollView>
  );
}

export default CreditDetailsScreen;