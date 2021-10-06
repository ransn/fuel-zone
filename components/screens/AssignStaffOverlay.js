import React, {useState} from 'react';
import { View, ScrollView } from 'react-native';
import { Button, ListItem, Overlay } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

function AssignStaffOverlay(props, { navigation }) {
  const ref = firestore().collection('staffs');
  const [staffs, setStaffs] = useState([]);
  const [assignOverlayVisible, setAssignOverlayVisible] = useState(false);
  const loadStaffs = () => {
    var list = [];
    ref.where("status", "==", 'A').get().then(snapshot => {
      snapshot.docs.forEach((document) => {
        var data = document.data();
        list.push({
          id: document.id,
          name: data.name
        })
      });
      setStaffs(list);
      toggleAssignOverlay();
    });
  }

  const assignStaff = (staff) => {
    props.actionName(staff.name);
    toggleAssignOverlay();
  }
  const toggleAssignOverlay = () => {
    setAssignOverlayVisible(!assignOverlayVisible);
  }

  return (
    <View>
      <Button type='clear' titleStyle={{ fontSize: 15, fontWeight:'bold'}} title='Assign' onPress={loadStaffs}/>
      <Overlay overlayStyle={{height: 280, width: 250, borderRadius: 10}} 
        visible={assignOverlayVisible} 
        onBackdropPress={toggleAssignOverlay} 
        supportedOrientations={['portrait', 'landscape']}
      >
      <ScrollView>
          {
            staffs.map((l, i) => (
              <ListItem key={i} bottomDivider onPress={()=>{assignStaff(l)}}>
                <ListItem.Content>
                  <ListItem.Title>{l.name}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))
          }
        </ScrollView>
      </Overlay>
    </View>
  );
}

export default AssignStaffOverlay;