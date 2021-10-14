import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';

function SafedropCountOverlay(props, { navigation }) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [resetCount, setResetCount] = useState(0);
  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
    setResetCount(0);
  };
  const toggleOverlayBackdrop = () => {
    toggleOverlay();
    setResetCount(0);
  }
  const incrementSafedropCount = () => {
    var totalCount= Number(props.value)+1;
    props.update(totalCount);
    toggleOverlay();
  }

  const decrementSafedropCount = () => {
    var totalCount= Number(props.value)-1;
    props.update(totalCount);
    toggleOverlay();
  }

  const resetSafedropsCount = () => {
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
        <Text style={{ padding: 10, fontSize:18, fontWeight:'bold' }}>Safe Drops: {props.value}</Text>
        <View style={{flex:1, flexDirection:'row'}}>
         
          <View style={{flex:1, padding: 10}}>
            <Button title='+ 1' onPress={incrementSafedropCount}/>
          </View>
           
          <View style={{flex:1, padding: 10}}>
            <Button title='- 1' onPress={decrementSafedropCount}/>
          </View>
        </View>
        <View style={{flex:1, flexDirection:'row'}}>
          <View style={{flex:2}}>
            <Input keyboardType='numeric' onChangeText={resetCount => setResetCount(resetCount)} />
          </View>
          <View style={{flex:1}}>
            <Button title='Set' disabled={Number(resetCount) == 0 ? true:false} buttonStyle={{backgroundColor: 'red'}} onPress={resetSafedropsCount}/>
          </View>
        </View>
      </Overlay>
    </View>
  );
}

export default SafedropCountOverlay;