import { View, Text, Image, TouchableOpacity, Dimensions, Alert, ActivityIndicator } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef, useState, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import data from '../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfilePhoto = () => {

    const navigation = useNavigation();

    const { name, email, password, phoneNumber } = useContext(data);

    const { width, height } = Dimensions.get('window');

    const bottomSheetRef = useRef(null);

    const [photo, setPhoto] = useState('');

    const [loading, setLoading] = useState(false);

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
                    setPhoto(result.assets[0]);
                };
            } catch (err) {
                console.error(err);
            }
        };

        pick();
    };

    const createUser = () => {
        setLoading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone_number', phoneNumber);

        const file = {
            uri: photo.uri,
            type: photo.mimeType,
            name: String(photo.uri)
        };

        formData.append('photo', file);

        const usersApi = async () => {
            try {
                const response = await fetch('http://192.168.1.5:8000/users/addUser', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    const saveUser = async () => {
                        try {
                            await AsyncStorage.setItem('user', JSON.stringify(data.user.id));
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }]
                            });
                            setLoading(false);
                        } catch (err) {
                            console.error(err);
                        }
                    };

                    saveUser();
                };
            } catch (err) {
                Alert.alert('Oops, somthing went wrong!');
            }
        };

        usersApi();
    };

  return (
    <View style={{
        flex: 1,
        backgroundColor: '#5832ab'
    }}>
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={['30%', '80%']}
        >
            <BottomSheetView style={{
                flex: 1, 
                alignItems: 'center'
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 40,
                    marginVertical: 20
                }}>
                    <Text>You're almost there!</Text>
                    <Ionicons name="checkmark-circle" size={24} color="#5832ab" />
                </View>

                <Image style={{
                    height: 200,
                    width: 200
                }} source={require('../assets/donuts.gif')} />

                <Text style={{
                    marginVertical: 20,
                    fontSize: 20,
                    fontWeight: 300
                }}>Add a profile photo:</Text>

                <TouchableOpacity style={{
                    height: 200,
                    width: 200,
                    borderRadius: 100 / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    elevation: 50,
                    overflow: 'hidden'
                }} onPress={pickPhoto}>
                    {
                        photo !== '' ? (
                            <Image style={{
                                height: '100%',
                                width: '100%'
                            }} source={{uri: photo.uri}} />
                        ) : (
                            <AntDesign name="cloudupload" size={40} color="#5832ab" />
                        )
                    }
                </TouchableOpacity>

                {
                    photo !== '' && (
                        <TouchableOpacity style={{
                            backgroundColor: '#5832ab',
                            marginTop: 30,
                            padding: 20,
                            borderRadius: 50,
                            width: width / 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            gap: 30
                        }} onPress={createUser}>
                            {
                                loading ? (
                                    <ActivityIndicator size={'large'} color={'#fff'} />
                                ) : (
                                    <Text style={{
                                        color: '#fff'
                                    }}>Nice! enjoy chat.</Text>
                                )
                            }
        
                            <Feather name="arrow-right" size={24} color="#fff" />
                        </TouchableOpacity>
                    )
                }
            </BottomSheetView>
        </BottomSheet>
    </View>
  )
};

export default ProfilePhoto;