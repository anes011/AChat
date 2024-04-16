import { View, Text, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import EmojiPicker, {emojiFromUtf16} from "rn-emoji-picker"
import {emojis} from "rn-emoji-picker/dist/data"
import { ScrollView } from 'react-native-gesture-handler';

const MessageField = () => {

    const { width, height } = Dimensions.get('window');

    const [showSend, setShowSend] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const [image, setImage] = useState('');

    const pickPhoto = () => {
        const pick = async () => {
            try {
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });

                if (!result.canceled) {
                    setImage(result.assets[0].uri);
                };
            } catch (err) {
                console.error(err);
            }
        };

        pick();
    };

  return (
    <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 20,
        paddingBottom: 30,
        maxHeight: 500
    }}>

        <ScrollView>
            <EmojiPicker
                emojis={emojis} // emojis data source see data/emojis
                autoFocus={true} // autofocus search input
                loading={false} // spinner for if your emoji data or recent store is async
                darkMode={true} // to be or not to be, that is the question
                perLine={7} // # of emoji's per line
                onSelect={console.log} // callback when user selects emoji - returns emoji obj
                // backgroundColor={'#000'} // optional custom bg color
                // enabledCategories={[ // optional list of enabled category keys
                //   'recent', 
                //   'emotion', 
                //   'emojis', 
                //   'activities', 
                //   'flags', 
                //   'food', 
                //   'places', 
                //   'nature'
                // ]}
                // defaultCategory={'food'} // optional default category key
            />

            <View style={{
                height: height / 15,
                borderRadius: 50,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
                backgroundColor: 'lightgrey'
            }}>
                {
                    !showSend ? (
                        <TouchableOpacity>
                            <FontAwesome name="microphone" size={24} color="grey" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity>
                            <MaterialCommunityIcons name="send-circle" size={35} color="#5832ab" />
                        </TouchableOpacity>
                    )
                }

                <TextInput style={{
                    height: '100%',
                    flex: 1,
                    paddingHorizontal: 20
                }} placeholder='Send a message...' onChangeText={(text) => {
                    text !== '' ? setShowSend(true) : setShowSend(false)
                }} />

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 20
                }}>
                    <TouchableOpacity onPress={pickPhoto}>
                        <Ionicons name="image-outline" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setShowEmojiPicker(!showEmojiPicker)}>
                        <Entypo name="emoji-happy" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </View>
  )
};

export default MessageField;