import { View, Text, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from '../Context';
import { useNavigation } from '@react-navigation/native';

const Users = () => {

  const navigation = useNavigation();

  const { setPressedUser } = useContext(data);

  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    if (userId !== '') {
      const getUsers = async () => {
        try {
          const response = await fetch(`http://192.168.1.5:8000/users/allUsersButMe/${userId}`);
          const data = await response.json();
          setUsers(data.users);
        } catch (err) {
          console.error(err);
        }
      };
      
      getUsers();
    };
  }, [userId]);

  const goToChat = (id) => {
    setPressedUser(id);
    navigation.navigate('Messaging');
  };

  return (
    <View style={{
      flex: 1
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        gap: 50
      }}>
        <Text style={{
          fontWeight: 500,
          fontSize: 20
        }}>Our Proud Users</Text>
        <Image style={{
          height: 70,
          width: 70
        }} source={require('../assets/stars-3d.png')} />
      </View>

      <View style={{
        flex: 1,
        marginTop: 30,
        paddingHorizontal: 30
      }}>
        <FlatList showsVerticalScrollIndicator={false} data={users} keyExtractor={item => item.id} renderItem={({item}) => (
          <TouchableOpacity style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 30
          }} onPress={() => goToChat(item.id)}>
            <View style={{
              height: 50,
              width: 50,
              borderRadius: 100 / 2,
              overflow: 'hidden'
            }}>
              <Image style={{
                height: '100%',
                width: '100%'
              }}  source={{uri: item.photo}} />
            </View>

            <Text style={{
              fontSize: 17,
              fontWeight: 500
            }}>{item.name}</Text>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10
            }}>
              <Ionicons name="time" size={24} color="black" />
              <Text style={{
                fontWeight: 300
              }}>Joined in</Text>
              <Text>{item.timestamp.substring(0, 4)}</Text>
            </View>
          </TouchableOpacity>
        )} />
      </View>
    </View>
  )
};

export default Users;