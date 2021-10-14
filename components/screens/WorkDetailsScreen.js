import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, View, Image, ScrollView, Alert } from 'react-native';
import { Card, Divider, Button, Text, Overlay } from 'react-native-elements';
import ReportComponent from "./ReportComponent";
import AssignPumpOverlay from "./AssignPumpOverlay";
import AssignStaffOverlay from "./AssignStaffOverlay";
import ReadingOverlay from "./ReadingOverlay";
import OilCountOverlay from "./OilCountOverlay";
import SafedropCountOverlay from "./SafedropCountOverlay";
import LastDropOverlay from "./LastDropOverlay";
import PriceContext from "../PriceContext"
import firestore from '@react-native-firebase/firestore';

function WorkDetailsScreen({ route, navigation }) {
  const workRef = firestore().collection('works');
  const fuelDetailsRef = firestore().collection('fuelDetails');
  const oilDetailsRef = firestore().collection('oilDetails');
  const safeDropDetailsRef = firestore().collection('safeDropDetails');
  const lastDropDetailsRef = firestore().collection('lastDropDetails');
  const reportsRef = firestore().collection('reports');

  const {priceDetails} = useContext(PriceContext);
  const initialWork = {
    name: '',
    status: 'N',
    pumpName: '',
    operatorName: '',
    timestamp:''
  };
  const [work, setWork] = useState(initialWork);
  const [status, setStatus] = useState('N');
  useEffect(()=>{
    if(route.params?.workItem){
      var workId = route.params.workItem.id;
      workRef.doc(workId).get().then((workDetails)=>{
        setWork(workDetails.data());
        navigation.setOptions({title: workDetails.data().name});
      });
      fuelDetailsRef.doc(workId).get().then((fuelDetails)=>{
        setFuelDetails(fuelDetails.data());
      });
      oilDetailsRef.doc(workId).get().then((oilDetails)=>{
        if(oilDetails.data()){
          setOilDetails(oilDetails.data())
        }
      });
      safeDropDetailsRef.doc(workId).get().then((safeDropDetails)=>{
        if(safeDropDetails.data()){
          setSafeDropDetails(safeDropDetails.data());
        }
      });
      lastDropDetailsRef.doc(workId).get().then((lastDropDetails)=>{
        if(lastDropDetails.data()){
          setLastDropDetails(lastDropDetails.data());
        }
      });
    }else{
      const name = 'Work';
      let updatedWork = work;
      updatedWork.name = name;
      updatedWork.timestamp = firestore.FieldValue.serverTimestamp();
      setWork(updatedWork);
      navigation.setOptions({title: name});
    }
  }, []);

  const [fuelDetails, setFuelDetails] = useState({
    petrolOpening: Number(0),
    petrolClosing: Number(0),
    dieselOpening: Number(0),
    dieselClosing: Number(0),
    petrolUgt: Number(0),
    dieselUgt: Number(0),
    petrolPrice: priceDetails.petrol,
    dieselPrice: priceDetails.diesel,
    petrolAmount: Number(0),
    dieselAmount: Number(0),
    petrolUgtAmount: Number(0),
    dieselUgtAmount: Number(0)
  });
  const [oilDetails, setOilDetails] = useState({
    packetCount: Number(0),
    packetPrice: priceDetails.oilPacket,
    amount: Number(0)
  });
  const [safeDropDetails, setSafeDropDetails] = useState({
    safeDropCount: Number(0),
    amount: Number(0)
  });
  const [lastDropDetails, setLastDropDetails] = useState({
    lastCash: Number(0),
    card: Number(0),
    upi: Number(0),
    credit: Number(0)
  });
  const [calculatedReport, setCalculatedReport] = useState({
    fuelDetails: {},
    oilDetails: {},
    safeDropDetails: {},
    lastDropDetails: {},
    salesTotal: 0,
    returnsTotal: 0,
    difference: 0
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
  const UGT_READING = 'Ugt'

  const startWork = () => {
    let updatedWork = work;
    updatedWork.status = 'A';
    updatedWork.name = 'Work_'+work.pumpName;
    const documentReference = workRef.doc();
    const workId = documentReference.id;
    updatedWork.id = workId;
    setWork(updatedWork);
    
    documentReference.set(work).then(()=>{
      console.log('Work details added');
      fuelDetailsRef.doc(workId).set(fuelDetails).then(()=>{
        console.log('Fuel details added');
      });
    });
    navigation.navigate({
      name: 'WorkList'
    })
  };

  const endWork = () => {
    Alert.alert(
      "End Work",
      "Are you sure to end this work ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
            let validReport = createReport();
            if(validReport){
              let updatedWork = work;
              updatedWork.status = 'I';
              setWork(updatedWork);
              let validReport = createReport();
              workRef.doc(work.id).set(updatedWork).then(()=>{
                navigation.navigate({
                  name: 'WorkList'
                })
              });
            }
          } 
        }
      ]
    );
    
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
    var updatedFuelDetails = fuelDetails;
    if(readingType == OPENING_READING && fuelType == PETROL){
      setFuelDetails({...fuelDetails, petrolOpening: readingValue});
      updatedFuelDetails.petrolOpening = readingValue;
    }else if(readingType == OPENING_READING && fuelType == DIESEL){
      setFuelDetails({...fuelDetails, dieselOpening: readingValue});
      updatedFuelDetails.dieselOpening = readingValue;
    }else if(readingType == CLOSING_READING && fuelType == PETROL){
      setFuelDetails({...fuelDetails, petrolClosing: readingValue});
      updatedFuelDetails.petrolClosing = readingValue;
    }else if(readingType == CLOSING_READING && fuelType == DIESEL){
      setFuelDetails({...fuelDetails, dieselClosing: readingValue});
      updatedFuelDetails.dieselClosing = readingValue;
    }else if(readingType == UGT_READING && fuelType == PETROL){
      setFuelDetails({...fuelDetails, petrolUgt: readingValue});
      updatedFuelDetails.petrolUgt = readingValue;
    }else if(readingType == UGT_READING && fuelType == DIESEL){
      setFuelDetails({...fuelDetails, dieselUgt: readingValue});
      updatedFuelDetails.dieselUgt = readingValue;
    }
    if(readingType != OPENING_READING){
      if(work.id){
        fuelDetailsRef.doc(work.id).set(updatedFuelDetails).then(()=>{
        console.log('Fuel details updated');
        });
      }else{
        console.log('work id is empty');
      }
    }
  }

  const updateOilPacketCount = (count) => {
    var updatedOilDetails = oilDetails;
    updatedOilDetails.packetCount = count;
    updatedOilDetails.amount = count*priceDetails.oilPacket;
    setOilDetails({...oilDetails, packetCount: count, amount: count*priceDetails.oilPacket});
    if(work.id){
      oilDetailsRef.doc(work.id).set(updatedOilDetails).then(()=>{
        console.log('Oil details updated');
      });
    }else{
      console.log('work id is empty');
    }
  }

  const updateSafedropCount = (count) => {
    var updatedSafeDropDetails = safeDropDetails;
    updatedSafeDropDetails.safeDropCount = Number(count);
    updatedSafeDropDetails.amount = Number(count)*8000;
    setSafeDropDetails({
      ...safeDropDetails,
      safeDropCount: Number(count),
      amount: Number(count)*8000
    });
    if(work.id){
      safeDropDetailsRef.doc(work.id).set(updatedSafeDropDetails).then(()=>{
        console.log('Safe drop details updated');
      });
    }else{
      console.log('work id is empty');
    }
  }

  const updateLastDrop = (updatedLastDropDetails) => {
    setLastDropDetails(updatedLastDropDetails);
    if(work.id){
      lastDropDetailsRef.doc(work.id).set(updatedLastDropDetails).then(()=>{
        console.log('Last drop details updated');
      });
    }else{
      console.log('work id is empty');
    }
  }

  const calculateAndUpdateFuelDetails = () => {
    var updatedFuelDetails = fuelDetails;
    const {petrolOpening, petrolClosing, 
            dieselOpening, dieselClosing, 
            petrolUgt, dieselUgt} = fuelDetails;
    var petrolAmount = (petrolClosing - petrolOpening)*priceDetails.petrol;
    var dieselAmount = (dieselClosing - dieselOpening)*priceDetails.diesel;
    var petrolUgtAmt = petrolUgt*priceDetails.petrol;
    var dieselUgtAmt = dieselUgt*priceDetails.diesel;

    updatedFuelDetails.petrolPrice = priceDetails.petrol;
    updatedFuelDetails.dieselPrice = priceDetails.diesel;
    updatedFuelDetails.petrolAmount = petrolAmount;
    updatedFuelDetails.dieselAmount = dieselAmount;
    updatedFuelDetails.petrolUgtAmount = petrolUgtAmt;
    updatedFuelDetails.dieselUgtAmount = dieselUgtAmt;
    
    setFuelDetails(updatedFuelDetails);

    if(work.id){
      fuelDetailsRef.doc(work.id).set(updatedFuelDetails).then(()=>{
        console.log('Fuel details updated');
      });
    }else{
      console.log('work id is empty');
    }
    return updatedFuelDetails;
  }

  const calculateAndUpdateOilDetails = () => {
    var updatedOilDetails = oilDetails;
    var totalPacketsAmount = oilDetails.packetCount * priceDetails.oilPacket; 
    if(oilDetails.amount != totalPacketsAmount){
      updatedOilDetails.amount = totalPacketsAmount;
      updatedOilDetails.packetPrice = priceDetails.oilPacket;
      setOilDetails(updatedOilDetails);
      if(work.id){
      oilDetailsRef.doc(work.id).set(updatedOilDetails).then(()=>{
        console.log('Preview - Oil details updated');
      });
      }else{
        console.log('work id is empty');
      }
    }
    return updatedOilDetails;
  }

  const calculateSalesTotal = () => {
    const {petrolAmount, dieselAmount} = calculateAndUpdateFuelDetails();
    const {amount} = calculateAndUpdateOilDetails();
    var salesTotal = petrolAmount+dieselAmount+amount;
    return salesTotal;
  }

  const calculateReturnsTotal = () => {
    const {amount} = safeDropDetails;
    const {lastCash, card, upi, credit} = lastDropDetails;
    const returnsTotal = Number(amount)+
                        Number(lastCash)+
                        Number(card)+
                        Number(upi)+
                        Number(credit)-
                        Number(fuelDetails.petrolUgtAmount)-
                        Number(fuelDetails.dieselUgtAmount);
    return returnsTotal;
  }

  useEffect(()=>{
    if(work.id){
      reportsRef.doc(work.id).set(calculatedReport).then(()=>{
        console.log('Report added ..');
        toggleCalculateOverlay();
      });
    }
  }, [calculatedReport])

  const createReport = () => {
    let validReport = false;
    if(Number(fuelDetails.petrolClosing) <= Number(fuelDetails.petrolOpening)){
      validReport = false;
      Alert.alert(
        "Invalid Petrol Closing",
        "Closing should be > than : "+ fuelDetails.petrolOpening,
        [
          {
            text: "OK",
            onPress: () => console.log("Ok Pressed"),
            style: "cancel"
          }
        ]
      );
    } else if(Number(fuelDetails.dieselClosing) <= Number(fuelDetails.dieselOpening)){
      validReport = false;
      Alert.alert(
        "Invalid Diesel Closing",
        "Closing should be > than : "+ fuelDetails.dieselOpening,
        [
          {
            text: "OK",
            onPress: () => console.log("Ok Pressed"),
            style: "cancel"
          }
        ]
      );
    } else{
      validReport = true;
      const salesTotal = calculateSalesTotal();
      const returnsTotal = calculateReturnsTotal();
      const difference = salesTotal - returnsTotal;
      setCalculatedReport({...calculatedReport,
        fuelDetails: fuelDetails,
        oilDetails: oilDetails,
        safeDropDetails: safeDropDetails,
        lastDropDetails: lastDropDetails,
        salesTotal: salesTotal,
        returnsTotal: returnsTotal,
        difference: difference
      });
    }
    return validReport;
  }

  return (
    <ScrollView>
    <Card containerStyle={{borderRadius: 5, borderColor: 'cornflowerblue'}}>
      <View style={{flex:1, flexDirection: 'row'}}>
        <Text style={styles.pumpOperatorLabel}>Pump:</Text>
        <Text style={styles.valueText}>{work.pumpName}</Text>
        <View style={{flex:1, alignItems: 'flex-end'}}>
            <AssignPumpOverlay actionName={updatePumpDetails} />
        </View>
      </View>
      <Divider />
      <View style={{flex:1, flexDirection: 'row'}}>
        <Text style={styles.pumpOperatorLabel}>Operator:</Text>
        <Text style={styles.valueText}>{work.operatorName}</Text>
        <View style={{flex:1, alignItems: 'flex-end'}}>
            <AssignStaffOverlay actionName={updateOperatorDetails} />
        </View>
      </View>
    </Card>
      
      <Card containerStyle={{borderRadius: 5, borderColor: 'orange'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex:1}}>
              <Text style={styles.valueTextGreen}>Petrol</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <ReadingOverlay fuelType={PETROL} readingType={OPENING_READING} update={updateReading} headerLabel='Petrol Reading' inputLabel='Opening' value={Number(fuelDetails.petrolOpening)}/>
            </View>
            <View style={{flex:1}}>
              <Text style={styles.valueText}>Diesel</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <ReadingOverlay fuelType={DIESEL} readingType={OPENING_READING} update={updateReading} headerLabel='Diesel Reading' inputLabel='Opening' value={Number(fuelDetails.dieselOpening)}/>
            </View>
          </View>
          <Divider />
          <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={styles.labelText}>Opening: </Text>
            <Text style={styles.valueTextGreen}>{fuelDetails.petrolOpening}</Text>
            <Text style={styles.labelText}>Opening: </Text>
            <Text style={styles.valueText}>{fuelDetails.dieselOpening}</Text>
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
                <Text style={styles.valueText}>Oils ({priceDetails.oilPacket}Rs):</Text>
                <View style={{flex:1}} alignItems='flex-end'>
                  <OilCountOverlay update={updateOilPacketCount} value={oilDetails.packetCount}/>
                </View>
              </View>
              <Card.Divider/>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={styles.labelText}>Packets:</Text>
                <Text style={styles.valueText}>{oilDetails.packetCount}</Text>
                <Text style={styles.labelText}>Amount:</Text>
                <Text style={styles.valueText}>{oilDetails.amount}</Text>
              </View>
            </Card>

            <Card containerStyle={{borderRadius: 5, borderColor: 'green'}}>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={styles.valueText}>Safe Drops:</Text>
                <View style={{flex:1}} alignItems='flex-end'>
                  <SafedropCountOverlay update={updateSafedropCount} value={safeDropDetails.safeDropCount}/>
                </View>
              </View>
              <Card.Divider/>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={styles.labelText}>Count:</Text>
                <Text style={styles.valueText}>{safeDropDetails.safeDropCount}</Text>
                <Text style={styles.labelText}>Amount:</Text>
                <Text style={styles.valueText}>{safeDropDetails.amount}</Text>
              </View>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={styles.valueText}>Last Drop:</Text>
                <View style={{flex:1}} alignItems='flex-end'>
                  <LastDropOverlay update={updateLastDrop} value={lastDropDetails}/>
                </View>
              </View>
              <Card.Divider/>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={styles.labelText}>Last Cash:</Text>
                <Text style={styles.valueText}>{lastDropDetails.lastCash}</Text>
                <Text style={styles.labelText}>Card:</Text>
                <Text style={styles.valueText}>{lastDropDetails.card}</Text>
              </View>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={styles.labelText}>UPI:</Text>
                <Text style={styles.valueText}>{lastDropDetails.upi}</Text>
                <Text style={styles.labelText}>Credit:</Text>
                <Text style={styles.valueText}>{lastDropDetails.credit}</Text>
              </View>
            </Card>
        </>
      }
      
      {
        (work.status == 'A' ||  work.status == 'I') &&
        <>
          <Card containerStyle={{borderRadius: 5, borderColor: 'orange'}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex:1}}>
                <Text style={styles.valueTextGreen}>Petrol</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <ReadingOverlay fuelType={PETROL} readingType={UGT_READING} update={updateReading} headerLabel='Petrol UGT' inputLabel='Ugt (ltrs)' value={Number(fuelDetails.petrolUgt)}/>
              </View>
              <View style={{flex:1}}>
                <Text style={styles.valueText}>Diesel</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <ReadingOverlay fuelType={DIESEL} readingType={UGT_READING} update={updateReading} headerLabel='Diesel UGT' inputLabel='Ugt (ltrs)' value={Number(fuelDetails.dieselUgt)}/>
              </View>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection: 'row'}}>
              <Text style={styles.labelText}>Ugt: </Text>
              <Text style={styles.valueTextGreen}>{fuelDetails.petrolUgt}</Text>
              <Text style={styles.labelText}>Ugt: </Text>
              <Text style={styles.valueText}>{fuelDetails.dieselUgt}</Text>
            </View>
          </Card>
          <Card containerStyle={{borderRadius: 5, borderColor: 'red'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex:1}}>
              <Text style={styles.valueTextGreen}>Petrol</Text>
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
              <Text style={styles.valueText}>Diesel</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <ReadingOverlay fuelType={DIESEL} readingType={CLOSING_READING} update={updateReading} headerLabel='Diesel Reading' inputLabel='Closing' value={fuelDetails.dieselClosing}/>
            </View>
          </View>
          <Divider />
          <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={styles.labelText}>Closing: </Text>
            <Text style={styles.valueTextGreen}>{fuelDetails.petrolClosing}</Text>
            <Text style={styles.labelText}>Closing: </Text>
            <Text style={styles.valueText}>{fuelDetails.dieselClosing}</Text>
          </View>
        </Card>
          {
            work.status == 'A' &&

            <View style={{flex:1, flexDirection:'row', justifyContent: 'center'}}>
              <View style={{flex: 1, padding: 10}}>
                <Button buttonStyle={{borderRadius:20}} 
                        title='Calculate Total' 
                        onPress={createReport}
                        disabled={(fuelDetails.petrolClosing == 0 || fuelDetails.dieselClosing == 0) ? true : false}        
                />
                <Overlay overlayStyle={{height: 350, width: 370, borderRadius: 10}} isVisible={calculateOverlayVisible} onBackdropPress={toggleCalculateOverlay} supportedOrientations={['portrait', 'landscape']}>
                    <ScrollView style={{flex: 1}}>
                      <ReportComponent value={calculatedReport}/>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  labelText: {
    flex: 1, 
    padding: 8, 
    fontSize:15
  },
  valueText: {
    flex: 1, 
    padding: 8, 
    fontSize:15,
    fontWeight: 'bold'
  },
  valueTextGreen: {
    flex:1, 
    padding: 8, 
    fontSize:15, 
    fontWeight:'bold', 
    color: 'green'
  },
  pumpOperatorLabel: {
    flex:0.8, 
    padding:8, 
    fontSize:15
  }
})

export default WorkDetailsScreen;