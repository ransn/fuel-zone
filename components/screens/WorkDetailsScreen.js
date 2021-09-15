import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Card, Divider, Button, Text, Overlay } from 'react-native-elements';
import ReportComponent from "./ReportComponent";
import AssignPumpOverlay from "./AssignPumpOverlay";
import AssignStaffOverlay from "./AssignStaffOverlay";
import ReadingOverlay from "./ReadingOverlay";
import OilCountOverlay from "./OilCountOverlay";
import SafedropCountOverlay from "./SafedropCountOverlay";
import LastDropOverlay from "./LastDropOverlay";
import PriceContext from "../PriceContext"

function WorkDetailsScreen({ route, navigation }) {
  const priceDetails = useContext(PriceContext);
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

    if(route.params?.workName && route.params.workName.length > 0){
      const name = route.params.workName;
      let updatedWork = work;
      updatedWork.name = name;
      updatedWork.timestamp = new Date().getDate();
      setWork(updatedWork);
      navigation.setOptions({title: work.name});
    }
    else if(route.params?.workItem){
      setWork(route.params.workItem);
      console.log(route.params.workItem);
      navigation.setOptions({title: work.name});
    }

  }, [work]);

  const [fuelDetails, setFuelDetails] = useState({
    petrolOpening: parseInt(0),
    petrolClosing: parseInt(0),
    dieselOpening: parseInt(0),
    dieselClosing: parseInt(0),
    petrolUgt: parseInt(0),
    dieselUgt: parseInt(0)
  });
  const [oilDetails, setOilDetails] = useState({
    packetCount: parseInt(0)
  });
  const [safeDropDetails, setSafeDropDetails] = useState({
    safeDropCount: parseInt(0)
  });
  const [lastDropDetails, setLastDropDetails] = useState({
    lastCash: parseInt(0),
    card: parseInt(0),
    upi: parseInt(0),
    credit: parseInt(0)
  });
  const [calculatedReport, setCalculatedReport] = useState({
    petrolLiters: 0,
    dieselLiters: 0,
    petrolAmount: 0,
    dieselAmount: 0,
    oilAmount: 0,
    petrolUgtAmount: 0,
    dieselUgtAmount: 0,
    safeDropAmount: 0,
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
    calculateTotal();
    navigation.navigate({
      name: 'WorkList',
      params: {work: work}
    })
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
    }else if(readingType == UGT_READING && fuelType == PETROL){
      setFuelDetails({...fuelDetails, petrolUgt: readingValue});
    }else if(readingType == UGT_READING && fuelType == DIESEL){
      setFuelDetails({...fuelDetails, dieselUgt: readingValue});
    }

  }

  const updateOilPacketCount = (count) => {
    setOilDetails({...oilDetails, packetCount: count});
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

  const createReport = () => {
    calculateTotal();
    
    toggleCalculateOverlay();
  }

  const calculateTotal = () => {
    const {petrolOpening, petrolClosing, 
            dieselOpening, dieselClosing, 
            petrolUgt, dieselUgt} = fuelDetails;
    const {packetCount} = oilDetails;
    const {safeDropCount} = safeDropDetails;
    const petrolLiters = petrolClosing - petrolOpening;
    const petrolAmt = petrolLiters*priceDetails.petrol;
    const dieselLiters = dieselClosing - dieselOpening;
    const dieselAmt = dieselLiters*priceDetails.diesel;
    const packetAmt = packetCount*priceDetails.oil;
    const salesTotal = petrolAmt+dieselAmt+packetAmt;
    const petrolUgtAmt = petrolUgt*priceDetails.petrol;
    const dieselUgtAmt = dieselUgt*priceDetails.diesel;
    const safeDropAmount = safeDropCount*8000;
    
    const {lastCash, card, upi, credit} = lastDropDetails;
    const returnsTotal = parseInt(safeDropAmount)+
                        parseInt(lastCash)+
                        parseInt(card)+
                        parseInt(upi)+
                        parseInt(credit)-
                        parseInt(petrolUgtAmt)-
                        parseInt(dieselUgtAmt);
    const difference = salesTotal - returnsTotal;

    setCalculatedReport({...calculatedReport,
      petrolLiters: petrolLiters,
      dieselLiters: dieselLiters, 
      petrolAmount: petrolAmt,
      dieselAmount: dieselAmt,
      oilAmount: packetAmt,
      petrolUgtAmount: petrolUgtAmt,
      dieselUgtAmount: dieselUgtAmt,
      safeDropAmount: safeDropAmount,
      salesTotal: salesTotal,
      returnsTotal: returnsTotal,
      difference: difference
    });
    setReport({
      fuelDetails: fuelDetails,
      oilDetails: oilDetails,
      safeDropDetails: safeDropDetails,
      lastDropDetails: lastDropDetails,
      calculatedReport: calculatedReport
    });
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
              <ReadingOverlay fuelType={PETROL} readingType={OPENING_READING} update={updateReading} headerLabel='Petrol Reading' inputLabel='Opening' value={parseInt(fuelDetails.petrolOpening)}/>
            </View>
            <View style={{flex:1}}>
              <Text style={styles.valueText}>Diesel</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <ReadingOverlay fuelType={DIESEL} readingType={OPENING_READING} update={updateReading} headerLabel='Diesel Reading' inputLabel='Opening' value={parseInt(fuelDetails.dieselOpening)}/>
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
                <Text style={styles.valueText}>Oils ({priceDetails.oil}Rs):</Text>
                <View style={{flex:1}} alignItems='flex-end'>
                  <OilCountOverlay update={updateOilPacketCount} value={oilDetails.packetCount}/>
                </View>
              </View>
              <Card.Divider/>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={styles.labelText}>Packets:</Text>
                <Text style={styles.valueText}>{oilDetails.packetCount}</Text>
                <Text style={styles.labelText}>Amount:</Text>
                <Text style={styles.valueText}>{priceDetails.oil*oilDetails.packetCount}</Text>
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
                <Text style={styles.valueText}>{safeDropDetails.safeDropAmount}</Text>
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
                <ReadingOverlay fuelType={PETROL} readingType={UGT_READING} update={updateReading} headerLabel='Petrol UGT' inputLabel='Ugt (ltrs)' value={parseInt(fuelDetails.petrolUgt)}/>
              </View>
              <View style={{flex:1}}>
                <Text style={styles.valueText}>Diesel</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <ReadingOverlay fuelType={DIESEL} readingType={UGT_READING} update={updateReading} headerLabel='Diesel UGT' inputLabel='Ugt (ltrs)' value={parseInt(fuelDetails.dieselUgt)}/>
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

const styles = StyleSheet.create({
  labelText: {
    flex: 1, 
    padding: 10, 
    fontSize:15
  },
  valueText: {
    flex: 1, 
    padding: 10, 
    fontSize:15,
    fontWeight: 'bold'
  },
  valueTextGreen: {
    flex:1, 
    padding: 10, 
    fontSize:15, 
    fontWeight:'bold', 
    color: 'green'
  },
  pumpOperatorLabel: {
    flex:0.8, 
    padding:10, 
    fontSize:15
  }
})

export default WorkDetailsScreen;