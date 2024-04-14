import { View, Text, Dimensions, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

//Screens
import Chat from '../Screens/Chat';
import Users from '../Screens/Users';
import Profile from '../Screens/Profile';
//

const Tab = createBottomTabNavigator();

const BottomTab = () => {

    const { width, height } = Dimensions.get('window');

  return (
    <Tab.Navigator sceneContainerStyle={{backgroundColor: '#fff'}}
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                height: height / 12
            }
        }}
        initialRouteName='Chat'
    >
        <Tab.Screen name='Chat' component={Chat} options={{
            tabBarIcon: ({ focused }) => (
             <View>
                {
                    focused ? (
                        <View style={{alignItems: 'center'}}>
                            <Image 
                                style={{height: 30, width: 30}} 
                                source={require('../assets/chat-icon.png')} 
                            />
                            <Text style={{fontWeight: 500}}>Chat</Text>
                        </View>
                    ) : (
                        <View style={{alignItems: 'center'}}>
                            <Image 
                                style={{
                                    height: 30, 
                                    width: 30, 
                                    transform: [{rotate: '180deg'}]
                                }} 
                                source={require('../assets/chat-icon.png')} 
                            />
                            <Text style={{fontWeight: 500}}>Chat</Text>
                        </View>
                    )
                }
             </View>   
            )
        }} />
        <Tab.Screen name='Users' component={Users} options={{
            tabBarIcon: ({ focused }) => (
                <>
                    {
                        focused ? (
                            <View style={{alignItems: 'center'}}>
                                <AntDesign 
                                    name="slack" 
                                    size={30} 
                                    color="black" 
                                />
                                <Text style={{fontWeight: 500}}>Users</Text>
                            </View>
                        ) : (
                            <View style={{alignItems: 'center'}}>
                                <AntDesign 
                                    name="slack-square" 
                                    size={30} 
                                    color="black" 
                                />
                                <Text style={{fontWeight: 500}}>Users</Text>
                            </View>
                        )
                    }
                </>
            )
        }} />
        <Tab.Screen name='Profile' component={Profile} options={{
            tabBarIcon: ({ focused }) => (
                <>
                    {
                        focused ? (
                            <View style={{alignItems: 'center'}}>
                                <FontAwesome 
                                    name="user-o" 
                                    size={30} 
                                    color="black" 
                                />
                                <Text style={{fontWeight: 500}}>Profile</Text>
                            </View>
                        ) : (
                            <View style={{alignItems: 'center'}}>
                                <FontAwesome 
                                    name="user" 
                                    size={30} 
                                    color="black" 
                                />
                                <Text style={{fontWeight: 500}}>Profile</Text>
                            </View>
                        )
                    }
                </>
            )
        }} />
    </Tab.Navigator>
  )
};

export default BottomTab;