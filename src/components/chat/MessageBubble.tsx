import { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Message } from '../../types';

interface Props {
  message: Message;
  index: number;
}

export default function MessageBubble({ message, index }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, tension: 80, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.wrapper, { opacity, transform: [{ translateY }] }]}>
      <View style={styles.bubble}>
        <Text style={styles.text}>{message.text}</Text>
      </View>
      <Text style={styles.time}>{message.time}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'flex-end', marginBottom: 12, marginHorizontal: 16 },
  bubble:  { backgroundColor: '#6c63ff', borderRadius: 18, borderBottomRightRadius: 4, paddingHorizontal: 14, paddingVertical: 10, maxWidth: '80%', shadowColor: '#6c63ff', shadowOpacity: 0.2, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  text:    { color: '#fff', fontSize: 15, lineHeight: 21 },
  time:    { fontSize: 11, color: '#bbb', marginTop: 4, marginRight: 4 },
});