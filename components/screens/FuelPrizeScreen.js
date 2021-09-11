import React, {useState} from 'react';
import { View } from 'react-native';
import { Card, Divider, Button, Text, Input } from 'react-native-elements';

function FuelPrizeScreen({navigation}){
    const [petrolPrize, setPetrolPrize] = useState('105.25');
    const [dieselPrize, setDieselPrize] = useState('103.23');
    const savePrize = () => {
        navigation.navigate('Settings');
    }
    return(
        <View>
            <Card containerStyle={{padding: 5, borderRadius:10, borderColor:'deepskyblue'}}>
                <Card.Title>Set Today's Prize</Card.Title>
                <Card.Divider/>
                    <Input label='Petrol Prize' value={petrolPrize} onChangeText={petrolPrize => setPetrolPrize(petrolPrize)}/>
                    <Input label='Diesel Prize' value={dieselPrize} onChangeText={dieselPrize => setDieselPrize(dieselPrize)}/>
                    <Button style={{padding:10}}title='Save' onPress={savePrize}/>
                </Card>
        </View>
    )
}

export default FuelPrizeScreen;