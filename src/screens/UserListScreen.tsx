import { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, User } from '../types';
import { useUsers } from '../hooks/useUsers';
import { useFavorites } from '../hooks/useFavorites';
import UserCard from '../components/list/UserCard';
import { SkeletonList } from '../components/list/UserCardSkeleton';
import SearchBar from '../components/list/SearchBar';
import FilterBar from '../components/list/FilterBar';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

export default function UserListScreen({ navigation }: Props) {
  const [gender, setGender] = useState('');
  const [nat, setNat] = useState('');
  const [search, setSearch] = useState('');

  const { users, loading, refreshing, error, refresh, loadMore, reset } = useUsers({ gender, nat });
  const { loadFavorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => { reset(); }, [gender, nat]);

  useEffect(() => { loadFavorites(); }, []);


  const filtered = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter(u =>
      `${u.name.first} ${u.name.last}`.toLowerCase().includes(q)
    );
  }, [users, search]);

  const handlePress = (user: User) => navigation.navigate('Profile', { user });

  if (loading && users.length === 0) return <SkeletonList />;

  return (
    <View style={styles.container}>
      <FilterBar
        gender={gender}
        nat={nat}
        onGenderChange={setGender}
        onNatChange={setNat}
      />

      <SearchBar
        value={search}
        onChangeText={setSearch}
        onClear={() => setSearch('')}
      />

      {error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={reset}>
            <Text style={styles.retryText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlashList
          data={filtered}
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
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor="#6c63ff" />}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {search ? 'Nenhum resultado para essa busca.' : 'Nenhum usuário encontrado.'}
            </Text>
          }
          contentContainerStyle={{ paddingTop: 4, paddingBottom: 30 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#f4f6fb' },
  center:      { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  errorText:   { color: '#e74c3c', fontSize: 15, textAlign: 'center', marginBottom: 16 },
  retryBtn:    { backgroundColor: '#6c63ff', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8 },
  retryText:   { color: '#fff', fontWeight: '600' },
  emptyText:   { textAlign: 'center', marginTop: 60, color: '#aaa', fontSize: 15 },
});