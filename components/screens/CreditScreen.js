import React, {useState} from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ListItem, Avatar, Divider, Icon, SearchBar, Button, Overlay, Input } from 'react-native-elements';

const list = [
  {
    name: 'Amy Farha',
    mobile: '9978645342',
    subtitle: '5500'
  },
  {
    name: 'Chris Jackson',
    mobile: '9978645342',
    subtitle: '3456'
  },
  {
    name: 'Amy Farha',
    mobile: '9978645342',
    subtitle: '12345'
  },
  {
    name: 'Chris Jackson',
    mobile: '9978645342',
    subtitle: '10000'
  },
  {
    name: 'Amy Farha',
    mobile: '9978645342',
    subtitle: '12000'
  }
]
function CreditScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [visibleForm, setVisibleForm] = useState(false);

  updateSearch = (search) => {
    setSearch(search);
  }
  const toggleAddCreditUserOverlay = () => {
    setVisibleForm(!visibleForm);
  };
  return (
    <View>
    <View style={{flexDirection:'row'}}>
      <View style={{flex:3.5}}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        lightTheme = 'false'
        round = 'true'
      />
      </View>
      <View style={{flex: 1, paddingTop: 10}}>
        <Button icon={{name: 'add-circle', type:'ionicon', size: 30, color: "dodgerblue"}} type='clear' onPress={toggleAddCreditUserOverlay}/>
        <Overlay overlayStyle={{height: 280, width: 350, borderRadius: 10}} isVisible={visibleForm} onBackdropPress={toggleAddCreditUserOverlay} supportedOrientations={['portrait', 'landscape']}>
          <ScrollView style={{flex: 1}}>
            <Text style={{flex:0.9, padding: 10, fontSize:15, fontWeight:'bold' }}>Add:</Text>
            <Input label='Name'/>
            <Input label='Mobile'/>
            <Button title='Add' onPress={toggleAddCreditUserOverlay}/>
          </ScrollView>
        </Overlay>
      </View>
    </View>
  {
    list.map((l, i) => (
      <ListItem key={i} bottomDivider onPress={()=>{
        navigation.navigate('CreditDetails', {
          credit: l
        })
      }}>
        <Avatar rounded source={require('../../images/user.png')} icon={{name: 'person', type: 'ionicon'}}/>
        <ListItem.Content>
          <ListItem.Title>{l.name}</ListItem.Title>
          <ListItem.Subtitle>Balance: {l.subtitle}</ListItem.Subtitle>
          <ListItem.Subtitle>Mobile: {l.mobile}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ))
  }
</View>
  );
}

export default CreditScreen;