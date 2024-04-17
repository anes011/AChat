import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MessagesView = () => {

    const { width, height } = Dimensions.get('window');

  return (
    <View style={{
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, .1)',
        flex: 1
    }}>
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* Sent messages */}
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
                    }}>Hi, this is a message</Text>
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
                    }}>02:30</Text>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10
                    }}>
                        <Text>Seen</Text>
                        <Ionicons name="checkmark-done" size={20} color="black" />
                    </View>
                </View>
            </View>
            {/* ///////////// */}

            {/* Sent messages */}
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
                    }}>Hi, this is a message</Text>
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
                    }}>02:30</Text>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10
                    }}>
                        <Text>Seen</Text>
                        <Ionicons name="checkmark-done" size={20} color="black" />
                    </View>
                </View>
            </View>
            {/* ///////////// */}

            {/* Received messages */}
            <View style={{
                alignSelf: 'flex-start',
                marginBottom: 30,
            }}>
                <View style={{
                    backgroundColor: 'grey',
                    padding: 20,
                    borderRadius: 30,
                    borderTopLeftRadius: 0,
                    maxWidth: width / 1.5
                }}>
                    <Text style={{
                        color: '#fff'
                    }}>Hi, this is a message</Text>
                </View>

                <Text style={{
                    marginLeft: 10,
                    marginTop: 5,
                    fontWeight: 300
                }}>02:30</Text>
            </View>
            {/* ///////////////// */}
        </ScrollView>
    </View>
  )
};

export default MessagesView;