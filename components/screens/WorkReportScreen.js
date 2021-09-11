import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Card, Divider, Button, Text, Overlay } from 'react-native-elements';
import ReportComponent from "./ReportComponent";

function WorkReportScreen({ route, navigation }) {
  
  const [work, setWork] = useState({});
  const [status, setStatus] = useState('N');
  useEffect(()=>{
    // call api to load work report
    setWork(route.params.workItem);
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
  const [report, setReport] = useState({
    fuelDetails: fuelDetails,
    oilDetails: oilDetails,
    safeDropDetails: safeDropDetails,
    lastDropDetails: lastDropDetails
  })
  return (
    <ScrollView>
    <ReportComponent value={report}/>
    <Card containerStyle={{borderRadius: 5, borderColor: 'cornflowerblue'}}>
      <View style={{flex:1, flexDirection: 'row'}}>
        <Text style={styles.pumpOperatorLabel}>Pump:</Text>
        <Text style={styles.valueText}>{work.pumpName}</Text>
      </View>
      <Divider />
      <View style={{flex:1, flexDirection: 'row'}}>
        <Text style={styles.pumpOperatorLabel}>Operator:</Text>
        <Text style={styles.valueText}>{work.operatorName}</Text>
      </View>
    </Card>
      
      <Card containerStyle={{borderRadius: 5, borderColor: 'orange'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex:1}}>
              <Text style={styles.valueTextGreen}>Petrol</Text>
            </View>
            
            <View style={{flex:1}}>
              <Text style={styles.valueText}>Diesel</Text>
            </View>
            
          </View>
          <Divider />
          <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={styles.labelText}>Opening: </Text>
            <Text style={styles.valueTextGreen}>{fuelDetails.petrolOpening}</Text>
            <Text style={styles.labelText}>Opening: </Text>
            <Text style={styles.valueText}>{fuelDetails.dieselOpening}</Text>
          </View>
          <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={styles.labelText}>Closing: </Text>
            <Text style={styles.valueTextGreen}>{fuelDetails.petrolClosing}</Text>
            <Text style={styles.labelText}>Closing: </Text>
            <Text style={styles.valueText}>{fuelDetails.dieselClosing}</Text>
          </View>
      </Card>
      
          {/* <Card containerStyle={{borderRadius: 5, borderColor: 'blue'}}>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={styles.valueText}>Oils:</Text>
                
              </View>
              <Card.Divider/>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={styles.labelText}>Packets:</Text>
                <Text style={styles.valueText}>{oilDetails.packetCount}</Text>
                <Text style={styles.labelText}>Amount:</Text>
                <Text style={styles.valueText}>{oilDetails.packetAmount}</Text>
              </View>
            </Card>

            <Card containerStyle={{borderRadius: 5, borderColor: 'green'}}>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={styles.valueText}>Safe Drops:</Text>
                
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
            </Card> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  labelText: {
    flex: 1, 
    padding: 5, 
    fontSize:15
  },
  valueText: {
    flex: 1, 
    padding: 5, 
    fontSize:15,
    fontWeight: 'bold'
  },
  valueTextGreen: {
    flex:1, 
    padding: 5, 
    fontSize:15, 
    fontWeight:'bold', 
    color: 'green'
  },
  pumpOperatorLabel: {
    flex:0.8, 
    padding:5, 
    fontSize:15
  }
})

export default WorkReportScreen;