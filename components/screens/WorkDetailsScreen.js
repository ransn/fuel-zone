import React, {useState, useEffect} from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Card, Divider, Button, Text, Overlay } from 'react-native-elements';
import ReportComponent from "./ReportComponent";
import AssignPumpOverlay from "./AssignPumpOverlay";
import AssignStaffOverlay from "./AssignStaffOverlay";
import ReadingOverlay from "./ReadingOverlay";
import OilCountOverlay from "./OilCountOverlay";
import SafedropCountOverlay from "./SafedropCountOverlay";
import LastDropOverlay from "./LastDropOverlay";

function WorkDetailsScreen({ route, navigation }) {
  const initialWork = {
    name: '',
    status: 'N',
    pumpName: '',
    operatorName: ''
  };
  const [work, setWork] = useState(initialWork);
  const [status, setStatus] = useState('N');
  useEffect(()=>{

    if(route.params?.workName && route.params.workName.length > 0){
      const name = route.params.workName;
      let updatedWork = work;
      updatedWork.name = name;
      setWork(updatedWork);
      navigation.setOptions({title: work.name});
    }
    else if(route.params?.workItem){
      setWork(route.params.workItem);
      navigation.setOptions({title: work.name});
    }

  }, [work]);

  const [fuelDetails, setFuelDetails] = useState({
    petrolOpening: parseInt(0),
    petrolClosing: parseInt(0),
    dieselOpening: parseInt(0),
    dieselClosing: parseInt(0)
  });
  const [oilDetails, setOilDetails] = useState({
    packetCount: parseInt(0),
    packetAmount: parseInt(0)
  });
  const [safeDropDetails, setSafeDropDetails] = useState({
    safeDropCount: parseInt(0),
    safeDropAmount: parseInt(0)
  });
  const [lastDropDetails, setLastDropDetails] = useState({
    lastCash: parseInt(0),
    card: parseInt(0),
    upi: parseInt(0),
    credit: parseInt(0)
  });
  const [calculateOverlayVisible, setCalculateOverlayVisible] = useState(false);  
  const [report, setReport] = useState({
    fuelDetails: fuelDetails,
    oilDetails: oilDetails,
    safeDropDetails: safeDropDetails,
    lastDropDetails: lastDropDetails
  })
  
  const PETROL = 'Petrol';
  const DIESEL = 'Diesel';
  const OPENING_READING = 'Opening';
  const CLOSING_READING = 'Closing';

  const startWork = () => {
    let updatedWork = work;
    updatedWork.status = 'A';
    setWork(updatedWork);
    navigation.navigate({
      name: 'WorkList',
      params: {work: work}
    })
  };

  const endWork = () => {
    let updatedWork = work;
    updatedWork.status = 'I';
    setWork(updatedWork);
  }

  const toggleCalculateOverlay = () => {
    setCalculateOverlayVisible(!calculateOverlayVisible);
  }

  const updatePumpDetails = (pumpDetails) => {
    setWork({...work, pumpName: pumpDetails});
  }

  const updateOperatorDetails = (opreatorName) => {
    setWork({...work, operatorName: opreatorName});
  }

  const updateReading = (readingValue, readingType, fuelType) => {
    if(readingType == OPENING_READING && fuelType == PETROL){
      setFuelDetails({...fuelDetails, petrolOpening: readingValue});
    }else if(readingType == OPENING_READING && fuelType == DIESEL){
      setFuelDetails({...fuelDetails, dieselOpening: readingValue});
    }else if(readingType == CLOSING_READING && fuelType == PETROL){
      setFuelDetails({...fuelDetails, petrolClosing: readingValue});
    }else if(readingType == CLOSING_READING && fuelType == DIESEL){
      setFuelDetails({...fuelDetails, dieselClosing: readingValue});
    }
  }

  const updateOilPacketCount = (count) => {
    setOilDetails({...oilDetails, packetCount: count, packetAmount: parseInt(count)*20});
  }

  const updateSafedropCount = (count) => {
    setSafeDropDetails({
      ...safeDropDetails,
      safeDropCount: parseInt(count),
      safeDropAmount: parseInt(count)*8000
    });
  }

  const updateLastDrop = (lastDropDetails) => {
    setLastDropDetails(lastDropDetails);
  }

  const calculateTotal = () => {
    setReport({
      fuelDetails: fuelDetails,
      oilDetails: oilDetails,
      safeDropDetails: safeDropDetails,
      lastDropDetails: lastDropDetails
    });
    toggleCalculateOverlay();
  }

  return (
    <ScrollView>
    <Card containerStyle={{borderRadius: 5, borderColor: 'cornflowerblue'}}>
      <View style={{flex:1, flexDirection: 'row'}}>
        <Text style={{flex:0.8, padding:10, fontSize:15 }}>Pump:</Text>
        <Text style={{flex:1, padding:10, fontSize:15, fontWeight:'bold' }}>{work.pumpName}</Text>
        <View style={{flex:1, alignItems: 'flex-end'}}>
            <AssignPumpOverlay actionName={updatePumpDetails} />
        </View>
      </View>
      <Divider />
      <View style={{flex:1, flexDirection: 'row'}}>
        <Text style={{flex:0.8, padding:10, fontSize:15 }}>Operator:</Text>
        <Text style={{flex:1, padding:10, fontSize:15, fontWeight:'bold' }}>{work.operatorName}</Text>
        <View style={{flex:1, alignItems: 'flex-end'}}>
            <AssignStaffOverlay actionName={updateOperatorDetails} />
        </View>
      </View>
    </Card>
      
      <Card containerStyle={{borderRadius: 5, borderColor: 'orange'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex:1}}>
              <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold', color: 'green' }}>Petrol</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <ReadingOverlay fuelType={PETROL} readingType={OPENING_READING} update={updateReading} headerLabel='Petrol Reading' inputLabel='Opening' value={parseInt(fuelDetails.petrolOpening)}/>
            </View>
            <View style={{flex:1}}>
              <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>Diesel</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <ReadingOverlay fuelType={DIESEL} readingType={OPENING_READING} update={updateReading} headerLabel='Diesel Reading' inputLabel='Opening' value={parseInt(fuelDetails.dieselOpening)}/>
            </View>
          </View>
          <Divider />
          <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={{flex: 1, padding: 10, fontSize:15 }}>Opening: </Text>
            <Text style={{flex: 1, padding: 10,fontSize:15, fontWeight: 'bold', color: 'green'}}>{fuelDetails.petrolOpening}</Text>
            <Text style={{flex: 1, padding: 10, fontSize:15 }}>Opening: </Text>
            <Text style={{flex: 1, padding: 10,fontSize:15, fontWeight: 'bold'}}>{fuelDetails.dieselOpening}</Text>
          </View>
      </Card>
      {
        work.status == "N" &&
        <View style={{flex:1, padding: 20}}>
          <Button title='Start Work' onPress= {startWork} disabled={(work.pumpName == '' || work.operatorName == '') ? true:false} />
        </View>
      }
      {
        (work.status == 'A' ||  work.status == 'I') &&
        <>
          <Card containerStyle={{borderRadius: 5, borderColor: 'blue'}}>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>Oils:</Text>
                <View style={{flex:1}} alignItems='flex-end'>
                  <OilCountOverlay update={updateOilPacketCount} value={oilDetails.packetCount}/>
                </View>
              </View>
              <Card.Divider/>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={{flex:1, padding: 10, fontSize:15 }}>Packets:</Text>
                <Text style={{flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>{oilDetails.packetCount}</Text>
                <Text style={{flex:1, padding: 10, fontSize:15 }}>Amount:</Text>
                <Text style={{flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>{oilDetails.packetAmount}</Text>
              </View>
            </Card>

            <Card containerStyle={{borderRadius: 5, borderColor: 'green'}}>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>Safe Drops:</Text>
                <View style={{flex:1}} alignItems='flex-end'>
                  <SafedropCountOverlay update={updateSafedropCount} value={safeDropDetails.safeDropCount}/>
                </View>
              </View>
              <Card.Divider/>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={{flex:1, padding: 10, fontSize:15 }}>Count:</Text>
                <Text style={{flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>{safeDropDetails.safeDropCount}</Text>
                <Text style={{flex:1, padding: 10, fontSize:15 }}>Amount:</Text>
                <Text style={{flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>{safeDropDetails.safeDropAmount}</Text>
              </View>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>Last Drop:</Text>
                <View style={{flex:1}} alignItems='flex-end'>
                  <LastDropOverlay update={updateLastDrop} value={lastDropDetails}/>
                </View>
              </View>
              <Card.Divider/>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={{flex:1, padding: 10, fontSize:15 }}>Last Cash:</Text>
                <Text style={{flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>{lastDropDetails.lastCash}</Text>
                <Text style={{flex:1, padding: 10, fontSize:15 }}>Card:</Text>
                <Text style={{flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>{lastDropDetails.card}</Text>
              </View>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={{flex:1, padding: 10, fontSize:15 }}>UPI:</Text>
                <Text style={{flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>{lastDropDetails.upi}</Text>
                <Text style={{flex:1, padding: 10, fontSize:15 }}>Credit:</Text>
                <Text style={{flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>{lastDropDetails.credit}</Text>
              </View>
            </Card>
        </>
      }
      
      {
        (work.status == 'A' ||  work.status == 'I') &&
        <>
          <Card containerStyle={{borderRadius: 5, borderColor: 'red'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex:1}}>
              <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold', color: 'green' }}>Petrol</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <ReadingOverlay fuelType={PETROL} 
                  readingType={CLOSING_READING} 
                  update={updateReading} 
                  headerLabel='Petrol Reading' 
                  inputLabel='Closing' 
                  value={fuelDetails.petrolClosing}
              />
            </View>
            <View style={{flex:1}}>
              <Text style={{ flex:1, padding: 10, fontSize:15, fontWeight:'bold' }}>Diesel</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <ReadingOverlay fuelType={DIESEL} readingType={CLOSING_READING} update={updateReading} headerLabel='Diesel Reading' inputLabel='Closing' value={fuelDetails.dieselClosing}/>
            </View>
          </View>
          <Divider />
          <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={{flex: 1, padding: 10, fontSize:15 }}>Closing: </Text>
            <Text style={{flex: 1, padding: 10,fontSize:15, fontWeight: 'bold', color: 'green'}}>{fuelDetails.petrolClosing}</Text>
            <Text style={{flex: 1, padding: 10, fontSize:15 }}>Closing: </Text>
            <Text style={{flex: 1, padding: 10,fontSize:15, fontWeight: 'bold'}}>{fuelDetails.dieselClosing}</Text>
          </View>
        </Card>
          {
            work.status == 'A' &&

            <View style={{flex:1, flexDirection:'row', justifyContent: 'center'}}>
              <View style={{flex: 1, padding: 10}}>
                <Button buttonStyle={{borderRadius:20}} 
                        title='Calculate Total' 
                        onPress={calculateTotal}
                        disabled={(fuelDetails.petrolClosing == 0 || fuelDetails.dieselClosing == 0) ? true : false}        
                />
                <Overlay overlayStyle={{height: 350, width: 370, borderRadius: 10}} isVisible={calculateOverlayVisible} onBackdropPress={toggleCalculateOverlay} supportedOrientations={['portrait', 'landscape']}>
                    <ScrollView style={{flex: 1}}>
                      <ReportComponent value={report}/>
                    </ScrollView>
                </Overlay>
              </View>
              {
                work.status == 'A' && 
                <View style={{flex:1, padding: 10}}>
                  <Button 
                    buttonStyle={{backgroundColor:'crimson', borderRadius:20}} 
                    title='End Work' 
                    onPress= {endWork}
                    disabled={(fuelDetails.petrolClosing == 0 || fuelDetails.dieselClosing == 0) ? true : false} 
                  />
                </View>
              }
            </View>
          }
        </>
      }
      {
        work.status == "I" &&
          <ReportComponent value={report}/>
      }
    </ScrollView>
  );
}

export default WorkDetailsScreen;