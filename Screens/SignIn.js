import { View, Text, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {

    const navigation = useNavigation();

    const { width, height } = Dimensions.get('window');

  return (
    <View style={{
        flex: 1
    }}>
        <Image style={{
            height: 50,
            width: 50,
            margin: 30
        }} source={require('../assets/achat-logo.png')} />

        <Text style={{
            alignSelf: 'center',
            fontSize: 30,
            fontWeight: 300,
        }}>Sign In</Text>
        
        <View style={{
            paddingHorizontal: 30,
            marginTop: 60
        }}>
            <View style={{
                height: height / 14,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
                elevation: 50,
                marginBottom: 30
            }}>
                <TextInput style={{
                    height: '100%',
                    width: '90%',
                    paddingLeft: 30
                }} placeholder='Email...' />

                <MaterialIcons name="alternate-email" size={24} color="black" />
            </View>

            <View style={{
                height: height / 14,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
                elevation: 50,
                marginBottom: 30
            }}>
                <TextInput style={{
                    height: '100%',
                    width: '90%',
                    paddingLeft: 30
                }} placeholder='Password...' secureTextEntry={true} />

                <MaterialIcons name="password" size={24} color="black" />
            </View>

            <TouchableOpacity style={{
                backgroundColor: '#6A4460',
                padding: 20,
                marginTop: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20
            }}>
                <Text style={{
                    color: '#fff'
                }}>Sign In</Text>
            </TouchableOpacity>

            <View style={{
                marginTop: 80,
                justifyContent: 'center'
            }}>
                <View style={{
                    backgroundColor: '#000',
                    height: 1
                }} />
                <View style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    backgroundColor: '#fff',
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text>OR</Text>
                </View>
            </View>
        </View>
        
        <TouchableOpacity style={{
            backgroundColor: '#6A4460',
            padding: 20,
            marginTop: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            marginHorizontal: 30
        }} onPress={() => navigation.navigate('SignUp')}>
            <Text style={{
                color: '#fff'
            }}>Create new account</Text>
        </TouchableOpacity>
    </View>
  )
};

export default SignIn;