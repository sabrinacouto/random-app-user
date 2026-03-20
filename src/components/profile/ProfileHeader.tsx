import { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { User } from '../../types';

interface ProfileHeaderProps {
  user: User;
  isFavorite: boolean;
  onFavorite: () => void;
}

export default function ProfileHeader({ user, isFavorite, onFavorite }: ProfileHeaderProps) {
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(30)).current;
  const heartScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideUp, { toValue: 0, tension: 60, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleFavorite = () => {
    Animated.sequence([
      Animated.spring(heartScale, { toValue: 1.4, speed: 50, useNativeDriver: true }),
      Animated.spring(heartScale, { toValue: 1, speed: 50, useNativeDriver: true }),
    ]).start();
    onFavorite();
  };

  const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn, transform: [{ translateY: slideUp }] }]}>
      <Image source={{ uri: user.picture.large }} style={styles.avatar} />

      <Text style={styles.name}>{fullName}</Text>
      <Text style={styles.username}>@{user.login.username}</Text>

      <View style={styles.badges}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>🎂 {user.dob.age} anos</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>🌍 {user.nat}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.favoriteBtn} onPress={handleFavorite}>
        <Animated.View style={{ transform: [{ scale: heartScale }] }}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={isFavorite ? '#ff4d6d' : '#aaa'}
          />
        </Animated.View>
        <Text style={[styles.favoriteTxt, isFavorite && { color: '#ff4d6d' }]}>
          {isFavorite ? 'Favoritado' : 'Favoritar'}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container:   { alignItems: 'center', paddingTop: 32, paddingBottom: 24, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  avatar:      { width: 110, height: 110, borderRadius: 55, borderWidth: 3, borderColor: '#f0efff' },
  name:        { fontSize: 22, fontWeight: '800', color: '#1a1a2e', marginTop: 14, letterSpacing: -0.3 },
  username:    { fontSize: 14, color: '#aaa', marginTop: 4 },
  badges:      { flexDirection: 'row', gap: 8, marginTop: 12 },
  badge:       { backgroundColor: '#f4f4f8', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  badgeText:   { fontSize: 13, color: '#555', fontWeight: '500' },
  favoriteBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 16, backgroundColor: '#f4f4f8', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  favoriteTxt: { fontSize: 14, fontWeight: '600', color: '#aaa' },
});