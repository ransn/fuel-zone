import React, {useState} from 'react';
import { View, ScrollView } from "react-native";
import { Card, Text, Divider } from "react-native-elements";
function ReportComponent(props){
    const work = props.value;
    console.log(work);
    const {petrolOpening, petrolClosing, 
            dieselOpening, dieselClosing, 
            petrolUgt, dieselUgt} = work.fuelDetails;
    const {packetCount, packetAmount} = work.oilDetails;
    const petrolLiters = petrolClosing - petrolOpening;
    const petrolAmt = petrolLiters*105.23;
    const dieselLiters = dieselClosing - dieselOpening;
    const dieselAmt = dieselLiters*105;
    const salesTotal = petrolAmt+dieselAmt+packetAmount;
    const petrolUgtAmt = petrolUgt*105.23;
    const dieselUgtAmt = dieselUgt*105;

    // Returns

    const {safeDropCount, safeDropAmount} = work.safeDropDetails;
    const {lastCash, card, upi, credit} = work.lastDropDetails;

    const returnsTotal = parseInt(safeDropAmount)+
                        parseInt(lastCash)+
                        parseInt(card)+
                        parseInt(upi)+
                        parseInt(credit)-
                        parseInt(petrolUgtAmt)-
                        parseInt(dieselUgtAmt);
    const difference = salesTotal - returnsTotal;
    return(
        <Card>
            <Card.Title>Summary</Card.Title>
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Petrol(105.23)</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Liters: {petrolLiters}</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {petrolAmt.toFixed(2)}</Text>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Diesel(105)</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Liters: {dieselLiters}</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {dieselAmt.toFixed(2)}</Text>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Oil(20)</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Count: {packetCount}</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {packetAmount}</Text>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}></Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}></Text>
              <Text style={{ flex:2, padding: 5, fontSize:12, fontWeight:'bold'}}>Total: {salesTotal.toFixed(2)}</Text>
            </View>
            <Divider width={2} subHeaderStyle={{fontWeight: 'bold', fontSize:18}}/>
            <Card.Title style={{fontWeight:'bold', color:'green'}}>Returns</Card.Title>
            <Divider width={2} subHeaderStyle={{fontWeight: 'bold', fontSize:18}}/>
             <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>UGT(In Ltrs)</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Petrol: {petrolUgt}</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12, color:'red'}}>Amt: {petrolUgtAmt}</Text>
            </View>
             <Divider />
             <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>UGT(In Ltrs)</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Diesel: {dieselUgt}</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12, color:'red'}}>Amt: {dieselUgtAmt}</Text>
            </View>
             <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Safe Drop</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Count: {safeDropCount}</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {safeDropAmount}</Text>
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
              <Text style={{ flex:2, padding: 5, fontSize:12, color: 'red', fontWeight:'bold'}}>Diff: {difference.toFixed(2)}</Text>
            </View>           
          </Card>        
    )
}

export default ReportComponent;