import React, {useState} from 'react';
import { Button, View, Text, useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ListItem, Avatar, Divider, Icon, SearchBar } from 'react-native-elements';

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://i.imgur.com//ee89Mrg.jpg',
    subtitle: '5500'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
    subtitle: '3456'
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://i.imgur.com//ee89Mrg.jpg',
    subtitle: '12345'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg',
    subtitle: '10000'
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://i.imgur.com//ee89Mrg.jpg',
    subtitle: '12000'
  }
]
function CreditScreen({ navigation }) {
  const [search, setSearch] = useState('');
  updateSearch = (search) => {
    setSearch(search);
  }
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
        <Button title='Add' type='clear' onPress={() => alert('Add credit!')} />
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
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    ))
  }
</View>
  );
}

export default CreditScreen;