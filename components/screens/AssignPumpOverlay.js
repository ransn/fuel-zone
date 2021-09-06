import React, {useState} from 'react';
import { View } from 'react-native';
import { Button, ListItem, Overlay } from 'react-native-elements';

const list = [
  {
    name: 'Pump 1',
  },
  {
    name: 'Pump 2',
  },
  {
    name: 'Pump 3',
  },
  {
    name: 'Pump 4',
  },
  {
    name: 'Air Pump',
  }
]
function AssignPumpOverlay(props, { navigation }) {
  const [assignOverlayVisible, setAssignOverlayVisible] = useState(false);
  const assignPump = (pump) => {
    props.actionName(pump.name);
    toggleAssignOverlay();
  }
  const toggleAssignOverlay = () => {
    setAssignOverlayVisible(!assignOverlayVisible);
  }

  return (
    <View>
      <Button type='outline' titleStyle={{ fontSize: 15, fontWeight:'bold'}} title='Assign' onPress={toggleAssignOverlay}/>
      <Overlay overlayStyle={{height: 280, width: 250, borderRadius: 10}} 
        visible={assignOverlayVisible} 
        onBackdropPress={toggleAssignOverlay} 
        supportedOrientations={['portrait', 'landscape']}
      >
          {
            list.map((l, i) => (
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