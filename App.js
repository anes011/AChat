import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import data from './Context';
import { useState } from 'react';

//Screens
import Splash from './Screens/Splash';
import BottomTab from './Components/BottomTab';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import ProfilePhoto from './Screens/ProfilePhoto';
import Messaging from './Screens/Messaging';
//

const Stack = createNativeStackNavigator();

export default function App() {

  //Context states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [pressedUser, setPressedUser] = useState('');
  //

  return (
    <data.Provider value={{ name, setName, email, setEmail, password,
    setPassword, phoneNumber, setPhoneNumber, pressedUser,
    setPressedUser }}>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Splash' screenOptions={{
            headerShown: false, contentStyle: {backgroundColor: '#fff'}
          }}>
            <Stack.Screen name='Splash' component={Splash} />
            <Stack.Screen name='Home' component={BottomTab} />
            <Stack.Screen name='SignIn' component={SignIn} />
            <Stack.Screen name='SignUp' component={SignUp} />
            <Stack.Screen name='ProfilePhoto' component={ProfilePhoto} />
            <Stack.Screen name='Messaging' component={Messaging} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </data.Provider>
  );
};