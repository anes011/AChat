import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useContext } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';
import data from '../Context';

const Chat = () => {

  const { setPressedUser } = useContext(data);

  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState('');
  const [chats, setChats] = useState([]);

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

  useEffect(() => {
    if (userInfo !== '') {
      const getUsersInMyChat = async () => {
        try {
          const response = await fetch(`http://192.168.1.5:8000/chat/myChat/${userInfo.id}`);
          const data = await response.json();
  
          setChats(data.chats);
        } catch (err) {
          console.error(err);
        }
      };
  
      getUsersInMyChat();
    };
  });

  const goToMessaging = (chat_receiver_id) => {
    setPressedUser(chat_receiver_id);
    navigation.navigate('Messaging');
  };

  return (
    <View style={{
      flex: 1,
      paddingHorizontal: 30,
      paddingTop: 40
    }}>
      <View style={{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
      }}>
        <Text>Welcome back {userInfo.name}!</Text>
        
        <TouchableOpacity style={{
          backgroundColor: 'lightgrey',
          height: 40,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100 / 2
        }}>
          <Ionicons name="search-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={{
        marginTop: 30,
        fontWeight: 500,
        fontSize: 20
      }}>Chats</Text>

      <View style={{
        flex: 1,
        marginTop: 30
      }}>
        <FlatList data={chats} keyExtractor={item => item.id} renderItem={({item}) => (
          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 30
          }} onPress={() => goToMessaging(item.chat_receiver_id)}>
            <View style={{
              height: 50,
              width: 50,
              borderRadius: 100 / 2,
              overflow: 'hidden'
            }}>
              <Image style={{
                height: '100%',
                width: '100%'
              }} source={{uri: item.chat_receiver_photo}} />
            </View>

            <View style={{
              gap: 7
            }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 17
              }}>{item.chat_receiver_name}</Text>
              <Text style={{
                fontWeight: 500
              }}>{item.last_message}</Text>
            </View>

            <View style={{
              alignItems: 'center',
              gap: 7
            }}>
              <Text style={{
                fontWeight: 500
              }}>{moment(item.last_message_time).format('HH:mm')}</Text>
              <View style={{
                backgroundColor: 'purple',
                height: 25,
                width: 25,
                borderRadius: 100 / 2,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontWeight: 700,
                  color: '#fff'
                }}>3</Text>
              </View>
            </View>
          </TouchableOpacity>
        )} />
      </View>
    </View>
  )
};

export default Chat;