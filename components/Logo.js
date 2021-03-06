import React from 'react';
import { StyleSheet, View, Text, Alert, Image } from 'react-native';
import { Card, Avatar, Divider, Button } from 'react-native-elements';

function Logo({ navigation, route }) {
    return(
            <Image style={styles.image} source = {require("../images/logo.png")}/>
    );
}

const styles = StyleSheet.create({
 
   image :{
    width:150,
    height:150
  }
     
});

export default Logo;