import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Chat = () => {

  const navigation = useNavigation();

  return (
    <View style={{
      flex: 1,
      paddingHorizontal: 30,
      paddingTop: 40
    }}>
      <View style={{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
      }}>
        <Text>Welcome back John Doe!</Text>
        
        <TouchableOpacity style={{
          backgroundColor: 'lightgrey',
          height: 40,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100 / 2
        }}>
          <Ionicons name="search-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={{
        marginTop: 30,
        fontWeight: 500,
        fontSize: 20
      }}>Chats</Text>

      <View style={{
        flex: 1,
        marginTop: 30
      }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 30
          }} onPress={() => navigation.navigate('Messaging')}>
            <View style={{
              height: 50,
              width: 50,
              borderRadius: 100 / 2,
              overflow: 'hidden'
            }}>
              <Image style={{
                height: '100%',
                width: '100%'
              }} source={require('../assets/person-1.jpg')} />
            </View>

            <View style={{
              gap: 7
            }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 17
              }}>Chris leon</Text>
              <Text style={{
                fontWeight: 500
              }}>Hi, are you pulling up today...</Text>
            </View>

            <View style={{
              alignItems: 'center',
              gap: 7
            }}>
              <Text style={{
                fontWeight: 500
              }}>02:11</Text>
              <View style={{
                backgroundColor: 'purple',
                height: 25,
                width: 25,
                borderRadius: 100 / 2,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontWeight: 700,
                  color: '#fff'
                }}>3</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* ////////////////////// */}

          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
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
              }} source={require('../assets/person-2.avif')} />
            </View>

            <View style={{
              gap: 7
            }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 17
              }}>Kim paul</Text>
              <Text style={{
                fontWeight: 500
              }}>yes i got you, but first let's...</Text>
            </View>

            <View style={{
              alignItems: 'center',
              gap: 7
            }}>
              <Text style={{
                fontWeight: 500
              }}>04:21</Text>
              <View style={{
                backgroundColor: 'purple',
                height: 25,
                width: 25,
                borderRadius: 100 / 2,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontWeight: 700,
                  color: '#fff'
                }}>1</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* ////////////////////// */}

          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
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
              }} source={require('../assets/person-3.webp')} />
            </View>

            <View style={{
              gap: 7
            }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 17
              }}>Elon Musk</Text>
              <Text style={{
                fontWeight: 500
              }}>Sounds great, put it on X...</Text>
            </View>

            <View style={{
              alignItems: 'center',
              gap: 7
            }}>
              <Text style={{
                fontWeight: 500
              }}>01:07</Text>
              <View style={{
                backgroundColor: 'purple',
                height: 25,
                width: 25,
                borderRadius: 100 / 2,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontWeight: 700,
                  color: '#fff'
                }}>1</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
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
              }} source={require('../assets/person-1.jpg')} />
            </View>

            <View style={{
              gap: 7
            }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 17
              }}>Chris leon</Text>
              <Text style={{
                fontWeight: 500
              }}>Hi, are you pulling up today...</Text>
            </View>

            <View style={{
              alignItems: 'center',
              gap: 7
            }}>
              <Text style={{
                fontWeight: 500
              }}>02:11</Text>
              <View style={{
                backgroundColor: 'purple',
                height: 25,
                width: 25,
                borderRadius: 100 / 2,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontWeight: 700,
                  color: '#fff'
                }}>3</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* ////////////////////// */}

          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
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
              }} source={require('../assets/person-2.avif')} />
            </View>

            <View style={{
              gap: 7
            }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 17
              }}>Kim paul</Text>
              <Text style={{
                fontWeight: 500
              }}>yes i got you, but first let's...</Text>
            </View>

            <View style={{
              alignItems: 'center',
              gap: 7
            }}>
              <Text style={{
                fontWeight: 500
              }}>04:21</Text>
              <View style={{
                backgroundColor: 'purple',
                height: 25,
                width: 25,
                borderRadius: 100 / 2,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontWeight: 700,
                  color: '#fff'
                }}>1</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* ////////////////////// */}

          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
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
              }} source={require('../assets/person-3.webp')} />
            </View>

            <View style={{
              gap: 7
            }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 17
              }}>Elon Musk</Text>
              <Text style={{
                fontWeight: 500
              }}>Sounds great, put it on X...</Text>
            </View>

            <View style={{
              alignItems: 'center',
              gap: 7
            }}>
              <Text style={{
                fontWeight: 500
              }}>01:07</Text>
              <View style={{
                backgroundColor: 'purple',
                height: 25,
                width: 25,
                borderRadius: 100 / 2,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontWeight: 700,
                  color: '#fff'
                }}>1</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
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
              }} source={require('../assets/person-1.jpg')} />
            </View>

            <View style={{
              gap: 7
            }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 17
              }}>Chris leon</Text>
              <Text style={{
                fontWeight: 500
              }}>Hi, are you pulling up today...</Text>
            </View>

            <View style={{
              alignItems: 'center',
              gap: 7
            }}>
              <Text style={{
                fontWeight: 500
              }}>02:11</Text>
              <View style={{
                backgroundColor: 'purple',
                height: 25,
                width: 25,
                borderRadius: 100 / 2,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontWeight: 700,
                  color: '#fff'
                }}>3</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* ////////////////////// */}

          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
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
              }} source={require('../assets/person-2.avif')} />
            </View>

            <View style={{
              gap: 7
            }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 17
              }}>Kim paul</Text>
              <Text style={{
                fontWeight: 500
              }}>yes i got you, but first let's...</Text>
            </View>

            <View style={{
              alignItems: 'center',
              gap: 7
            }}>
              <Text style={{
                fontWeight: 500
              }}>04:21</Text>
              <View style={{
                backgroundColor: 'purple',
                height: 25,
                width: 25,
                borderRadius: 100 / 2,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontWeight: 700,
                  color: '#fff'
                }}>1</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* ////////////////////// */}

          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
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
              }} source={require('../assets/person-3.webp')} />
            </View>

            <View style={{
              gap: 7
            }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 17
              }}>Elon Musk</Text>
              <Text style={{
                fontWeight: 500
              }}>Sounds great, put it on X...</Text>
            </View>

            <View style={{
              alignItems: 'center',
              gap: 7
            }}>
              <Text style={{
                fontWeight: 500
              }}>01:07</Text>
              <View style={{
                backgroundColor: 'purple',
                height: 25,
                width: 25,
                borderRadius: 100 / 2,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontWeight: 700,
                  color: '#fff'
                }}>1</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
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
              }} source={require('../assets/person-1.jpg')} />
            </View>

            <View style={{
              gap: 7
            }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 17
              }}>Chris leon</Text>
              <Text style={{
                fontWeight: 500
              }}>Hi, are you pulling up today...</Text>
            </View>

            <View style={{
              alignItems: 'center',
              gap: 7
            }}>
              <Text style={{
                fontWeight: 500
              }}>02:11</Text>
              <View style={{
                backgroundColor: 'purple',
                height: 25,
                width: 25,
                borderRadius: 100 / 2,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontWeight: 700,
                  color: '#fff'
                }}>3</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* ////////////////////// */}

          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
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
              }} source={require('../assets/person-2.avif')} />
            </View>

            <View style={{
              gap: 7
            }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 17
              }}>Kim paul</Text>
              <Text style={{
                fontWeight: 500
              }}>yes i got you, but first let's...</Text>
            </View>

            <View style={{
              alignItems: 'center',
              gap: 7
            }}>
              <Text style={{
                fontWeight: 500
              }}>04:21</Text>
              <View style={{
                backgroundColor: 'purple',
                height: 25,
                width: 25,
                borderRadius: 100 / 2,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontWeight: 700,
                  color: '#fff'
                }}>1</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* ////////////////////// */}

          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
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
              }} source={require('../assets/person-3.webp')} />
            </View>

            <View style={{
              gap: 7
            }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 17
              }}>Elon Musk</Text>
              <Text style={{
                fontWeight: 500
              }}>Sounds great, put it on X...</Text>
            </View>

            <View style={{
              alignItems: 'center',
              gap: 7
            }}>
              <Text style={{
                fontWeight: 500
              }}>01:07</Text>
              <View style={{
                backgroundColor: 'purple',
                height: 25,
                width: 25,
                borderRadius: 100 / 2,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontWeight: 700,
                  color: '#fff'
                }}>1</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  )
};

export default Chat;