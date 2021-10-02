import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Card, Divider, Button, Text, Overlay } from 'react-native-elements';
import ReportComponent from "./ReportComponent";
import firestore from '@react-native-firebase/firestore';

function WorkReportScreen({ route, navigation }) {
  const reportsRef = firestore().collection('reports');
  const worksRef = firestore().collection('works');
  const [report, setReport] = useState({
    fuelDetails: {
      petrolAmount: Number(0),
      dieselAmount: Number(0),
      petrolUgtAmount: Number(0),
      dieselUgtAmount: Number(0)
    },
    oilDetails: {},
    safeDropDetails: {},
    lastDropDetails: {},
    salesTotal: 0,
    returnsTotal: 0,
    difference: 0
  });
  const [work, setWork] = useState({});
  const [status, setStatus] = useState('N');
  useEffect(()=>{
    console.log(route.params.workId);
    if(route.params?.workId){
      reportsRef.doc(route.params.workId).get().then((report)=>{
        setReport(report.data());
      });
      worksRef.doc(route.params.workId).get().then((work)=>{
        setWork(work.data());
      });
    }
  }, []);

  const {fuelDetails, oilDetails, 
      safeDropDetails, lastDropDetails, 
      salesTotal, returnsTotal, 
      difference} = report;
 
  return (
    <ScrollView>
    <Card containerStyle={{borderRadius: 5, borderColor: 'cornflowerblue'}}>
      <View style={{flex:1, flexDirection: 'row'}}>
        <Text style={styles.pumpOperatorLabel}>Work Name:</Text>
        <Text style={styles.valueText}>{work.name}</Text>
      </View>
      <Divider />
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
            <Text style={styles.valueTextGreen}>{report.fuelDetails.petrolOpening}</Text>
            <Text style={styles.labelText}>Opening: </Text>
            <Text style={styles.valueText}>{report.fuelDetails.dieselOpening}</Text>
          </View>
          <View style={{flex:1, flexDirection: 'row'}}>
            <Text style={styles.labelText}>Closing: </Text>
            <Text style={styles.valueTextGreen}>{report.fuelDetails.petrolClosing}</Text>
            <Text style={styles.labelText}>Closing: </Text>
            <Text style={styles.valueText}>{report.fuelDetails.dieselClosing}</Text>
          </View>
      </Card>
      <ReportComponent value={report}/>
      
          {/* <Card containerStyle={{borderRadius: 5, borderColor: 'blue'}}>
              <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={styles.valueText}>Oils:</Text>
                
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