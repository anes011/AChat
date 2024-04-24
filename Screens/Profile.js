import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {

  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState('');
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await AsyncStorage.getItem('user');
        const userId = JSON.parse(response);

        const getUserById = async () => {
          try {
            const response = await fetch(`http://192.168.1.5:8000/users/userById/${userId}`);
            const data = await response.json();

            setUserInfo(data.user);
          } catch (err) {
            console.error(err);
          }
        };

        getUserById();
      } catch (err) {
        console.error(err);
      }
    };

    getUserInfo();
  }, []);

  const goToSign = () => {
    const deleteUser = async () => {
      try {
        await AsyncStorage.removeItem('user');
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }]
        });
      } catch (err) {
        console.error(err);
      }
    };

    deleteUser();
  };

  const pickPhoto = () => {
    const pick = async () => {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          const formData = new FormData();
          const file = {
            name: String(result.assets[0].uri),
            uri: result.assets[0].uri,
            type: result.assets[0].mimeType
          };
          formData.append('photo', file);

          const updateUserPhoto = async () => {
            try {
              const response = await fetch(`http://192.168.1.5:8000/users/changePhoto/${userInfo.id}`, {
                method: 'PUT',
                body: formData
              });

              const data = await response.json();

              setUserInfo(data.update);
            } catch (err) {
              console.error(err);
            }
          };

          updateUserPhoto();
        }
      } catch (err) {
        console.error(err);
      }
    };

    pick();
  };

  return (
    <View style={{
      flex: 1
    }}>
      <Image style={{
        height: 70,
        width: 70,
        margin: 30
      }} source={require('../assets/achat-logo.png')} />

      <View style={{
        alignSelf: 'center'
      }}>
        <View style={{
          height: 100,
          width: 100,
          borderRadius: 100 / 2,
          overflow: 'hidden'
        }}>
          <Image style={{
            height: '100%',
            width: '100%'
          }} source={{uri: userInfo.photo}} />
        </View>
        <TouchableOpacity style={{
          height: 30,
          width: 30,
          borderRadius: 100 / 2,
          backgroundColor: '#000',
          position: 'absolute',
          bottom: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center'
        }} onPress={pickPhoto}>
          <Feather name="edit-2" size={17} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={{
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 500,
        marginVertical: 30
      }}>{userInfo.name}</Text>
      
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        backgroundColor: 'lightgrey',
        marginHorizontal: 30,
        padding: 20,
        borderRadius: 20,
        marginBottom: 30
      }}>
        <MaterialIcons name="alternate-email" size={24} color="black" />
        <Text>{userInfo.email}</Text>
      </View>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        backgroundColor: 'lightgrey',
        marginHorizontal: 30,
        padding: 20,
        borderRadius: 20,
        marginBottom: 30
      }}>
        <Feather name="phone" size={24} color="black" />
        <Text>{userInfo.phone_number}</Text>
      </View>

      <TouchableOpacity style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        backgroundColor: 'lightgrey',
        marginHorizontal: 30,
        padding: 20,
        borderRadius: 20,
        marginBottom: 30
      }}>
        <Octicons name="dot" size={24} color="black" />
        <Text>Online</Text>
        <View style={{
          position: 'absolute',
          right: 30
        }}>
          <Feather name="arrow-right" size={24} color="black" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToSign} style={{
        height: 70,
        width: 70,
        borderRadius: 100 / 2,
        backgroundColor: 'red',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
      }}>
        <Ionicons name="log-out" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  )
};

export default Profile;