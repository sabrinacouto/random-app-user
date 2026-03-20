import { useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';

interface Props {
  opacity: Animated.Value;
}

export default function DotsLoader({ opacity }: Props) {
  const dots = [
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
  ];

  useEffect(() => {
    dots.forEach((dot, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 200),
          Animated.timing(dot, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0.3, duration: 300, useNativeDriver: true }),
          Animated.delay(600),
        ])
      ).start()
    );
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      {dots.map((dot, i) => (
        <Animated.View key={i} style={[styles.dot, { opacity: dot }]} />
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'absolute', bottom: 60, flexDirection: 'row', gap: 8 },
  dot:       { width: 8, height: 8, borderRadius: 4, backgroundColor: '#6c63ff' },
});