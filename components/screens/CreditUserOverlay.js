import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';

function CreditUserOverlay(props, { navigation }) {
  // const [overlayVisible, setOverlayVisible] = useState(false);
  // const [userName, setUserName] = useState('');
  // const [userMobileNumber, setUserMobileNumber] = useState('');
  // const toggleOverlay = () => {
  //   setOverlayVisible(!overlayVisible);
  // };
  // const toggleOverlayBackdrop = () => {
  //   setReading(props.value);
  //   toggleOverlay();
  // }
  // const updateOverlayInput = () => {
  //   let userDetails = {
  //     userName: userName,
  //     userMobileNumber: userMobileNumber
  //   }
  //   props.update(userDetails, props.actionType);
  //   toggleOverlay();
  // }

  return (
    <Overlay overlayStyle={{height: 280, width: 350, borderRadius: 10}} isVisible={visibleForm} onBackdropPress={toggleAddCreditUserOverlay} supportedOrientations={['portrait', 'landscape']}>
          <ScrollView style={{flex: 1}}>
            <Text style={{flex:0.9, padding: 5, fontSize:15, fontWeight:'bold' }}>Credit User:</Text>
            <Input label='Name' onChangeText={userName => setUserName(userName)}/>
            <Input label='Mobile' maxLength={10} onChangeText={mobileNumber => setUserMobileNumber(mobileNumber)} keyboardType='numeric'/>
            <Button title='Add' onPress={updateOverlayInput}/>
          </ScrollView>
      </Overlay>
  );
}

export default CreditUserOverlay;