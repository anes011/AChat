import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import Splash from './Screens/Splash';
import BottomTab from './Components/BottomTab';
//

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={{flex: 1}}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash' screenOptions={{
          headerShown: false, contentStyle: {backgroundColor: '#fff'}
        }}>
          <Stack.Screen name='Splash' component={Splash} />
          <Stack.Screen name='Home' component={BottomTab} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};