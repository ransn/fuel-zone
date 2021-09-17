import React, {useState, useContext} from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, Overlay, Input, CheckBox } from 'react-native-elements';
import PriceContext from "../PriceContext"

function AddCreditOverlay(props, { navigation }) {
  const priceDetails = useContext(PriceContext);
  const petrolTitle = 'Petrol ('+priceDetails.petrol+')';
  const dieselTitle = 'Diesel ('+priceDetails.diesel+')';
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selected, setSelected] = useState(true);
  const [creditDetails, setCreditDetails] = useState({
    date: '',
    fuelType: 'Petrol',
    liters: 0,
    amount: 0
  });
  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };
  const toggleOverlayBackdrop = () => {
    toggleOverlay();
  }
  const onAddCreditDetails = () => {
    var date = new Date();
    setCreditDetails({
      date: date.getDate()+'/'+date.getMonth()+'/'+date.getYear(),
      fuelType: 'Petrol',
      liters: 0,
      amount: 0
    });
    toggleOverlay();
  }
  const handlePress = (fuelType) => {
    var price = fuelType == 'Petrol' ? priceDetails.petrol : priceDetails.diesel;
    var amount = (creditDetails.liters*price).toFixed(2);
    setSelected(fuelType == 'Petrol');
    setCreditDetails({...creditDetails, fuelType:fuelType, amount:amount});
  }

  const updateCreditDetails = (ltrs) => {
    var fuelType = selected ? 'Petrol' : 'Diesel';
    var price = fuelType == 'Petrol' ? priceDetails.petrol : priceDetails.diesel;
    var amount = (ltrs*price).toFixed(2);
    setCreditDetails({...creditDetails, fuelType:fuelType, liters:ltrs, amount:amount});
  }

  const updateOverlayReading = () => {
    props.update(creditDetails);
    toggleOverlay();
  }

  return (
    <View>
      <Button icon={{name: 'add-circle', type:'ionicon', size: 30, color: "dodgerblue"}} type='clear' onPress={onAddCreditDetails}/>
          <Overlay overlayStyle={{height: 280, width: 350, borderRadius: 10}} isVisible={overlayVisible} onBackdropPress={toggleOverlay} supportedOrientations={['portrait', 'landscape']}>
          <ScrollView style={{flex: 1}}>
            <Text style={{flex:0.9, padding: 10, fontSize:15, fontWeight:'bold' }}>Add Credit:</Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <CheckBox title={petrolTitle} checked={selected} iconType="material" checkedIcon="check-box"
                  uncheckedIcon="check-box-outline-blank"
                  onPress={() => handlePress('Petrol')}/>
              </View>
              <View style={{flex:1}}>
                <CheckBox title={dieselTitle} checked={!selected} iconType="material" checkedIcon="check-box"
                  uncheckedIcon="check-box-outline-blank"
                  onPress={() => handlePress('Diesel')}/>
              </View>
            </View>
            <View style={{paddingTop: 10, flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}}><Input placeholder='Liters' onChangeText={ltrs => updateCreditDetails(ltrs)} /></View>
              <Text style={{flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>{creditDetails.amount.toString()}</Text>
            </View>
            <Button title='Add' onPress={updateOverlayReading}/>
          </ScrollView>
        </Overlay>
    </View>
  );
}

export default AddCreditOverlay;