import AsyncStorage from '@react-native-async-storage/async-storage';
import { Message } from '../types';

const getKey = (userId: string) => `chat_${userId}`;

export const getMessages = async (userId: string): Promise<Message[]> => {
  try {
    const data = await AsyncStorage.getItem(getKey(userId));
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveMessage = async (userId: string, message: Message): Promise<Message[]> => {
  try {
    const current = await getMessages(userId);
    const updated = [...current, message];
    await AsyncStorage.setItem(getKey(userId), JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};

export const clearMessages = async (userId: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(getKey(userId));
  } catch {}
};