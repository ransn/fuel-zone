import React, {useState} from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Card, Input, Overlay, Button } from 'react-native-elements';
import Logo from '../../Logo';
import firestore from '@react-native-firebase/firestore';

function SignUpScreen({navigation }) {
  const usersRef = firestore().collection('users');
  const [code, setCode] = useState('');
  const inputPin = React.createRef();
  const [user, setUser] = useState({
    name: '',
    mobileNumber: Number(0),
    code:Number(0),
    role:'admin'
  });

  const createUser = () => {
    usersRef.where("code", "==", user.code ).get().then((snapshot)=>{onResult(snapshot)});
  }

  function onResult(querySnapshot) {
    const list = [];
    querySnapshot.forEach(documentSnapshot => {
      const data = documentSnapshot.data();
      list.push(data);
    });
    if(list.length == 1){
      Alert.alert(
          "PIN Already Used",
          "Please enter different PIN",
          [
            {
              text: "OK",
              onPress: () => {
                console.log('OK pressed'); 
              },
              style: "cancel"
            }
          ]
      );
    }else{
      usersRef.add(user).then(() => {
          console.log('User created');
          setUser(user);
          Alert.alert(
            "Success",
            "Login with PIN",
            [
              {
                text: "OK",
                onPress: () => {
                  navigation.navigate('Login');
                },
                style: "cancel"
              }
            ]
          );
        })
    }
  }

  function onError(error) {
    console.error(error);
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1, paddingTop:40, justifyContent: 'center'}}>
    
      <View style={{flex:1, padding: 10}}>
              <Input label='Name'
                      onChangeText={text => setUser({...user, name: text})} />

              <Input keyboardType='numeric'
                      maxLength={10} 
                      label='Mobile' 
                      onChangeText={number => setUser({...user, mobileNumber: number})} />

              <Input keyboardType='numeric' 
                      maxLength={4}
                      label='New PIN (4 digit)' 
                      onChangeText={pin => setUser({...user, code: pin})} />
              <Button title='Sing Up' disabled={user.name == '' || user.mobileNumber.length != 10 || user.code.length != 4} onPress={createUser}/>
            </View>
    </KeyboardAvoidingView>
    
    
  );
}

export default SignUpScreen;