import { View, Text, Dimensions, Image, TouchableOpacity, Modal } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState, useContext, useEffect } from 'react';
import data from '../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MessagingBar = () => {

    const { pressedChat } = useContext(data);

    const navigation = useNavigation();

    const { width, height } = Dimensions.get('window');

    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState('');
    
    useEffect(() => {
        const getUserId = async () => {
            try {
                const response = await AsyncStorage.getItem('user');
                setUserId(JSON.parse(response));
            } catch (err) {
                console.error(err);
            }
        };

        getUserId();
    }, []);

  return (
    <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        elevation: 50,
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingTop: 50
    }}>
        {
            pressedChat.creator_id === userId ? (
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 20
                }} onPress={() => navigation.goBack()}>
                    <SimpleLineIcons name="arrow-left" size={24} color="black" />
        
                    <View style={{
                        height: 50,
                        width: 50,
                        borderRadius: 100 / 2,
                        overflow: 'hidden'
                    }}>
                        <Image style={{
                            height: '100%',
                            width: '100%'
                        }} source={{uri: pressedChat.chat_receiver_photo}} />
                    </View>
        
                    <View>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 500
                        }}>{pressedChat.chat_receiver_name}</Text>
                        <Text style={{
                            color: 'grey',
                            fontWeight: 300
                        }}>Online</Text>
                    </View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 20
                }} onPress={() => navigation.goBack()}>
                    <SimpleLineIcons name="arrow-left" size={24} color="black" />
        
                    <View style={{
                        height: 50,
                        width: 50,
                        borderRadius: 100 / 2,
                        overflow: 'hidden'
                    }}>
                        <Image style={{
                            height: '100%',
                            width: '100%'
                        }} source={{uri: pressedChat.user_photo}} />
                    </View>
        
                    <View>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 500
                        }}>{pressedChat.user_name}</Text>
                        <Text style={{
                            color: 'grey',
                            fontWeight: 300
                        }}>Online</Text>
                    </View>
                </TouchableOpacity>
            )
        }

        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20
        }}>
            <TouchableOpacity onPress={() => setShowModal(true)}>
                <Ionicons name="videocam-outline" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowModal(true)}>
                <Feather name="phone" size={24} color="black" />
            </TouchableOpacity>
        </View>
        
        <Modal
            animationType="slide"
            visible={showModal}>
                <Image style={{
                    height: 300,
                    width: 300,
                    alignSelf: 'center'
                }} source={require('../assets/spaceship.gif')} />

                <Text style={{
                    alignSelf: 'center',
                    fontSize: 20,
                    fontWeight: 300
                }}>Sorry, this feature is not available for the moment!</Text>

                <View style={{
                    alignItems: 'center',
                    gap: 20
                }}>
                    <Text style={{
                        alignSelf: 'center',
                        fontSize: 20,
                        fontWeight: 500,
                        marginTop: 50
                    }}>Coming Soon, 05/01/2025</Text>

                    <Ionicons name="time" size={40} color="#5832ab" />
                </View>

                <TouchableOpacity style={{
                    height: 80,
                    width: 80,
                    backgroundColor: '#5832ab',
                    borderRadius: 100 / 2,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 50
                }} onPress={() => setShowModal(false)}>
                    <SimpleLineIcons name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
        </Modal>
    </View>
  )
};

export default MessagingBar;