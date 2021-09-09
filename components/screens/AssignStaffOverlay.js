import React, {useState} from 'react';
import { View } from 'react-native';
import { Button, ListItem, Overlay } from 'react-native-elements';

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://i.imgur.com//ee89Mrg.jpg',
    subtitle: 'Assigned: Pump1'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
    subtitle: 'Assigned: Pump2'
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://i.imgur.com//ee89Mrg.jpg',
    subtitle: 'Assigned: Pump3'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
    subtitle: 'Assigned: Pump4'
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://i.imgur.com//ee89Mrg.jpg',
    subtitle: 'Assigned: Air Pump'
  }
]
function AssignStaffOverlay(props, { navigation }) {
  const [assignOverlayVisible, setAssignOverlayVisible] = useState(false);
  const assignStaff = (staff) => {
    props.actionName(staff.name);
    toggleAssignOverlay();
  }
  const toggleAssignOverlay = () => {
    setAssignOverlayVisible(!assignOverlayVisible);
  }

  return (
    <View>
      <Button type='clear' titleStyle={{ fontSize: 15, fontWeight:'bold'}} title='Assign' onPress={toggleAssignOverlay}/>
      <Overlay overlayStyle={{height: 280, width: 250, borderRadius: 10}} 
        visible={assignOverlayVisible} 
        onBackdropPress={toggleAssignOverlay} 
        supportedOrientations={['portrait', 'landscape']}
      >
          {
            list.map((l, i) => (
              <ListItem key={i} bottomDivider onPress={()=>{assignStaff(l)}}>
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

export default AssignStaffOverlay;