import { View, Text, StyleSheet, Animated } from 'react-native';

interface Props {
  scale: Animated.Value;
  opacity: Animated.Value;
}

export default function Logo({ scale, opacity }: Props) {
  return (
    <Animated.View style={{ opacity, transform: [{ scale }] }}>
      <View style={styles.circle}>
        <Text style={styles.emoji}>👥</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    borderRadius: 32,
    backgroundColor: '#f4f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6c63ff',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  emoji: { fontSize: 44 },
});