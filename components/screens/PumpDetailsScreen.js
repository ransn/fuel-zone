import React, {useState, useEffect} from 'react';
import { View, Image, ScrollView } from 'react-native';
import { ListItem, Divider, Button, Text, Overlay, Input, ButtonGroup, Icon } from 'react-native-elements';

function PumpDetailsScreen({ route, navigation }) {
  const {pump} = route.params;
  const [visible, setVisible] = useState(false);
  const [visibleOils, setVisibleOils] = useState(false);
  const [safeDropsOverlayVisible, setSafeDropsOverlayVisible] = useState(false);
  const [lastCashOverlayVisible, setLastCashOverlayVisible] = useState(false);
  const [ugtOverlayVisible, setUgtOverlayVisible] = useState(false);
  const [calculateOverlayVisible, setCalculateOverlayVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(()=>{
    navigation.setOptions({title:pump.name})
  })
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const toggleOverlayOils = () => {
    setVisibleOils(!visibleOils);
  };

  const toggleSafeDropsOverlay = () => {
    setSafeDropsOverlayVisible(!safeDropsOverlayVisible);
  }

  const toggleLastCashOverlay = () => {
    setLastCashOverlayVisible(!lastCashOverlayVisible);
  }

  const toggleUgtOverlay = () => {
    setUgtOverlayVisible(!ugtOverlayVisible);
  }

  const toggleCalculateOverlay = () => {
    setCalculateOverlayVisible(!calculateOverlayVisible);
  }

  const updateIndex = (index) => {
    setIndex(index)
  }
  const buttons = ['Shift 1', 'Shift 2']
  return (
    <ScrollView>
      <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
        <View style={{flex:0.5}}>
          <ButtonGroup onPress={updateIndex} selectedIndex={index} buttons={buttons} containerStyle={{height: 25}}/>
        </View>
      </View>
      
      <View style={{flex:1, flexDirection: 'row'}}>
        <Text style={{flex:0.9, padding: 10, fontSize:20, fontWeight:'bold' }}>Reading:</Text>
        <Button icon={{name: "create-outline", type:'ionicon', size: 20, color: "dodgerblue"}} type= 'clear'  onPress={toggleOverlay}/>
        <Overlay overlayStyle={{height: 280, width: 350, borderRadius: 10}} isVisible={visible} onBackdropPress={toggleOverlay} supportedOrientations={['portrait', 'landscape']}>
          <ScrollView style={{flex: 1}}>
            <Text style={{flex:0.9, padding: 10, fontSize:15, fontWeight:'bold' }}>Reading:</Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}}><Input label='Petrol Opening'/></View>
              <View style={{flex:1}}><Input label='Petrol Closing'/></View>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}}><Input label='Diesel Opening'/></View>
              <View style={{flex:1}}><Input label='Diesel Closing'/></View>
            </View>
            <Button title='Done' onPress={toggleOverlay}/>
          </ScrollView>
        </Overlay>
      </View>
      <Divider />
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
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={{flex:0.9, padding: 10, fontSize:20, fontWeight:'bold' }}>Sales:</Text>
        <Button type= 'clear' title='UGT' titleStyle={{paddingTop: 5, fontSize: 15}} onPress={toggleUgtOverlay} />
        <Overlay overlayStyle={{height: 240, width: 350, borderRadius: 10}} isVisible={ugtOverlayVisible} onBackdropPress={toggleUgtOverlay} supportedOrientations={['portrait', 'landscape']}>
          <ScrollView style={{flex: 1}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}}><Input label='Petrol UGT (Ltrs):' value='0'/></View>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}}><Input label='Diesel UGT (Ltrs):' value='0'/></View>
            </View>
            <Button title='Done' onPress={toggleUgtOverlay}/>
          </ScrollView>
        </Overlay>
      </View>
      <Divider />
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex:1}}>
          <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold', color: 'green' }}>Petrol</Text>
          <Divider />
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex:2.2}}>
              <Text style={{ flex:1, padding: 10, fontSize:15 }}>Ltrs: </Text>
            </View>
            <View style={{flex:3}}>
              <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold', color: 'green'}}>500 (-20)</Text>
            </View>
          </View>
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex:2.2}}>
              <Text style={{ flex:1, padding: 10, fontSize:15}}>Amount: </Text>
            </View>
            <View style={{flex:3}}>
              <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold', color: 'green'}}>64500</Text>
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
              <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold'}}>500 (-10)</Text>
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
        <View style={{flex:1, flexDirection: 'row'}}>
          <Text style={{flex:0.9, padding: 10, fontSize:20, fontWeight:'bold' }}>Oils:</Text>
          <Button type= 'clear' icon={{name: "create-outline", type:'ionicon', size: 20, color: "dodgerblue"}} onPress={toggleOverlayOils} />
          <Overlay overlayStyle={{height: 180, width: 250, borderRadius: 10}} isVisible={visibleOils} onBackdropPress={toggleOverlayOils} supportedOrientations={['portrait', 'landscape']}>
            <ScrollView style={{flex: 1}}>
              <Text style={{flex:0.9, padding: 10, fontSize:15, fontWeight:'bold' }}>Oil Packets:</Text>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 2}}><Input value='10' /></View>
                <View style={{flex: 1}}><Button type='clear' title='+10'/></View>
                <View style={{flex: 1}}><Button type='clear' title='-10'/></View>
              </View>
              <Button title='Done' onPress={toggleOverlayOils}/>
            </ScrollView>
          </Overlay>
          <Divider />
        </View>
        <Divider />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex:1}}>
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
          <View style={{flex:1, flexDirection: 'row'}}>
            <View style={{flex:2.2}}>
              <Text style={{ flex:1, padding: 10, fontSize:15}}>UPI: </Text>
            </View>
            <View style={{flex:3}}>
              <Text style={{ padding: 10,fontSize:15, fontWeight: 'bold'}}>15000</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{flex:1, flexDirection:'row', justifyContent: 'center'}}>
        <View style={{flex: 0.8}}><Button title='Calculate Total' onPress={toggleCalculateOverlay}/>
          <Overlay overlayStyle={{height: 300, width: 350, borderRadius: 10}} isVisible={calculateOverlayVisible} onBackdropPress={toggleCalculateOverlay} supportedOrientations={['portrait', 'landscape']}>
              <ScrollView style={{flex: 1}}>
                <Text style={{flex:0.9, padding: 5, fontSize:15, fontWeight:'bold' }}>Total:</Text>
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
                  <Text style={{ flex:1, padding: 5, fontSize:15, fontWeight:'bold'}}>Total Sales: 114700</Text>
                  <Text style={{ flex:1, padding: 5, fontSize:15, fontWeight:'bold', color: 'green'}}>Total Returns: 114500</Text>
                  <Text style={{ flex:1, padding: 5, fontSize:15, fontWeight:'bold', color: 'red'}}>Difference: 200</Text>
                  <Button title='Save' onPress={toggleCalculateOverlay}/>
                </View>
              </ScrollView>
          </Overlay>
        </View>
      </View>
    </ScrollView>
  );
}
export default PumpDetailsScreen;