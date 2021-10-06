import React, {useState} from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Card, Input, Overlay, Button } from 'react-native-elements';
import Logo from '../../Logo';
import firestore from '@react-native-firebase/firestore';

function LoginScreen({navigation }) {
  const usersRef = firestore().collection('users');
  const [code, setCode] = useState('');
  const inputPin = React.createRef();
  const [user, setUser] = useState({
    name: '',
    mobileNumber: Number(0),
    code:Number(0),
    role:'admin'
  });
  const [newUser, setNewUser] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [forgotOverlayVisible, setForgotOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };
  const toggleOverlayBackdrop = () => {
    toggleOverlay();
  }

  const toggleForgotOverlay = () => {
    setForgotOverlayVisible(!forgotOverlayVisible);
  };
  const toggleForgotOverlayBackdrop = () => {
    toggleForgotOverlay();
  }

  const onCreateUser = () => {
    setNewUser(true);
    toggleOverlay();
  }

  const createUser = () => {
    usersRef.where("code", "==", user.code ).get().then((snapshot)=>{onResult(snapshot)});
  }

  const updateUser = () => {
    usersRef.where("mobileNumber", "==", user.mobileNumber ).get().then((snapshot)=>{
     console.log(snapshot.size);
     if(snapshot.size == 0){
       Alert.alert(
            "Mobile number not found",
            "Plese check registered mobile number",
            [
              {
                text: "OK",
                style: "cancel"
              }
            ]
        );
     }else{
       snapshot.forEach(documentSnapshot => {
          var id = documentSnapshot.id;
          console.log(id);
          usersRef.doc(id).update({code: user.code}).then(()=>{
            console.log('PIN set successful');
            toggleForgotOverlay();
            Alert.alert(
              "Success",
              "Login with new PIN",
              [
                {
                  text: "OK",
                  style: "cancel"
                }
              ]
            );
          });
        });
     }
    });
  }

  const validateUser = (text) => {
    setNewUser(false);
    if(text.length == 4){
      console.log('code= '+text);
      usersRef.where("code", "==", text ).get().then((snapshot)=>{onResult(snapshot)});
    }
  }
  function onResult(querySnapshot) {
    const list = [];
    querySnapshot.forEach(documentSnapshot => {
      const data = documentSnapshot.data();
      list.push(data);
    });
    if(list.length == 1){
      if(newUser){
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
        navigation.dispatch(
          StackActions.replace('Home')
        );
      }
      
    }else{
      if(!newUser){
        Alert.alert(
          "Invalid PIN",
          "Please enter 4 digit valid PIN",
          [
            {
              text: "OK",
              onPress: () => {
                inputPin.current.focus();
                inputPin.current.clear(); 
                inputPin.current.shake(); 
              },
              style: "cancel"
            }
          ]
        );
      }else {
        usersRef.add(user).then(() => {
          console.log('User created');
          toggleOverlay();
          Alert.alert(
            "Success",
            "Login with PIN",
            [
              {
                text: "OK",
                style: "cancel"
              }
            ]
          );
        })
      }
    }
  }

  function onError(error) {
    console.error(error);
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1, paddingTop:40, justifyContent: 'center'}}>
    
      <View style={{flex:0.5, alignItems: 'center'}}>
        <Logo />
      </View>
      <View style={{flex:0.5}}>
        
          <Card containerStyle={{borderRadius: 10, backgroundColor: 'mintcream', borderColor: 'chocolate'}}>
              <Card.Title>Enter 4 digit PIN</Card.Title>
              <Card.Divider />
              <Input ref={inputPin} 
                  maxLength={4} 
                  textAlign={'center'} 
                  keyboardType='numeric' 
                  placeholder="PIN" 
                  secureTextEntry={true} 
                  onChangeText={(code) => {validateUser(code)}}/>
              <TouchableOpacity style={styles.button} onPress={toggleForgotOverlay}>
                <Text style={{fontWeight: 'bold'}}>Forgot Pin ? </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={onCreateUser}>
                <Text style={{fontWeight: 'bold'}}>Sign Up </Text>
              </TouchableOpacity>
          </Card>
        
          <Overlay overlayStyle={{height: 360, width: 350, borderRadius: 10}} 
            visible={overlayVisible} 
            onBackdropPress={toggleOverlayBackdrop} 
            supportedOrientations={['portrait', 'landscape']}
          >
            <Text style={{ padding: 10, fontSize:18, fontWeight:'bold' }}>Sign Up: </Text>
            <View style={{flex:1}}>
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
              <Button title='Sing Up' onPress={createUser}/>
            </View>
          </Overlay>
          <Overlay overlayStyle={{height: 360, width: 350, borderRadius: 10}} 
            visible={forgotOverlayVisible} 
            onBackdropPress={toggleForgotOverlayBackdrop} 
            supportedOrientations={['portrait', 'landscape']}
          >
            <Text style={{ padding: 10, fontSize:18, fontWeight:'bold' }}>Set New PIN: </Text>
            <View style={{flex:1}}>
              <Input keyboardType='numeric'
                      maxLength={10} 
                      label='Mobile' 
                      onChangeText={number => setUser({...user, mobileNumber: number})} />

              <Input keyboardType='numeric' 
                      maxLength={4}
                      label='New PIN (4 digit)' 
                      onChangeText={pin => setUser({...user, code: pin})} />
              <Button title='Set New PIN' onPress={updateUser}/>
            </View>
          </Overlay>
      </View>
    </KeyboardAvoidingView>
    
    
  );
}

const styles = StyleSheet.create({
  
 button: {
    alignItems: "center",
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 50,
    marginBottom:10
  }
     
});



export default LoginScreen;