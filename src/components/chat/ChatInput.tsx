import { useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
}

export default function ChatInput({ value, onSend, onChangeText }: Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleSend = () => {
    if (!value.trim()) return;
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 0.85, speed: 50, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, speed: 50, useNativeDriver: true }),
    ]).start();
    onSend();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Digite uma mensagem..."
        placeholderTextColor="#bbb"
        multiline
        returnKeyType="send"
        onSubmitEditing={handleSend}
      />
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={[styles.sendBtn, !value.trim() && styles.sendBtnDisabled]}
          onPress={handleSend}
          disabled={!value.trim()}
        >
          <Ionicons name="send" size={18} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:      { flexDirection: 'row', alignItems: 'flex-end', backgroundColor: '#fff', padding: 10, paddingHorizontal: 16, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  input:          { flex: 1, backgroundColor: '#f4f4f8', borderRadius: 22, paddingHorizontal: 16, paddingVertical: 10, fontSize: 15, color: '#1a1a2e', maxHeight: 100, marginRight: 10 },
  sendBtn:        { width: 44, height: 44, borderRadius: 22, backgroundColor: '#6c63ff', justifyContent: 'center', alignItems: 'center', shadowColor: '#6c63ff', shadowOpacity: 0.3, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
  sendBtnDisabled:{ backgroundColor: '#e0e0e0' },
});