import { View, Text, TextInput, TouchableOpacity, Dimensions, FlatList, Animated, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Overlay } from '@rneui/themed';
import { Feather } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

const ChatAddUsers = (props) => {

    const { width, height } = Dimensions.get('window');

    const [showAddButtons, setShowAddButtons] = useState(false);
    const [addUserBtn, setAddUserBtn] = useState(false);
    const [users, setUsers] = useState([]);

    const addButtons = new Animated.Value(0);

    useEffect(() => {
        if (addButtons) {
          Animated.spring(addButtons, {
            toValue: -190,
            duration: 1000,
            useNativeDriver: true
          }).start();
        };
    }, [addButtons]);

    useEffect(() => {
        if (props.userInfo !== '') {
            const getUsers = async () => {
            try {
                const response = await fetch(`http://192.168.1.5:8000/users/allUsersButMe/${props.userInfo.id}`);
                const data = await response.json();
        
                setUsers(data.users);
            } catch (err) {
                console.error(err);
            }
            };
        
            getUsers();
        };
    }, [props.userInfo]);

    const createChat = (id) => {
        const getUserInfo = async () => {
          try {
            const response = await fetch(`http://192.168.1.5:8000/users/userById/${id}`);
            const data = await response.json();
            const receiver = data.user;
    
            //Create a chat
            const chatApi = async () => {
              try {
                const response = await fetch(`http://192.168.1.5:8000/chat/createChat/${props.userInfo.id}/${receiver.id}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    user_name: props.userInfo.name,
                    user_photo: props.userInfo.photo,
                    chat_receiver_name: receiver.name,
                    chat_receiver_photo: receiver.photo
                  })
                });
    
                const data = await response.json();
    
                setAddUserBtn(false);
                setShowAddButtons(false);
    
                //Refresh chats
                const getMyChats = async () => {
                  try {
                    const response = await fetch(`http://192.168.1.5:8000/chat/myChat/${props.userInfo.id}`);
                    const data = await response.json();
            
                    props.setChats(data.chats);
                  } catch (err) {
                    console.error(err);
                  }
                };
            
                getMyChats();
                //
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
        alignSelf: 'flex-end',
        marginBottom: 40,
    }}>
        <TouchableOpacity style={{
            height: 60,
            width: 60,
            backgroundColor: 'purple',
            borderRadius: 100 / 2,
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
                gap: 30,
                transform: [{translateY: addButtons}]
            }}>
                <TouchableOpacity style={{
                height: 60,
                width: 60,
                backgroundColor: 'purple',
                borderRadius: 100 / 2,
                justifyContent: 'center',
                alignItems: 'center'
                }}>
                <AntDesign name="addusergroup" size={24} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity style={{
                height: 60,
                width: 60,
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
            <FlatList data={users} keyExtractor={item => item.id} renderItem={({item, index}) => (
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

                <View style={{
                    alignItems: 'center'
                }}>
                    <Ionicons name="time" size={24} color="black" />
                    <Text>{moment(item.timestamp).fromNow()}</Text>
                </View>

                <TouchableOpacity style={{
                  padding: 10,
                  borderRadius: 100 / 2,
                  backgroundColor: 'purple'
                }} onPress={() => createChat(item.id)}>
                  <AntDesign name="adduser" size={24} color="#fff" />
                </TouchableOpacity>
                </View>
            )} />
            </View>
        </Overlay>
    </View>
  )
};

export default ChatAddUsers;