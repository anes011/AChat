import { View, Text, Image, TextInput, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import data from '../Context';
import { useContext } from 'react';

const SignUp = () => {

    const { name, setName, email, setEmail, password, setPassword,
    phoneNumber, setPhoneNumber } = useContext(data);

  const navigation = useNavigation();

  const { width, height } = Dimensions.get('window');

  const checkCredentials = () => {
    if (name === '') {
        Alert.alert('What\'s your name?');
    } else if (email === '') {
        Alert.alert('Please provide an email!');
    } else if (password === '') {
        Alert.alert('Please provide a password!');
    } else {
        navigation.navigate('ProfilePhoto');
    };
  };

  return (
    <View style={{
      flex: 1
  }}>
      <Image style={{
          height: 50,
          width: 50,
          margin: 30
      }} source={require('../assets/achat-logo.png')} />

      <Text style={{
          alignSelf: 'center',
          fontSize: 30,
          fontWeight: 300,
      }}>Sign Up</Text>
      
      <View style={{
          paddingHorizontal: 30,
          marginTop: 30
      }}>
          <View style={{
              height: height / 14,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              elevation: 50,
              marginBottom: 30
          }}>
              <TextInput style={{
                  height: '100%',
                  width: '90%',
                  paddingLeft: 30
              }} placeholder='Name...' onChangeText={(text) => setName(text)} value={name} />
              
              <AntDesign name="user" size={24} color="black" />
          </View>

          <View style={{
              height: height / 14,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              elevation: 50,
              marginBottom: 30
          }}>
              <TextInput style={{
                  height: '100%',
                  width: '90%',
                  paddingLeft: 30
              }} placeholder='Email...' onChangeText={(text) => setEmail(text)} value={email} />
              
              <MaterialIcons name="alternate-email" size={24} color="black" />
          </View>

          <View style={{
              height: height / 14,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              elevation: 50,
              marginBottom: 30
          }}>
              <TextInput style={{
                  height: '100%',
                  width: '90%',
                  paddingLeft: 30
              }} placeholder='Password...' secureTextEntry={true} onChangeText={(text) => setPassword(text)} value={password} />

              <MaterialIcons name="password" size={24} color="black" />
          </View>

          <View style={{
              height: height / 14,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              elevation: 50,
              marginBottom: 30
          }}>
              <TextInput style={{
                  height: '100%',
                  width: '90%',
                  paddingLeft: 30
              }} placeholder='Phone...' onChangeText={(text) => setPhoneNumber(text)} value={phoneNumber} />
              
              <Feather name="phone" size={24} color="black" />
          </View>

          <TouchableOpacity style={{
              backgroundColor: '#5832ab',
              padding: 20,
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20
          }} onPress={checkCredentials}>
              <Text style={{
                  color: '#fff'
              }}>Sign Up</Text>
          </TouchableOpacity>

          <View style={{
              marginTop: 30,
              justifyContent: 'center'
          }}>
              <View style={{
                  backgroundColor: '#000',
                  height: 1
              }} />
              <View style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  backgroundColor: '#fff',
                  paddingHorizontal: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
              }}>
                  <Text>OR</Text>
              </View>
          </View>
      </View>
      
      <TouchableOpacity style={{
          backgroundColor: '#5832ab',
          padding: 20,
          marginTop: 30,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
          marginHorizontal: 30
      }} onPress={() => navigation.navigate('SignIn')}>
        <Text style={{
          color: '#fff'
        }}>Sign In to your account</Text>
      </TouchableOpacity>
  </View>
  )
}

export default SignUp