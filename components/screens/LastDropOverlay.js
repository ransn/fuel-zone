import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';

function LastDropOverlay(props, { navigation }) {
  const [lastDrop, setLastDrop] = useState({
    lastCash: Number(0),
    card: Number(0),
    upi: Number(0),
    credit: Number(0)
  });
  const [overlayVisible, setOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };
  const toggleOverlayBackdrop = () => {
    setLastDrop(props.value);
    toggleOverlay();
  }
  const updateLastDrop = () => {
    props.update(lastDrop);
    toggleOverlay();
  }

  return (
    <View>
      <Button icon={{name: "create-outline", type:'ionicon', size: 20, color: "dodgerblue"}} type='clear' onPress={toggleOverlay} />
      <Overlay overlayStyle={{height: 300, width: 350, borderRadius: 10}} 
        visible={overlayVisible} 
        onBackdropPress={toggleOverlayBackdrop} 
        supportedOrientations={['portrait', 'landscape']}
      >
        <Text style={{ padding: 10, fontSize:18, fontWeight:'bold' }}>Last Drop: </Text>
        <View style={{flex:1, flexDirection:'row'}}>
          
          <View style={{flex:1}}>
            <Input keyboardType='numeric' 
                   label='Last Cash'
                   onChangeText={cash => setLastDrop({...lastDrop, lastCash: cash})} />
          </View>

          <View style={{flex:1}}>
            <Input keyboardType='numeric' 
                  label='Card' 
                  onChangeText={cardAmt => setLastDrop({...lastDrop, card: cardAmt})} />
          </View>
          
        </View>
        <View style={{flex:1, flexDirection:'row'}}>
          <View style={{flex:1}}>
            <Input keyboardType='numeric' 
                label='UPI'
                onChangeText={upiAmt => setLastDrop({...lastDrop, upi: upiAmt})} />
          </View>

          <View style={{flex:1}}>
            <Input keyboardType='numeric' 
                label='Credit' 
                onChangeText={creditAmt => setLastDrop({...lastDrop, credit: creditAmt})} />
          </View>
        </View>
        <Button title='Done' onPress={updateLastDrop}/>
      </Overlay>
    </View>
  );
}

export default LastDropOverlay;