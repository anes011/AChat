import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

const Users = () => {
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity>
            <View style={{
              height: 40,
              width: 40,
              borderRadius: 100 / 2,
              overflow: 'hidden'
            }}>
              <Image style={{
                height: '100%',
                width: '100%'
              }}  source={require('../assets/person-1.jpg')} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  )
};

export default Users;