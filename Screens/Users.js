import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
          <TouchableOpacity style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 30
          }}>
            <View style={{
              height: 50,
              width: 50,
              borderRadius: 100 / 2,
              overflow: 'hidden'
            }}>
              <Image style={{
                height: '100%',
                width: '100%'
              }}  source={require('../assets/person-1.jpg')} />
            </View>

            <Text style={{
              fontSize: 17,
              fontWeight: 500
            }}>Chris leon</Text>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10
            }}>
              <Ionicons name="time" size={24} color="black" />
              <Text style={{
                fontWeight: 300
              }}>Joined in</Text>
              <Text>2021</Text>
            </View>
          </TouchableOpacity>

          {/* /////////////////// */}

          <TouchableOpacity style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 30
          }}>
            <View style={{
              height: 50,
              width: 50,
              borderRadius: 100 / 2,
              overflow: 'hidden'
            }}>
              <Image style={{
                height: '100%',
                width: '100%'
              }}  source={require('../assets/person-2.avif')} />
            </View>

            <Text style={{
              fontSize: 17,
              fontWeight: 500
            }}>Kim paul</Text>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10
            }}>
              <Ionicons name="time" size={24} color="black" />
              <Text style={{
                fontWeight: 300
              }}>Joined in</Text>
              <Text>2019</Text>
            </View>
          </TouchableOpacity>

          {/* /////////////////// */}

          <TouchableOpacity style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 30
          }}>
            <View style={{
              height: 50,
              width: 50,
              borderRadius: 100 / 2,
              overflow: 'hidden'
            }}>
              <Image style={{
                height: '100%',
                width: '100%'
              }}  source={require('../assets/person-3.webp')} />
            </View>

            <Text style={{
              fontSize: 17,
              fontWeight: 500
            }}>Elon musk</Text>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10
            }}>
              <Ionicons name="time" size={24} color="black" />
              <Text style={{
                fontWeight: 300
              }}>Joined in</Text>
              <Text>2015</Text>
            </View>
          </TouchableOpacity>

          {/* /////////////////// */}
        </ScrollView>
      </View>
    </View>
  )
};

export default Users;