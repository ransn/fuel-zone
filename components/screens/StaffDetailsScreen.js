import React, {useState} from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Card, Divider, Button, Text, Overlay } from 'react-native-elements';
import ReportComponent from "./ReportComponent";
import AssignPumpOverlay from "./AssignPumpOverlay";
import ReadingOverlay from "./ReadingOverlay";
import OilCountOverlay from "./OilCountOverlay";
import SafedropCountOverlay from "./SafedropCountOverlay";
import LastDropOverlay from "./LastDropOverlay";

function StaffDetailsScreen({ navigation }) {
  const [enableStartWork, setEnableStartWork] = useState(true);
  const [enableEndWork, setEnableEndWork] = useState(false);
  const [enableTotal, setEnableTotal] = useState(false);
  const [calculateOverlayVisible, setCalculateOverlayVisible] = useState(false);
  const [pump, setPump] = useState('');
  const [petrolOpening, setPetrolOpening] = useState(0);
  const [dieselOpening, setDieselOpening] = useState(0);
  const [petrolClosing, setPetrolClosing] = useState(0);
  const [dieselClosing, setDieselClosing] = useState(0);
  const [packetCount, setPacketCount] = useState(0);
  const [packetAmount, setPacketAmount] = useState(0);
  const [safeDropCount, setSafeDropCount] = useState(0);
  const [safeDropAmount, setSafeDropAmount] = useState(0);
  const [lastDrop, setLastDrop] = useState({
    lastCash: Number(0),
    card: Number(0),
    upi: Number(0),
    credit: Number(0)
  });
  const [report, setReport] = useState({
    petrolLiters: Number(0),
    dieselLiters: Number(0),
    oilPackets: Number(0),
    oilAmount: Number(0),
    safeDropCount: Number(0),
    safeDropAmount: Number(0),
    lastDrop: {}
  })
  
  const PETROL = 'Petrol';
  const DIESEL = 'Diesel';
  const OPENING_READING = 'Opening';
  const CLOSING_READING = 'Closing';

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

  const toggleCalculateOverlay = () => {
    setCalculateOverlayVisible(!calculateOverlayVisible);
  }

  const updatePumpDetails = (pumpDetails) => {
    setPump(pumpDetails);
  }

  const updateReading = (readingValue, readingType, fuelType) => {
    if(readingType == OPENING_READING && fuelType == PETROL){
      setPetrolOpening(readingValue);
    }else if(readingType == OPENING_READING && fuelType == DIESEL){
      setDieselOpening(readingValue);
    }else if(readingType == CLOSING_READING && fuelType == PETROL){
      setPetrolClosing(readingValue);
    }else if(readingType == CLOSING_READING && fuelType == DIESEL){
      setDieselClosing(readingValue);
    }
  }

  const updateOilPacketCount = (count) => {
    setPacketCount(count);
    setPacketAmount(Number(count)*20);
  }

  const updateSafedropCount = (count) => {
    setSafeDropCount(Number(count));
    setSafeDropAmount(Number(count)*8000);
  }

  const updateLastDrop = (lastDrop) => {
    setLastDrop(lastDrop);
  }

  const calculateTotal = () => {
    var pLiters = petrolClosing - petrolOpening;
    var dLiters = dieselClosing - dieselOpening;
    setReport({
      petrolLiters: pLiters,
      dieselLiters: dLiters,
      oilPackets: packetCount,
      oilAmount: packetAmount,
      safeDropCount: safeDropCount,
      safeDropAmount: safeDropAmount,
      lastDrop: lastDrop 
    });
    toggleCalculateOverlay();
  }

  return (
    <ScrollView>
    <Card containerStyle={{borderRadius: 5, borderColor: 'cornflowerblue'}}>
      <View style={{flex:1, flexDirection: 'row'}}>
        <Text style={{padding:10, fontSize:15 }}>Assigned:</Text>
        <Text style={{padding:10, fontSize:15, fontWeight:'bold' }}>{pump}</Text>
        <View style={{flex:1, alignItems: 'flex-end'}}>
            <AssignPumpOverlay actionName={updatePumpDetails} />
        </View>
      </View>
    </Card>
      
      <Card containerStyle={{borderRadius: 5, borderColor: 'orange'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex:1}}>
              <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold', color: 'green' }}>Petrol</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <ReadingOverlay fuelType={PETROL} readingType={OPENING_READING} update={updateReading} headerLabel='Petrol Reading' inputLabel='Opening' value={petrolOpening}/>
            </View>
            <View style={{flex:1}}>
              <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>Diesel</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <ReadingOverlay fuelType={DIESEL} readingType={OPENING_READING} update={updateReading} headerLabel='Diesel Reading' inputLabel='Opening' value={dieselOpening}/>
            </View>
          </View>
          <Divider />
          <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={{flex: 1, padding: 10, fontSize:15 }}>Opening: </Text>
            <Text style={{flex: 1, padding: 10,fontSize:15, fontWeight: 'bold', color: 'green'}}>{petrolOpening}</Text>
            <Text style={{flex: 1, padding: 10, fontSize:15 }}>Opening: </Text>
            <Text style={{flex: 1, padding: 10,fontSize:15, fontWeight: 'bold'}}>{dieselOpening}</Text>
          </View>
      </Card>
      {
        enableStartWork &&
        <View style={{flex:1, padding: 20}}>
          <Button title='Start Work' onPress= {saveOpeningReading}/>
        </View>
      }
      {
        !enableStartWork &&
        <>
          <Card containerStyle={{borderRadius: 5, borderColor: 'blue'}}>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>Oils:</Text>
                <View style={{flex:1}} alignItems='flex-end'>
                  <OilCountOverlay update={updateOilPacketCount} value={packetCount}/>
                </View>
              </View>
              <Card.Divider/>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={{flex:1, padding: 10, fontSize:15 }}>Packets:</Text>
                <Text style={{flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>{packetCount}</Text>
                <Text style={{flex:1, padding: 10, fontSize:15 }}>Amount:</Text>
                <Text style={{flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>{packetAmount}</Text>
              </View>
            </Card>

            <Card containerStyle={{borderRadius: 5, borderColor: 'green'}}>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>Safe Drops:</Text>
                <View style={{flex:1}} alignItems='flex-end'>
                  <SafedropCountOverlay update={updateSafedropCount} value={safeDropCount}/>
                </View>
              </View>
              <Card.Divider/>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={{flex:1, padding: 10, fontSize:15 }}>Count:</Text>
                <Text style={{flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>{safeDropCount}</Text>
                <Text style={{flex:1, padding: 10, fontSize:15 }}>Amount:</Text>
                <Text style={{flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>{safeDropAmount}</Text>
              </View>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>Last Drop:</Text>
                <View style={{flex:1}} alignItems='flex-end'>
                  <LastDropOverlay update={updateLastDrop} value={lastDrop}/>
                </View>
              </View>
              <Card.Divider/>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={{flex:1, padding: 10, fontSize:15 }}>Last Cash:</Text>
                <Text style={{flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>{lastDrop.lastCash}</Text>
                <Text style={{flex:1, padding: 10, fontSize:15 }}>Card:</Text>
                <Text style={{flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>{lastDrop.card}</Text>
              </View>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={{flex:1, padding: 10, fontSize:15 }}>UPI:</Text>
                <Text style={{flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>{lastDrop.upi}</Text>
                <Text style={{flex:1, padding: 10, fontSize:15 }}>Credit:</Text>
                <Text style={{flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>{lastDrop.credit}</Text>
              </View>
            </Card>
        </>
      }
      
      {
        !enableStartWork &&
        <>
          <Card containerStyle={{borderRadius: 5, borderColor: 'red'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex:1}}>
              <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold', color: 'green' }}>Petrol</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <ReadingOverlay fuelType={PETROL} readingType={CLOSING_READING} update={updateReading} headerLabel='Petrol Reading' inputLabel='Closing' value={petrolClosing}/>
            </View>
            <View style={{flex:1}}>
              <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>Diesel</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <ReadingOverlay fuelType={DIESEL} readingType={CLOSING_READING} update={updateReading} headerLabel='Diesel Reading' inputLabel='Closing' value={dieselClosing}/>
            </View>
          </View>
          <Divider />
          <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={{flex: 1, padding: 10, fontSize:15 }}>Closing: </Text>
            <Text style={{flex: 1, padding: 10,fontSize:15, fontWeight: 'bold', color: 'green'}}>{petrolClosing}</Text>
            <Text style={{flex: 1, padding: 10, fontSize:15 }}>Closing: </Text>
            <Text style={{flex: 1, padding: 10,fontSize:15, fontWeight: 'bold'}}>{dieselClosing}</Text>
          </View>
        </Card>
          {
            enableEndWork &&

            <View style={{flex:1, flexDirection:'row', justifyContent: 'center'}}>
              <View style={{flex: 1, padding: 10}}>
                <Button buttonStyle={{borderRadius:20}} title='Calculate Total' onPress={calculateTotal}/>
                <Overlay overlayStyle={{height: 350, width: 370, borderRadius: 10}} isVisible={calculateOverlayVisible} onBackdropPress={toggleCalculateOverlay} supportedOrientations={['portrait', 'landscape']}>
                    <ScrollView style={{flex: 1}}>
                      <ReportComponent value={report}/>
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
          <ReportComponent value={report}/>
      }
    </ScrollView>
  );
}

export default StaffDetailsScreen;