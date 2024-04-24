import { View, Text } from 'react-native';
import MessagingBar from '../Components/MessagingBar';
import MessagesView from '../Components/MessagesView';
import MessageField from '../Components/MessageField';
import { useRef, useState } from 'react';

const Messaging = () => {

  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);

  return (
    <View style={{
        flex: 1
    }}>
        <MessagingBar />
        <MessagesView messages={messages} flatListRef={flatListRef} />
        <MessageField messages={messages} setMessages={setMessages} flatListRef={flatListRef} />
    </View>
  )
};

export default Messaging;