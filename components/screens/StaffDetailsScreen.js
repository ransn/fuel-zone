import React, {useState} from 'react';
import { View, Image, useColorScheme, ScrollView } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card, ListItem, Avatar, Divider, Icon, Button, Text, Input, Overlay } from 'react-native-elements';
import ReportComponent from "./ReportComponent";
import AssignPumpComponent from "./AssignPumpComponent";
function StaffDetailsScreen({ navigation }) {
  const [enableStartWork, setEnableStartWork] = useState(true);
  const [enableEndWork, setEnableEndWork] = useState(false);
  const [enableTotal, setEnableTotal] = useState(false);
  const [safeDropsOverlayVisible, setSafeDropsOverlayVisible] = useState(false);
  const [lastCashOverlayVisible, setLastCashOverlayVisible] = useState(false);
  const [calculateOverlayVisible, setCalculateOverlayVisible] = useState(false);
  const [assignOverlayVisible, setAssignOverlayVisible] = useState(false);
  const [pump, setPump] = useState('');

  const saveOpeningReading = () => {
    // Here we need to save opening reading in db
    setEnableStartWork(false);
    setEnableEndWork(true);
  }

  const saveClosingReading = () => {
    // Here we need to save closing reading in db
    setEnableEndWork(false);
    setEnableTotal(true);
  }

  const toggleSafeDropsOverlay = () => {
    setSafeDropsOverlayVisible(!safeDropsOverlayVisible);
  }

  const toggleLastCashOverlay = () => {
    setLastCashOverlayVisible(!lastCashOverlayVisible);
  }

  const toggleCalculateOverlay = () => {
    setCalculateOverlayVisible(!calculateOverlayVisible);
  }

  const toggleAssignOverlay = () => {
    setAssignOverlayVisible(!assignOverlayVisible);
  }

  const updatePumpDetails = (pumpDetails) => {
    setPump(pumpDetails);
    //toggleAssignOverlay();
    setAssignOverlayVisible(!assignOverlayVisible);
  }

  return (
    <ScrollView>
      <View style={{flex:1, justifyContent: 'center'}}>
        <View style={{flex:3, flexDirection: 'row', alignItems: 'flex-start'}}>
          <Text style={{padding:10, fontSize:15 }}>Assigned:</Text>
          <Text style={{padding:10, fontSize:15, fontWeight:'bold' }}>{pump}</Text>
          <View style={{flex:1, alignItems: 'flex-end'}}>
            <Button type='clear' titleStyle={{ fontSize: 15, fontWeight:'bold'}} title='Assign' onPress={toggleAssignOverlay}/>
            <Overlay overlayStyle={{height: 400, width: 300, borderRadius: 10}} visible={assignOverlayVisible} onBackdropPress={toggleAssignOverlay} supportedOrientations={['portrait', 'landscape']}>
              <ScrollView>
                <AssignPumpComponent actionName={updatePumpDetails}/>
              </ScrollView>
            </Overlay>
          </View>
        </View>
      </View>
      <Divider width={3} subHeader="Opening Reading:" subHeaderStyle={{padding: 10, fontSize:18, fontWeight:'bold', color: 'dodgerblue' }}/>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex:1}}>
          <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold', color: 'green' }}>Petrol</Text>
          <Divider />
          <View style={{flex:1, flexDirection: 'row'}}>
            {enableStartWork && <Input label='Opening' />}
            {
              !enableStartWork && 
              <>
              <View style={{flex:2.2}}>
                <Text style={{ flex:1, padding: 10, fontSize:15 }}>Opening: </Text>
              </View>
              <View style={{flex:3}}>
                <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold', color: 'green'}}>10000</Text>
              </View>
              </>
            }
          </View>
        </View>
        <View style={{flex:1}}>
          <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>Diesel</Text>
          <Divider />
          <View style={{flex:1, flexDirection: 'row'}}>
            {enableStartWork && <Input label='Opening' />}
            {
              !enableStartWork && 
              <>
              <View style={{flex:2.2}}>
                <Text style={{ flex:1, padding: 10, fontSize:15 }}>Opening: </Text>
              </View>
              <View style={{flex:3}}>
                <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold', color: 'black'}}>10000</Text>
              </View>
              </>
            }
          </View>
        </View>
      </View>
      {
        enableStartWork &&
        <View style={{flex:1, padding: 20}}>
          <Button title='Start Work' onPress= {saveOpeningReading}/>
        </View>
      }
      {
        !enableStartWork &&
        <>
          <Divider width={3} subHeader="Oils:" subHeaderStyle={{padding: 10, fontSize:18, fontWeight:'bold', color: 'dodgerblue' }}/>
          <View style={{flex:1}}>
            <View style={{flex:1, flexDirection: 'row'}}>
                <View style={{flex:1, flexDirection:'row'}}>
                  <Text style={{flex:2.2, padding: 10, fontSize:15 }}>Packets:</Text>
                  <Text style={{flex:3, padding: 10, fontSize:15, fontWeight:'bold' }}>10</Text>
                </View>
                <View style={{flex:1, flexDirection:'row'}}>
                  <Text style={{flex:2.2, padding: 10, fontSize:15 }}>Amount:</Text>
                  <Text style={{flex:3, padding: 10, fontSize:15, fontWeight:'bold' }}>200</Text>
                </View>
              </View>
          </View>
          {/* Returns section start*/}
          <Divider width={3} subHeader="Returns:" subHeaderStyle={{padding: 10, fontSize:18, fontWeight:'bold', color: 'dodgerblue' }}/>
          <View style={{flex:1}}>
            <View style={{flexDirection: 'row', alignItems:'flex-start'}}>
              <Text style={{ padding: 10, fontSize:15, fontWeight:'bold' }}>Safedrops</Text>
              <Button icon={{name: "create-outline", type:'ionicon', size: 20, color: "dodgerblue"}} type='clear' onPress={toggleSafeDropsOverlay} />
              <Overlay overlayStyle={{height: 180, width: 250, borderRadius: 10}} isVisible={safeDropsOverlayVisible} onBackdropPress={toggleSafeDropsOverlay} supportedOrientations={['portrait', 'landscape']}>
                <ScrollView style={{flex: 1}}>
                  <Text style={{flex:0.9, padding: 10, fontSize:15, fontWeight:'bold' }}>Safedrops:</Text>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 2}}><Input value='10' /></View>
                    <View style={{flex: 1}}><Button type='clear' title='+1'/></View>
                    <View style={{flex: 1}}><Button type='clear' title='-1'/></View>
                  </View>
                  <Button title='Done' onPress={toggleSafeDropsOverlay}/>
                </ScrollView>
              </Overlay>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection: 'row'}}>
              <View style={{flex:1, flexDirection:'row'}}>
                <Text style={{flex:2.2, padding: 10, fontSize:15 }}>Count:</Text>
                <Text style={{flex:3, padding: 10, fontSize:15, fontWeight:'bold' }}>10</Text>
              </View>
              <View style={{flex:1, flexDirection:'row'}}>
                <Text style={{flex:2.2, padding: 10, fontSize:15 }}>Amount:</Text>
                <Text style={{flex:3, padding: 10, fontSize:15, fontWeight:'bold' }}>8000</Text>
              </View>
            </View>
          </View>
        
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
              <Text style={{padding: 10, fontSize:15, fontWeight:'bold' }}>Lastcash</Text>
              <Button icon={{name: "create-outline", type:'ionicon', size: 20, color: "dodgerblue"}} type='clear' onPress={toggleLastCashOverlay}/>
              <Overlay overlayStyle={{height: 180, width: 350, borderRadius: 10}} isVisible={lastCashOverlayVisible} onBackdropPress={toggleLastCashOverlay} supportedOrientations={['portrait', 'landscape']}>
                <ScrollView style={{flex: 1}}>
                  <Text style={{flex:0.9, padding: 10, fontSize:15, fontWeight:'bold' }}>Lastcash:</Text>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}><Input label='Amount' value='7500'/></View>
                    <View style={{flex: 1}}><Input label='Card' value='12000'/></View>
                    <View style={{flex: 1}}><Input label='UPI' value='15000'/></View>
                  </View>
                  <Button title='Done' onPress={toggleLastCashOverlay}/>
                </ScrollView>
              </Overlay>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection: 'row'}}>
              <View style={{flex:1, flexDirection: 'row'}}>
                <View style={{flex:2.2}}>
                  <Text style={{ flex:1, padding: 10, fontSize:15}}>Amount: </Text>
                </View>
                <View style={{flex:3}}>
                  <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold'}}>7500</Text>
                </View>
              </View>

              <View style={{flex:1, flexDirection: 'row'}}>
                <View style={{flex:2.2}}>
                  <Text style={{ flex:1, padding: 10, fontSize:15}}>Card: </Text>
                </View>
                <View style={{flex:3}}>
                  <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold'}}>12000</Text>
                </View>
              </View>
            </View>
        
            <View style={{flex:1, flexDirection: 'row'}}>
              <View style={{flex:1, flexDirection: 'row'}}>
                <View style={{flex:2.2}}>
                  <Text style={{ flex:1, padding: 10, fontSize:15}}>UPI: </Text>
                </View>
                <View style={{flex:3}}>
                  <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold'}}>15000</Text>
                </View>
              </View>
              <View style={{flex:1, flexDirection: 'row'}}>
                <View style={{flex:2.2}}>
                  <Text style={{ flex:1, padding: 10, fontSize:15}}>Credit: </Text>
                </View>
                <View style={{flex:3}}>
                  <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold'}}>18000</Text>
                </View>
              </View>
            </View>
          </View>
          {/** Returns section end */}
        </>
      }
      
      {
        !enableStartWork &&
        <>
          <Divider width={3} subHeader="Closing Reading:" subHeaderStyle={{padding: 10, fontSize:18, fontWeight:'bold', color: 'dodgerblue' }}/>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex:1}}>
              <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold', color: 'green' }}>Petrol</Text>
              <Divider />
              <View style={{flex:1, flexDirection: 'row'}}>
                {enableEndWork && <Input label='Closing' />}
                {
                  !enableEndWork && 
                  <>
                  <View style={{flex:2.2}}>
                    <Text style={{ flex:1, padding: 10, fontSize:15 }}>Closing: </Text>
                  </View>
                  <View style={{flex:3}}>
                    <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold', color: 'green'}}>10000</Text>
                  </View>
                  </>
                }
              </View>
            </View>
            <View style={{flex:1}}>
              <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>Diesel</Text>
              <Divider />
              <View style={{flex:1, flexDirection: 'row'}}>
                {enableEndWork && <Input label='Closing' />}
                {
                  !enableEndWork && 
                  <>
                  <View style={{flex:2.2}}>
                    <Text style={{ flex:1, padding: 10, fontSize:15 }}>Closing: </Text>
                  </View>
                  <View style={{flex:3}}>
                    <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold', color: 'black'}}>10000</Text>
                  </View>
                  </>
                }
              </View>
            </View>
          </View>
          {
            enableEndWork &&

            <View style={{flex:1, flexDirection:'row', justifyContent: 'center'}}>
              <View style={{flex: 1, padding: 10}}>
                <Button buttonStyle={{borderRadius:20}} title='Calculate Total' onPress={toggleCalculateOverlay}/>
                <Overlay overlayStyle={{height: 350, width: 370, borderRadius: 10}} isVisible={calculateOverlayVisible} onBackdropPress={toggleCalculateOverlay} supportedOrientations={['portrait', 'landscape']}>
                    <ScrollView style={{flex: 1}}>
                      <ReportComponent />
                    </ScrollView>
                </Overlay>
              </View>
              {
                enableEndWork && 
                <View style={{flex:1, padding: 10}}>
                  <Button buttonStyle={{backgroundColor:'crimson', borderRadius:20}} title='End Work' onPress= {saveClosingReading}/>
                </View>
              }
            </View>
          }
        </>
      }

      {
        enableTotal &&
          <ReportComponent />
      }
    </ScrollView>
  );
}

export default StaffDetailsScreen;