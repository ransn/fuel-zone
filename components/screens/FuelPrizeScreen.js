import React, {useState, useEffect, useContext} from 'react';
import { View } from 'react-native';
import { Card, Divider, Button, Text, Input } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import PriceContext from "../PriceContext";

function FuelPrizeScreen({navigation}){
    const ref = firestore().collection('fuelPrizeList');
    const {updatePriceDetails} = useContext(PriceContext);
    const [priceDetails, setPriceDetails] = useState({
        id:'',
        createdAt: '',
        petrol: 0,
        diesel: 0,
        oilPacket: 0
    });
    const savePrize = () => {
        setPriceDetails({...priceDetails, createdAt: firestore.FieldValue.serverTimestamp()});
        var updatedPriceDetails = {
            id:'',
            createdAt: firestore.FieldValue.serverTimestamp(),
            petrol: priceDetails.petrol,
            diesel: priceDetails.diesel,
            oilPacket: priceDetails.oilPacket
        };
        ref.add(updatedPriceDetails).then(()=>{
            console.log('Prize details added');
            updatePriceDetails(updatedPriceDetails);
            navigation.navigate('Settings');
        })
    }
    useEffect(() => {
        const subscriber = ref.orderBy('createdAt', 'desc').limit(1).onSnapshot(onResult, onError);
        return () => subscriber();
    }, []);

    function onResult(querySnapshot) {
        querySnapshot.forEach(documentSnapshot => {
            const data = documentSnapshot.data();
            setPriceDetails({
                id: documentSnapshot.id,
                createdAt: data.createdAt,
                petrol: data.petrol,
                diesel: data.diesel,
                oilPacket: data.oilPacket
            });
        });
    }

    function onError(error) {
        console.error(error);
    }
    return(
        <View>
            <Card containerStyle={{padding: 5, borderRadius:10, borderColor:'deepskyblue'}}>
                <Card.Title>Set Today's Prize</Card.Title>
                <Card.Divider/>
                    <Input 
                        label='Petrol Prize' 
                        value={priceDetails.petrol.toString()} 
                        keyboardType='numeric'
                        onChangeText={petrolPrize => setPriceDetails({...priceDetails, petrol:petrolPrize})}/>
                    <Input 
                        label='Diesel Prize' 
                        value={priceDetails.diesel.toString()} 
                        keyboardType='numeric'
                        onChangeText={dieselPrize => setPriceDetails({...priceDetails, diesel:dieselPrize})}/>
                    <Input 
                        label='Oil Prize/packet' 
                        value={priceDetails.oilPacket.toString()} 
                        keyboardType='numeric'
                        onChangeText={oilPrize => setPriceDetails({...priceDetails, oilPacket:oilPrize})}/>
                    <Button style={{padding:10}}title='Save' onPress={savePrize}/>
                </Card>
        </View>
    )
}

export default FuelPrizeScreen;