import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, User } from '../types';
import { useFavorites } from '../hooks/useFavorites';
import UserCard from '../components/list/UserCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Favorites'>;

export default function FavoritesScreen({ navigation }: Props) {
  const { favorites, loadFavorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => { loadFavorites(); }, []);

  const handlePress = (user: User) => navigation.navigate('Profile', { user });

  return (
    <View style={styles.container}>
      <FlashList
        data={favorites}
        keyExtractor={item => item.login.uuid}
        renderItem={({ item, index }) => (
          <UserCard
            user={item}
            index={index}
            isFavorite={isFavorite(item.login.uuid)}
            onPress={() => handlePress(item)}
            onFavorite={() => toggleFavorite(item)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🤍</Text>
            <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
            <Text style={styles.emptySub}>Toque no coração de um usuário para salvar aqui</Text>
          </View>
        }
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#f4f6fb' },
  empty:       { alignItems: 'center', marginTop: 100, paddingHorizontal: 40 },
  emptyEmoji:  { fontSize: 52, marginBottom: 16 },
  emptyTitle:  { fontSize: 18, fontWeight: '700', color: '#1a1a2e', marginBottom: 8 },
  emptySub:    { fontSize: 14, color: '#aaa', textAlign: 'center', lineHeight: 20 },
});