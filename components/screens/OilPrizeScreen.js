import React, {useState} from 'react';
import { View } from 'react-native';
import { Card, Divider, Button, Text, Overlay, Input } from 'react-native-elements';

function OilPrizeScreen({navigation}){
    const [oilPrize, setOilPrize] = useState('20');
    const savePrize = () => {
        console.log(oilPrize);
        navigation.navigate('Settings');
    }
    return(
        <View>
            <Card containerStyle={{padding: 5, borderRadius:10, borderColor:'deepskyblue'}}>
                <Card.Title>Set Today's Prize</Card.Title>
                <Card.Divider/>
                    <Input label='Oil Prize/packet' value={oilPrize} onChangeText={oilPrize => setOilPrize(oilPrize)}/>
                    <Button style={{padding:10}}title='Save' onPress={savePrize}/>
                </Card>
        </View>
    )
}

export default OilPrizeScreen;