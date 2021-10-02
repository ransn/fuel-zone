import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { Button, ListItem, Overlay } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

function AssignPumpOverlay(props, { navigation }) {
  const ref = firestore().collection('pumps');
  const [pumps, setPumps] = useState([]);
  const [assignOverlayVisible, setAssignOverlayVisible] = useState(false);
  const assignPump = (pump) => {
    props.actionName(pump.name);
    toggleAssignOverlay();
  }
  const loadPumps = () => {
    var list = [];
    ref.get().then(snapshot => {
      snapshot.docs.forEach((document) => {
        var data = document.data();
        list.push({
          id: document.id,
          name: data.name
        })
      });
      setPumps(list);
      toggleAssignOverlay();
    });
  }
  const toggleAssignOverlay = () => {
    setAssignOverlayVisible(!assignOverlayVisible);
  }

  return (
    <View>
      <Button type='clear' titleStyle={{ fontSize: 15, fontWeight:'bold'}} title='Assign' onPress={loadPumps}/>
      <Overlay overlayStyle={{height: 280, width: 250, borderRadius: 10}} 
        visible={assignOverlayVisible} 
        onBackdropPress={toggleAssignOverlay} 
        supportedOrientations={['portrait', 'landscape']}
      >
          {
            pumps.map((l, i) => (
              <ListItem key={i} bottomDivider onPress={()=>{assignPump(l)}}>
                <ListItem.Content>
                  <ListItem.Title>{l.name}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))
          }
      </Overlay>
    </View>
  );
}

export default AssignPumpOverlay;