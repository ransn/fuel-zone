import React, {useState, useContext} from 'react';
import { View, ScrollView } from "react-native";
import { Card, Text, Divider } from "react-native-elements";
//import PriceContext from "../PriceContext";
function ReportComponent(props){
    //const priceDetails = useContext(PriceContext);
    const report = props.value;
    console.log(report);
    const {petrolOpening, petrolClosing, 
            dieselOpening, dieselClosing, 
            petrolUgt, dieselUgt} = report.fuelDetails;
    const {packetCount} = report.oilDetails;
    const {safeDropCount} = report.safeDropDetails;
    const {lastCash, card, upi, credit} = report.lastDropDetails;
    const {petrolLiters, dieselLiters,
            petrolAmount, dieselAmount,
            oilAmount, petrolUgtAmount,
            dieselUgtAmount, safeDropAmount,
            salesTotal, returnsTotal,
            difference 
          } = report.calculatedReport;
    // const petrolLiters = petrolClosing - petrolOpening;
    // const petrolAmt = petrolLiters*priceDetails.petrol;
    // const dieselLiters = dieselClosing - dieselOpening;
    // const dieselAmt = dieselLiters*priceDetails.diesel;
    // const packetAmt = packetCount*priceDetails.oil;
    // const salesTotal = petrolAmt+dieselAmt+packetAmt;
    // const petrolUgtAmt = petrolUgt*priceDetails.petrol;
    // const dieselUgtAmt = dieselUgt*priceDetails.diesel;

    // // Returns

    // const {safeDropCount, safeDropAmount} = work.safeDropDetails;
    // const {lastCash, card, upi, credit} = work.lastDropDetails;

    // const returnsTotal = parseInt(safeDropAmount)+
    //                     parseInt(lastCash)+
    //                     parseInt(card)+
    //                     parseInt(upi)+
    //                     parseInt(credit)-
    //                     parseInt(petrolUgtAmt)-
    //                     parseInt(dieselUgtAmt);
    // const difference = salesTotal - returnsTotal;
    return(
        <Card>
            <Card.Title>Summary</Card.Title>
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Petrol()</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Liters: {petrolLiters}</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {petrolAmount.toFixed(2)}</Text>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Diesel()</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Liters: {dieselLiters}</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {dieselAmount.toFixed(2)}</Text>
            </View>
            <Divider />
            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Oil()</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Count: {packetCount}</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Amt: {oilAmount}</Text>
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
              <Text style={{ flex:2, padding: 5, fontSize:12, color:'red'}}>Amt: {petrolUgtAmount.toFixed(2)}</Text>
            </View>
             <Divider />
             <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>UGT(In Ltrs)</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12}}>Diesel: {dieselUgt}</Text>
              <Text style={{ flex:2, padding: 5, fontSize:12, color:'red'}}>Amt: {dieselUgtAmount.toFixed(2)}</Text>
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