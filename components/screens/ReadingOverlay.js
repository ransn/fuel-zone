import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';

function ReadingOverlay(props, { navigation }) {
  console.log(props)
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [reading, setReading] = useState(props.value);
  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };
  const toggleOverlayBackdrop = () => {
    setReading(props.value);
    toggleOverlay();
  }
  const updateOverlayReading = () => {
    props.update(reading, props.readingType, props.fuelType);
    toggleOverlay();
  }

  return (
    <View>
      <Button icon={{name: "create-outline", type:'ionicon', size: 20, color: "dodgerblue"}} type='clear' onPress={toggleOverlay}/>
      <Overlay overlayStyle={{height: 200, width: 250, borderRadius: 10}} 
        visible={overlayVisible} 
        onBackdropPress={toggleOverlayBackdrop} 
        supportedOrientations={['portrait', 'landscape']}
      >
        <Text style={{ padding: 10, fontSize:18, fontWeight:'bold' }}>{props.headerLabel}</Text>
        <Input keyboardType='numeric' label={props.inputLabel} onChangeText={reading => setReading(reading)} />
        <Button title='Done' onPress={updateOverlayReading}/>
      </Overlay>
    </View>
  );
}

export default ReadingOverlay;