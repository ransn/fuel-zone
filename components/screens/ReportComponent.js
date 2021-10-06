import React, {useState, useContext} from 'react';
import { View, ScrollView } from "react-native";
import { Card, Text, Divider } from "react-native-elements";
function ReportComponent(props){
    const report = props.value;
    const {petrolOpening, petrolClosing, 
            dieselOpening, dieselClosing, 
            petrolUgt, dieselUgt, 
            petrolUgtAmount, dieselUgtAmount,
            petrolAmount, dieselAmount,
            petrolPrice, dieselPrice} = report.fuelDetails;
    const {packetCount, amount, packetPrice} = report.oilDetails;
    const {safeDropCount} = report.safeDropDetails;
    const {lastCash, card, upi, credit} = report.lastDropDetails;
    const {salesTotal, returnsTotal,
            difference 
          } = report;
    const petrolLiters = petrolClosing - petrolOpening;
    const dieselLiters = dieselClosing - dieselOpening;
    return(
        <Card>
            <Card.Title>Summary</Card.Title>
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Petrol({petrolPrice})</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Liters: {petrolLiters && petrolLiters.toFixed(2)}</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {petrolAmount && petrolAmount.toFixed(2)}</Text>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Diesel({dieselPrice})</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Liters: {dieselLiters && dieselLiters.toFixed(2)}</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {dieselAmount && dieselAmount.toFixed(2)}</Text>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Oil({packetPrice})</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Count: {packetCount}</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {amount}</Text>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}></Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}></Text>
              <Text style={{ flex:2, padding: 5, fontSize:12, fontWeight:'bold'}}>Total: {salesTotal && salesTotal.toFixed(2)}</Text>
            </View>
            <Divider width={2} subHeaderStyle={{fontWeight: 'bold', fontSize:18}}/>
            <Card.Title style={{fontWeight:'bold', color:'green'}}>Returns</Card.Title>
            <Divider width={2} subHeaderStyle={{fontWeight: 'bold', fontSize:18}}/>
             <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>UGT(In Ltrs)</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Petrol: {petrolUgt}</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12, color:'red'}}>Amt: {petrolUgtAmount && petrolUgtAmount.toFixed(2)}</Text>
            </View>
             <Divider />
             <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>UGT(In Ltrs)</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Diesel: {dieselUgt}</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12, color:'red'}}>Amt: {dieselUgtAmount && dieselUgtAmount.toFixed(2)}</Text>
            </View>
             <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Safe Drop</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Count: {safeDropCount}</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {report.safeDropDetails.amount}</Text>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}></Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Lastcash</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {lastCash}</Text>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}></Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Card</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {card}</Text>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}></Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>UPI</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {upi}</Text>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}></Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Credit</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {credit}</Text>
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
              {
                difference > 0 &&
                <Text style={{ flex:2, padding: 5, fontSize:12, color: 'red', fontWeight:'bold'}}>Shortage: {difference && difference.toFixed(2)}</Text>
              }
              {
                difference < 0 &&
                <Text style={{ flex:2, padding: 5, fontSize:12, color: 'green', fontWeight:'bold'}}>Excess: {difference && difference.toFixed(2)}</Text>
              }
              
            </View>           
          </Card>        
    )
}

export default ReportComponent;