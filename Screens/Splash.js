import { useEffect } from 'react';
import { View, Text, Image, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {

  const navigation = useNavigation();

  const { width, height } = Dimensions.get('window');

  const logo = new Animated.Value(0);

  useEffect(() => {
    setTimeout(() => {
      Animated.spring(logo, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start();
    }, 2000);

    setTimeout(() => {
      const checkUserExists = async () => {
        try {
          const response = await AsyncStorage.getItem('user');
          if (response !== null) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }]
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: 'SignIn' }]
            });
          };
        } catch (err) {
          console.error(err);
        }
      };

      checkUserExists();
    }, 4000);
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View style={{opacity: logo}}>
        <Image style={{height: 300, width: 300}} source={require('../assets/achat-logo.png')} />
      </Animated.View>
    </View>
  )
};

export default Splash;