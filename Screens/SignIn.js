import { View, Text, Image, TextInput, Dimensions, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {

    const navigation = useNavigation();

    const { width, height } = Dimensions.get('window');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const signIn = () => {
        setLoading(true);

        const loginApi = async () => {
            try {
                const response = await fetch('http://192.168.1.5:8000/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });

                const data = await response.json();

                if (data.Success) {
                    const saveUser = async () => {
                        try {
                            await AsyncStorage.setItem('user', JSON.stringify(data.userId));
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }]
                            });
                            setLoading(false);
                        } catch (err) {
                            console.error(err);
                        }
                    };

                    saveUser();
                } else {
                    Alert.alert(data.Error);
                    setLoading(false);
                };
            } catch (err) {
                Alert.alert('Somthing went wrong, please try again later!');
                setLoading(false);
            }
        };

        loginApi();
    };

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
                }} placeholder='Email...' onChangeText={(text) => setEmail(text)} value={email} />

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
                }} placeholder='Password...' secureTextEntry={true} onChangeText={(text) => setPassword(text)} value={password} />

                <MaterialIcons name="password" size={24} color="black" />
            </View>

            <TouchableOpacity style={{
                backgroundColor: '#5832ab',
                padding: 20,
                marginTop: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20
            }} onPress={signIn}>
                {
                    loading ? (
                        <ActivityIndicator size={'large'} color={'#fff'} />
                    ) : (
                        <Text style={{
                            color: '#fff'
                        }}>Sign In</Text>
                    )
                }
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
            backgroundColor: '#5832ab',
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