import React, {useState} from 'react';
import { View, ScrollView } from "react-native";
import { Card, Text, Divider } from "react-native-elements";
function ReportComponent(props){
    const report = props.value;
    const petrolAmt = report.petrolLiters*105.23;
    const dieselAmt = report.dieselLiters*105;
    const salesTotal = petrolAmt+dieselAmt+report.oilAmount;
    const returnsTotal = parseInt(report.safeDropAmount)+
                        parseInt(report.lastDrop.lastCash)+
                        parseInt(report.lastDrop.card)+
                        parseInt(report.lastDrop.upi)+
                        parseInt(report.lastDrop.credit);
    const difference = salesTotal - returnsTotal;
    return(
        <Card>
            <Card.Title>Summary</Card.Title>
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Petrol(105.23)</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Liters: {report.petrolLiters}</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {petrolAmt}</Text>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Diesel(105)</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Liters: {report.dieselLiters}</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {dieselAmt}</Text>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Oil(20)</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Count: {report.oilPackets}</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {report.oilAmount}</Text>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}></Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}></Text>
              <Text style={{ flex:2, padding: 5, fontSize:12, fontWeight:'bold'}}>Total: {salesTotal}</Text>
            </View>
            <Divider width={2} subHeaderStyle={{fontWeight: 'bold', fontSize:18}}/>
            <Card.Title style={{fontWeight:'bold'}}>Returns</Card.Title>
            <Divider width={2} subHeaderStyle={{fontWeight: 'bold', fontSize:18}}/>
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Safe Drop</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Count: {report.safeDropCount}</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {report.safeDropAmount}</Text>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}></Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Lastcash</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {report.lastDrop.lastCash}</Text>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}></Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Card</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {report.lastDrop.card}</Text>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}></Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>UPI</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {report.lastDrop.upi}</Text>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}></Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Credit</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {report.lastDrop.credit}</Text>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}></Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}></Text>
              <Text style={{ flex:2, padding: 5, fontSize:12, fontWeight:'bold'}}>Total: {returnsTotal}</Text>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}></Text>
              <Text style={{ flex:2, padding: 5, fontSize:12, fontWeight:'bold'}}></Text>
              <Text style={{ flex:2, padding: 5, fontSize:12, color: 'red', fontWeight:'bold'}}>Diff: {difference}</Text>
            </View>           
          </Card>        
    )
}

export default ReportComponent;