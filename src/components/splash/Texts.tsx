import { View, Text, StyleSheet, Animated } from 'react-native';

interface Props {
  opacity: Animated.Value;
  translateY: Animated.Value;
}

export default function Texts({ opacity, translateY }: Props) {
  return (
    <Animated.View style={[styles.wrapper, { opacity, transform: [{ translateY }] }]}>
      <Text style={styles.title}>People App</Text>
      <Text style={styles.subtitle}>Explore pessoas ao redor do mundo</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper:  { alignItems: 'center' },
  title:    { fontSize: 28, fontWeight: '800', color: '#1a1a2e', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: '#999', marginTop: 6, letterSpacing: 0.2 },
});