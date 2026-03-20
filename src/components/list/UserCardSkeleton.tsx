import { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export default function UserCardSkeleton() {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.card, { opacity }]}>
   
      <View style={styles.avatar} />


      <View style={styles.info}>
        <View style={[styles.line, { width: '60%' }]} />
        <View style={[styles.line, { width: '40%' }]} />
        <View style={[styles.line, { width: '80%' }]} />
      </View>

      <View style={styles.heart} />
    </Animated.View>
  );
}

export function SkeletonList() {
  return (
    <View style={styles.list}>
      {Array.from({ length: 8 }).map((_, i) => (
        <UserCardSkeleton key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 10,
    gap: 10,
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e8e8e8',
  },
  info: {
    flex: 1,
    marginLeft: 14,
    gap: 8,
  },
  line: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e8e8e8',
  },
  heart: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#e8e8e8',
  },
});