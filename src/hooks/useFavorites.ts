import { useState, useCallback } from 'react';
import { User } from '../types';
import {
  getFavorites,
  toggleFavorite as toggleStorage,
  isFavorite as checkFavorite,
} from '../storage/favoritesStorage';

export function useFavorites() {
  const [favorites, setFavorites] = useState<User[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  const loadFavorites = useCallback(async () => {
    const data = await getFavorites();
    setFavorites(data);
    setFavoriteIds(new Set(data.map(u => u.login.uuid)));
  }, []);

  const toggleFavorite = useCallback(async (user: User) => {
    const updated = await toggleStorage(user);
    setFavorites(updated);
    setFavoriteIds(new Set(updated.map(u => u.login.uuid)));
  }, []);

  const isFavorite = useCallback(
    (uuid: string) => favoriteIds.has(uuid),
    [favoriteIds]
  );

  return { favorites, loadFavorites, toggleFavorite, isFavorite };
}