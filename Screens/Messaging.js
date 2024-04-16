import { View, Text } from 'react-native';
import MessagingBar from '../Components/MessagingBar';
import MessagesView from '../Components/MessagesView';
import MessageField from '../Components/MessageField';

const Messaging = () => {
  return (
    <View style={{
        flex: 1
    }}>
        <MessagingBar />
        <MessagesView />
        <MessageField />
    </View>
  )
};

export default Messaging;