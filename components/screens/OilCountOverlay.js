import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';

function OilCountOverlay(props, { navigation }) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [resetCount, setResetCount] = useState(0);
  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
    setCount(0);
  };
  const toggleOverlayBackdrop = () => {
    setCount(props.value);
    toggleOverlay();
    setCount(0);
  }
  const addOilPacketsCount = () => {
    var totalCount= Number(props.value)+Number(count);
    props.update(totalCount);
    toggleOverlay();
  }
  const resetOilPacketsCount = () => {
    props.update(Number(resetCount));
    toggleOverlay();
  }

  return (
    <View>
      <Button icon={{name: "create-outline", type:'ionicon', size: 20, color: "dodgerblue"}} type='clear' onPress={toggleOverlay} />
      <Overlay overlayStyle={{height: 200, width: 280, borderRadius: 10}} 
        visible={overlayVisible} 
        onBackdropPress={toggleOverlayBackdrop} 
        supportedOrientations={['portrait', 'landscape']}
      >
        <Text style={{ padding: 10, fontSize:18, fontWeight:'bold' }}>Oil Packets: {props.value}</Text>
        <View style={{flex:1, flexDirection:'row'}}>
          <View style={{flex:2}}>
            <Input keyboardType='numeric' onChangeText={count => setCount(count)} />
          </View>
          <View style={{flex:1}}>
            <Button title='+' disabled={count == '' ? true:false} onPress={addOilPacketsCount}/>
          </View>
        </View>
        <View style={{flex:1, flexDirection:'row'}}>
          <View style={{flex:2}}>
            <Input keyboardType='numeric' onChangeText={resetCount => setResetCount(resetCount)}/>
          </View>
          <View style={{flex:1}}>
            <Button title='Set' disabled={resetCount == '' ? true:false} buttonStyle={{backgroundColor: 'red'}} onPress={resetOilPacketsCount}/>
          </View>
        </View>
      </Overlay>
    </View>
  );
}

export default OilCountOverlay;