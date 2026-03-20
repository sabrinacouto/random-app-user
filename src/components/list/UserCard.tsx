import { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { User } from '../../types';

interface Props {
  user: User;
  onPress: () => void;
  onFavorite: () => void;
  isFavorite: boolean;
  index: number;
}

export default function UserCard({ user, onPress, onFavorite, isFavorite, index }: Props) {
  const translateY = useRef(new Animated.Value(40)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const heartScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        delay: index * 60,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        tension: 80,
        friction: 10,
        delay: index * 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleFavorite = () => {
    Animated.sequence([
      Animated.spring(heartScale, { toValue: 1.4, useNativeDriver: true, speed: 50 }),
      Animated.spring(heartScale, { toValue: 1, useNativeDriver: true, speed: 50 }),
    ]).start();
    onFavorite();
  };

  const fullName = `${user.name.first} ${user.name.last}`;
  const location = `${user.location.city}, ${user.location.country}`;

  return (
    <Animated.View style={[styles.wrapper, { opacity, transform: [{ translateY }] }]}>
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
        <Image source={{ uri: user.picture.medium }} style={styles.avatar} />

        <View style={styles.info}>
          <Text style={styles.name}>{fullName}</Text>
          <View style={styles.row}>
            <Ionicons name="location-outline" size={12} color="#999" />
            <Text style={styles.sub}> {location}</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="mail-outline" size={12} color="#999" />
            <Text style={styles.sub} numberOfLines={1}> {user.email}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleFavorite} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Animated.View style={{ transform: [{ scale: heartScale }] }}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={22}
              color={isFavorite ? '#ff4d6d' : '#ccc'}
            />
          </Animated.View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginBottom: 10,
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
  },
  info: {
    flex: 1,
    marginLeft: 14,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sub: {
    fontSize: 12,
    color: '#999',
    flex: 1,
  },
});