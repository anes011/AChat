import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import data from '../Context';
import { AntDesign } from '@expo/vector-icons';
import { Overlay } from '@rneui/themed';
import { TextInput } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

const Chat = () => {

  const { setPressedChat } = useContext(data);

  const { width, height } = Dimensions.get('window');

  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState('');
  const [showAddButtons, setShowAddButtons] = useState(false);
  const [addUserBtn, setAddUserBtn] = useState(false);
  const [users, setUsers] = useState([]);

  const addButtons = new Animated.Value(0);

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
      const getUsers = async () => {
        try {
          const response = await fetch(`http://192.168.1.5:8000/users/allUsersButMe/${userInfo.id}`);
          const data = await response.json();
  
          setUsers(data.users);
        } catch (err) {
          console.error(err);
        }
      };
  
      getUsers();
    };
  }, []);

  useEffect(() => {
    if (addButtons) {
      Animated.spring(addButtons, {
        toValue: -100,
        duration: 1000,
        useNativeDriver: true
      }).start();
    };
  }, [addButtons]);

  const createChat = (id) => {
    const getUserInfo = async () => {
      try {
        const response = await fetch(`http://192.168.1.5:8000/users/userById/${id}`);
        const data = await response.json();
        const receiver = data.user;

        //Create a chat
        const chatApi = async () => {
          try {
            const response = await fetch(`http://192.168.1.5:8000/chat/createChat/${userInfo.id}/${receiver.id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                user_name: userInfo.name,
                user_photo: userInfo.photo,
                chat_receiver_name: receiver.name,
                chat_receiver_photo: receiver.photo
              })
            });

            const data = await response.json();

            console.log(data);

            //Chat created!
          } catch (err) {
            console.error(err);
          }
        };

        chatApi();
        //
      } catch (err) {
        console.error(err);
      }
    };

    getUserInfo();
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 30
          }} onPress={() => navigation.navigate('Messaging')}>
            <View style={{
              height: 50,
              width: 50,
              borderRadius: 100 / 2,
              overflow: 'hidden'
            }}>
              <Image style={{
                height: '100%',
                width: '100%'
              }} source={require('../assets/person-1.jpg')} />
            </View>

            <View style={{
              gap: 7
            }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 17
              }}>Chris leon</Text>
              <Text style={{
                fontWeight: 500
              }}>Hi, what's your plans...</Text>
            </View>

            <View style={{
              alignItems: 'center',
              gap: 7
            }}>
              <Text style={{
                fontWeight: 500
              }}>03:11</Text>
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
        </ScrollView>
      </View>

      <TouchableOpacity style={{
        height: 70,
        width: 70,
        backgroundColor: 'purple',
        alignSelf: 'flex-end',
        borderRadius: 100 / 2,
        marginBottom: 40,
        justifyContent: 'center',
        alignItems: 'center'
      }} onPress={() => setShowAddButtons(!showAddButtons)}>
        {
          showAddButtons ? (
            <View style={{
              transform: [{rotate: '45deg'}]
            }}>
              <AntDesign name="plus" size={28} color="#fff" />
            </View>
          ) : (
            <View style={{
              transform: [{rotate: '0deg'}]
            }}>
              <AntDesign name="plus" size={28} color="#fff" />
            </View>
          )
        }
      </TouchableOpacity>

      {
        showAddButtons && (
          <Animated.View style={{
            position: 'absolute',
            right: 30,
            bottom: 40,
            gap: 30,
            transform: [{translateY: addButtons}]
          }}>
            <TouchableOpacity style={{
              height: 70,
              width: 70,
              backgroundColor: 'purple',
              borderRadius: 100 / 2,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <AntDesign name="addusergroup" size={24} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={{
              height: 70,
              width: 70,
              backgroundColor: 'purple',
              borderRadius: 100 / 2,
              justifyContent: 'center',
              alignItems: 'center'
            }} onPress={() => setAddUserBtn(true)}>
              <AntDesign name="adduser" size={24} color="#fff" />
            </TouchableOpacity>
          </Animated.View>
        )
      }

      <Overlay isVisible={addUserBtn ? true : false} onBackdropPress={() => setAddUserBtn(false)} overlayStyle={{
        width: width - 60
      }}>
        <View style={{
          flexDirection: 'row',
          borderWidth: 2,
          borderColor: 'purple',
          borderRadius: 30,
          overflow: 'hidden'
        }}>
          <TextInput style={{
            flex: 1,
            paddingLeft: 20
          }} placeholder='Search for someone...' />

          <TouchableOpacity style={{
            padding: 15,
            paddingHorizontal: 20,
            backgroundColor: 'purple'
          }}>
            <Feather name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={{
          marginTop: 20
        }}>
          <FlatList data={users} keyExtractor={item => item.id} renderItem={({item}) => (
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20
            }}>
              <View style={{
                height: 50,
                width: 50,
                borderRadius: 100 / 2,
                overflow: 'hidden'
              }}>
                <Image source={{uri: item.photo}} style={{
                  height: '100%',
                  width: '100%'
                }} />
              </View>

              <Text>{item.name}</Text>

              <TouchableOpacity onPress={() => createChat(item.id)}>
                <AntDesign name="plus" size={30} color="purple" />
              </TouchableOpacity>
            </View>
          )} />
        </View>
      </Overlay>
    </View>
  )
};

export default Chat;