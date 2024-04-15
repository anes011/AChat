import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const Profile = () => {

  const navigation = useNavigation();

  const goToSign = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }]
    });
  };

  return (
    <View style={{
      flex: 1
    }}>
      <Image style={{
        height: 70,
        width: 70,
        margin: 30
      }} source={require('../assets/achat-logo.png')} />

      <View style={{
        alignSelf: 'center'
      }}>
        <View style={{
          height: 100,
          width: 100,
          borderRadius: 100 / 2,
          overflow: 'hidden'
        }}>
          <Image style={{
            height: '100%',
            width: '100%'
          }} source={require('../assets/person-1.jpg')} />
        </View>
        <TouchableOpacity style={{
          height: 30,
          width: 30,
          borderRadius: 100 / 2,
          backgroundColor: '#000',
          position: 'absolute',
          bottom: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Feather name="edit-2" size={17} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={{
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 500,
        marginVertical: 30
      }}>Chris leon</Text>
      
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        backgroundColor: 'lightgrey',
        marginHorizontal: 30,
        padding: 20,
        borderRadius: 20,
        marginBottom: 30
      }}>
        <MaterialIcons name="alternate-email" size={24} color="black" />
        <Text>chris011@gmail.com</Text>
      </View>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        backgroundColor: 'lightgrey',
        marginHorizontal: 30,
        padding: 20,
        borderRadius: 20,
        marginBottom: 30
      }}>
        <Feather name="phone" size={24} color="black" />
        <Text>+1 457 486 76</Text>
      </View>

      <TouchableOpacity style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        backgroundColor: 'lightgrey',
        marginHorizontal: 30,
        padding: 20,
        borderRadius: 20,
        marginBottom: 30
      }}>
        <Octicons name="dot" size={24} color="black" />
        <Text>Online</Text>
        <View style={{
          position: 'absolute',
          right: 30
        }}>
          <Feather name="arrow-right" size={24} color="black" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToSign} style={{
        height: 70,
        width: 70,
        borderRadius: 100 / 2,
        backgroundColor: 'red',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
      }}>
        <Ionicons name="log-out" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  )
};

export default Profile;