import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';

const ProfilePhoto = () => {

    const { width, height } = Dimensions.get('window');

    const bottomSheetRef = useRef(null);

    const [photo, setPhoto] = useState('');

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
                    setPhoto(result.assets[0].uri);
                };
            } catch (err) {
                console.error(err);
            }
        };

        pick();
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
                            }} source={{uri: photo}} />
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
                        }}>
                            <Text style={{
                                color: '#fff'
                            }}>Nice! enjoy chat.</Text>
        
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