import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import data from '../Context';
import ChatAddUsers from '../Components/ChatAddUsers';

const Chat = () => {

  const { setPressedChat } = useContext(data);

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
      const getMyChats = async () => {
        try {
          const response = await fetch(`http://192.168.1.5:8000/chat/myChat/${userInfo.id}`);
          const data = await response.json();
  
          setChats(data.chats);
        } catch (err) {
          console.error(err);
        }
      };
  
      getMyChats();
    };
  }, [userInfo]);

  const goToMessaging = (id) => {
    const getChatById = async () => {
      try {
        const response = await fetch(`http://192.168.1.5:8000/chat/chatById/${id}`);
        const data = await response.json();

        setPressedChat(data.chat);
      } catch (err) {
        console.error(err);
      }
    };

    getChatById();

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
        {
          !chats.length ? (
            <>
              <Image style={{
                height: 300,
                width: 300,
                alignSelf: 'center'
              }} source={require('../assets/chat-bot.gif')} />

              <Text style={{
                fontSize: 18,
                fontWeight: 300,
                textAlign: 'center'
              }}>Start chatting today!</Text>
            </>
          ) : (
            <FlatList showsVerticalScrollIndicator={false} data={chats} keyExtractor={item => item.id} renderItem={({item}) => (
              <>
                {
                  item.creator_id === userInfo.id ? (
                    <TouchableOpacity style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 30
                    }} onPress={() => goToMessaging(item.id)}>
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
                        {
                          item.last_message !== null && (
                            <Text style={{
                              fontWeight: 500
                            }}>{item.last_message}</Text>
                          )
                        }
                      </View>
          
                      <View style={{
                        alignItems: 'center',
                        gap: 7
                      }}>
                        {
                          item.last_message_time !== null && (
                            <Text style={{
                              fontWeight: 500
                            }}>{item.last_message_time}</Text>
                          )
                        }
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
                  ) : (
                    <TouchableOpacity style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 30
                    }} onPress={() => goToMessaging(item.id)}>
                      <View style={{
                        height: 50,
                        width: 50,
                        borderRadius: 100 / 2,
                        overflow: 'hidden'
                      }}>
                        <Image style={{
                          height: '100%',
                          width: '100%'
                        }} source={{uri: item.creator_photo}} />
                      </View>
          
                      <View style={{
                        gap: 7
                      }}>
                        <Text style={{
                          fontWeight: 700,
                          fontSize: 17
                        }}>{item.creator_name}</Text>
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
                        }}>{item.last_message_time}</Text>
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
                  )
                }
              </>
            )} />
          )
        }
      </View>

      <ChatAddUsers userInfo={userInfo} chats={chats} setChats={setChats} />
    </View>
  )
};

export default Chat;