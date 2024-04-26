import { View, Text, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useEffect, useState, useContext } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EmojiPicker, {emojiFromUtf16} from "rn-emoji-picker"
import {emojis} from "rn-emoji-picker/dist/data"
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from '../Context';

const MessageField = (props) => {

    const { pressedUser } = useContext(data);

    const { width, height } = Dimensions.get('window');

    const [showSend, setShowSend] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const [messageText, setMessageText] = useState('');

    const [userInfo, setUserInfo] = useState('');
    const [pressedUserInfo, setPressedUserInfo] = useState('');

    useEffect(() => {
        const userId = async () => {
            try {
                const response = await AsyncStorage.getItem('user');
                const userId = JSON.parse(response);

                const getUserInfo = async () => {
                    try {
                        const response = await fetch(`http://192.168.1.5:8000/users/userById/${userId}`);
                        const data = await response.json();

                        setUserInfo(data.user);
                    } catch (err) {
                        console.error(err);
                    }
                };

                getUserInfo();
            } catch (err) {
                console.error(err);
            }
        };

        userId();
    }, []);

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await fetch(`http://192.168.1.5:8000/users/userById/${pressedUser}`);
                const data = await response.json();

                setPressedUserInfo(data.user);
            } catch (err) {
                console.error(err);
            }
        };

        getUserById();
    }, []);

    const handleSelectedEmoji = (emojiObj) => {
        const { emoji } = emojiObj;
        setMessageText(messageText + emoji);
    };

    useEffect(() => {
        if (messageText !== '') {
            setShowSend(true);
        } else {
            setShowSend(false);
        };
    }, [messageText]);

    const sendMessage = () => {
        //Render message on the screen offline
        props.setMessages(prev => [...prev, {
            sender_id: userInfo.id,
            receiver_id: pressedUser,
            content: messageText,
            timestamp: Date.now(),
            status: 'sending'
        }]);
        setMessageText('');
        setTimeout(() => {
            props.flatListRef.current.scrollToEnd({ animated: true });
        }, 100);
        //
        

        //Send the message using the Api
        const sendMessageApi = async () => {
            try {
                const response = await fetch(`http://192.168.1.5:8000/message/sendMessage/${userInfo.id}/${pressedUser}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        content: messageText
                    })
                });

                const data = await response.json();
                const message = data.message;

                //Check if chat exists
                const checkChatApi = async () => {
                    try {
                        const response = await fetch(`http://192.168.1.5:8000/chat/checkUserExists/${userInfo.id}/${pressedUser}`);
                        const data = await response.json();

                        if (data.not_found) {
                            //If receiver does not exist in my chat, 
                            //we add eachother
                            const createChatApi = async () => {
                                try {
                                    const response = await fetch(`http://192.168.1.5:8000/chat/createChat/${userInfo.id}/${pressedUser}`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            last_message: message.content,
                                            last_message_time: message.timestamp,
                                            user_name: userInfo.name,
                                            user_photo: userInfo.photo,
                                            chat_receiver_name: pressedUserInfo.name,
                                            chat_receiver_photo: pressedUserInfo.photo
                                        })
                                    });

                                    const data = await response.json();
                                } catch (err) {
                                    console.error(err);
                                }
                            };

                            createChatApi();
                            //

                            //Add my self to the receiver's chat
                            const addMySelfToReceiverChat = async () => {
                                try {
                                    const response = await fetch(`http://192.168.1.5:8000/chat/createChat/${pressedUser}/${userInfo.id}`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            last_message: message.content,
                                            last_message_time: message.timestamp,
                                            user_name: pressedUserInfo.name,
                                            user_photo: pressedUserInfo.photo,
                                            chat_receiver_name: userInfo.name,
                                            chat_receiver_photo: userInfo.photo
                                        })
                                    });

                                    const data = await response.json();
                                } catch (err) {
                                    console.error(err);
                                }
                            };

                            addMySelfToReceiverChat();
                            //
                        } else {
                            //User exists in my chat, so we get both chats and
                            //update both chats with the last message
                            const getUserInMyChat = async () => {
                                try {
                                    const response = await fetch(`http://192.168.1.5:8000/chat/checkUserExists/${userInfo.id}/${pressedUser}`);
                                    const data = await response.json();
                                    const chat = data.chat;

                                    //We update chat last message and time
                                    const updateLastMessage = async () => {
                                        try {
                                            const response = await fetch(`http://192.168.1.5:8000/chat/updateLastMessage/${chat.id}`, {
                                                method: 'PUT',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    last_message: message.content
                                                })
                                            });

                                            const data = await response.json();
                                        } catch (err) {
                                            console.error(err);
                                        }
                                    };

                                    updateLastMessage();

                                    const updateLastMessageTime = async () => {
                                        try {
                                            const response = await fetch(`http://192.168.1.5:8000/chat/updateLastMessageTime/${chat.id}`, {
                                                method: 'PUT',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    last_message_time: message.timestamp
                                                })
                                            });

                                            const data = await response.json();
                                        } catch (err) {
                                            console.error(err);
                                        }
                                    };

                                    updateLastMessageTime();
                                    //
                                } catch (err) {
                                    console.error(err);
                                }
                            };

                            getUserInMyChat();

                            const getMySelfInHisChat = async () => {
                                try {
                                    const response = await fetch(`http://192.168.1.5:8000/chat/checkUserExists/${pressedUser}/${userInfo.id}`);
                                    const data = await response.json();
                                    const chat = data.chat;

                                    //We update chat last message and time
                                    const updateLastMessage = async () => {
                                        try {
                                            const response = await fetch(`http://192.168.1.5:8000/chat/updateLastMessage/${chat.id}`, {
                                                method: 'PUT',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    last_message: message.content
                                                })
                                            });

                                            const data = await response.json();
                                        } catch (err) {
                                            console.error(err);
                                        }
                                    };

                                    updateLastMessage();

                                    const updateLastMessageTime = async () => {
                                        try {
                                            const response = await fetch(`http://192.168.1.5:8000/chat/updateLastMessageTime/${chat.id}`, {
                                                method: 'PUT',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    last_message_time: message.timestamp
                                                })
                                            });

                                            const data = await response.json();
                                        } catch (err) {
                                            console.error(err);
                                        }
                                    };

                                    updateLastMessageTime();
                                    //
                                } catch (err) {
                                    console.error(err);
                                }
                            };

                            getMySelfInHisChat();
                            //
                        };
                    } catch (err) {
                        console.error(err);
                    }
                };

                checkChatApi();
                //
            } catch (err) {
                console.error(err);
            }
        };

        sendMessageApi();
        //
    };

  return (
    <View style={{
        backgroundColor: '#fff',
        padding: 20,
        paddingBottom: 30
    }}>

        <View style={{
            height: height / 15,
            borderRadius: 50,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            backgroundColor: 'lightgrey'
        }}>
            {
                !showSend ? (
                    <TouchableOpacity>
                        <FontAwesome name="microphone" size={24} color="grey" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={sendMessage}>
                        <MaterialCommunityIcons name="send-circle" size={35} color="#5832ab" />
                    </TouchableOpacity>
                )
            }

            <TextInput style={{
                height: '100%',
                flex: 1,
                paddingHorizontal: 20
            }} placeholder='Send a message...' onChangeText={(text) => setMessageText(text)} value={messageText} />

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20
            }}>
                <TouchableOpacity>
                    <Ionicons name="image-outline" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <Entypo name="emoji-happy" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>

        {
            showEmojiPicker && (
                <View style={{
                    height: height / 3,
                    marginTop: 20,
                    overflow: 'hidden'
                }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <EmojiPicker
                            emojis={emojis} // emojis data source see data/emojis
                            autoFocus={false} // autofocus search input
                            loading={false} // spinner for if your emoji data or recent store is async
                            darkMode={false} // to be or not to be, that is the question
                            perLine={7} // # of emoji's per line
                            onSelect={handleSelectedEmoji} // callback when user selects emoji - returns emoji obj
                            // backgroundColor={'#000'} // optional custom bg color
                            enabledCategories={[ // optional list of enabled category keys
                              'recent', 
                              'emotion', 
                              'emojis', 
                              'activities', 
                              'flags', 
                              'food', 
                              'places', 
                              'nature'
                            ]}
                            defaultCategory={'emotion'} // optional default category key
                        />
                    </ScrollView>
                </View>
            )
        }
    </View>
  )
};

export default MessageField;