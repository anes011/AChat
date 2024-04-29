import { View, Text, Dimensions, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from '../Context';

const MessagesView = (props) => {

    const { width, height } = Dimensions.get('window');

    const [userId, setUserId] = useState('');

    useEffect(() => {
        const getUserInfo = async () => {
          try {
            const response = await AsyncStorage.getItem('user');
            setUserId(JSON.parse(response));
          } catch (err) {
            console.error(err);
          }
        };
    
        getUserInfo();
    }, []);

    const getItemLayout = (data, index) => ({
        length: 200, // Height for each message item (adjust as needed)
        offset: 200 * index, // Height * index
        index,
    });

  return (
    <View style={{
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, .1)',
        flex: 1
    }}>
        <FlatList 
        initialScrollIndex={props.messages.length - 1}
        getItemLayout={getItemLayout}
        ref={props.flatListRef} 
        showsVerticalScrollIndicator={false} 
        data={props.messages} 
        renderItem={({item}) => (
            <>
                {
                    parseInt(item.sender_id) === parseInt(userId) ? (
                        <View style={{
                            alignSelf: 'flex-end',
                            marginBottom: 30
                        }}>
                            <View style={{
                                backgroundColor: '#5832ab',
                                padding: 20,
                                borderRadius: 30,
                                borderTopRightRadius: 0,
                                maxWidth: width / 1.5
                            }}>
                                <Text style={{
                                    color: '#fff'
                                }}>{item.content}</Text>
                            </View>
            
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                alignSelf: 'flex-end',
                                gap: 30,
                                marginRight: 10,
                                marginTop: 5
                            }}>
                                <Text style={{
                                    fontWeight: 300
                                }}>{moment(item.timestamp).format('HH:mm')}</Text>
            
                                {
                                    item.seen && (
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 10
                                        }}>
                                            <Text>Seen</Text>
                                            <Ionicons name="checkmark-done" size={20} color="black" />
                                        </View>
                                    )
                                }

                                {
                                    item.status === 'sending' && (
                                        <Ionicons name="time-outline" size={18} color="black" />
                                    )
                                }
                            </View>
                        </View>
                    ) : (
                        <View style={{
                            alignSelf: 'flex-start',
                            marginBottom: 30
                        }}>
                            <View style={{
                                backgroundColor: 'lightgrey',
                                padding: 20,
                                borderRadius: 30,
                                borderTopLeftRadius: 0,
                                maxWidth: width / 1.5
                            }}>
                                <Text style={{
                                    color: '#fff'
                                }}>{item.content}</Text>
                            </View>
            
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                alignSelf: 'flex-end',
                                gap: 30,
                                marginRight: 10,
                                marginTop: 5
                            }}>
                                <Text style={{
                                    fontWeight: 300
                                }}>{moment(new Date(item.timestamp)).format('HH:mm')}</Text>
            
                                {
                                    parseInt(item.sender_id) === parseInt(userId) && item.seen && (
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 10
                                        }}>
                                            <Text>Seen</Text>
                                            <Ionicons name="checkmark-done" size={20} color="black" />
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                    )
                }
            </>
        )} />
    </View>
  )
};

export default MessagesView;