import { useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

export default function SearchBar({ value, onChangeText, onClear }: Props) {
  const clearOpacity = useRef(new Animated.Value(0)).current;
  const clearScale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(clearOpacity, {
        toValue: value.length > 0 ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(clearScale, {
        toValue: value.length > 0 ? 1 : 0.5,
        useNativeDriver: true,
        speed: 50,
      }),
    ]).start();
  }, [value]);

  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={18} color="#999" style={styles.icon} />

      <TextInput
        style={styles.input}
        placeholder="Buscar por nome..."
        placeholderTextColor="#bbb"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        autoCorrect={false}
      />

      <Animated.View style={{ opacity: clearOpacity, transform: [{ scale: clearScale }] }}>
        <TouchableOpacity onPress={onClear} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="close-circle" size={18} color="#bbb" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f8',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1a1a2e',
  },
});