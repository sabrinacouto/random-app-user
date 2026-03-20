import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import { FlashList, FlashListRef } from '@shopify/flash-list';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, Message } from '../types';
import { getMessages, saveMessage, clearMessages } from '../storage/chatStorage';
import MessageBubble from '../components/chat/MessageBubble';
import ChatInput from '../components/chat/ChatInput';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export default function ChatScreen({ route, navigation }: Props) {
  const { user } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const listRef = useRef<FlashListRef<Message>>(null);

  const fullName = `${user.name.first} ${user.name.last}`;

  useEffect(() => {
    getMessages(user.login.uuid).then(setMessages);
  }, []);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const message: Message = {
      id: Date.now().toString(),
      text,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
    };

    const updated = await saveMessage(user.login.uuid, message);
    setMessages(updated);
    setInput('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const handleClear = async () => {
    await clearMessages(user.login.uuid);
    setMessages([]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#1a1a2e" />
        </TouchableOpacity>

        <Image source={{ uri: user.picture.thumbnail }} style={styles.avatar} />

        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{fullName}</Text>
          <Text style={styles.headerSub}>@{user.login.username}</Text>
        </View>

        <TouchableOpacity onPress={handleClear} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="trash-outline" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      <FlashList
        ref={listRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => <MessageBubble message={item} index={index} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Diga olá para {user.name.first}!</Text>
          </View>
        }
        contentContainerStyle={{ paddingVertical: 16 }}
      />

      {/* Input */}
      <ChatInput value={input} onChangeText={setInput} onSend={handleSend} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: '#f4f6fb' },
  header:          { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: Platform.OS === 'ios' ? 56 : 16, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', gap: 10 },
  backBtn:         { marginRight: 4 },
  avatar:          { width: 40, height: 40, borderRadius: 20 },
  headerInfo:      { flex: 1 },
  headerName:      { fontSize: 16, fontWeight: '700', color: '#1a1a2e' },
  headerSub:       { fontSize: 12, color: '#aaa' },
  emptyContainer:  { flex: 1, alignItems: 'center', marginTop: 100 },
  emptyText:       { fontSize: 16, color: '#bbb' },
});