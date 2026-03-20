import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

const KEY = 'favorites';

export const getFavorites = async (): Promise<User[]> => {
  try {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const toggleFavorite = async (user: User): Promise<User[]> => {
  try {
    const current = await getFavorites();
    const exists = current.some(u => u.login.uuid === user.login.uuid);
    const updated = exists
      ? current.filter(u => u.login.uuid !== user.login.uuid)
      : [...current, user];
    await AsyncStorage.setItem(KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};

export const isFavorite = async (uuid: string): Promise<boolean> => {
  try {
    const current = await getFavorites();
    return current.some(u => u.login.uuid === uuid);
  } catch {
    return false;
  }
};