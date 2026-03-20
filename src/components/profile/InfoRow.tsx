import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InfoRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  onPress?: () => void;
}

export default function InfoRow({ icon, label, value, onPress }: InfoRowProps) {
  const content = (
    <View style={styles.row}>
      <View style={styles.iconWrapper}>
        <Ionicons name={icon} size={18} color="#6c63ff" />
      </View>
      <View style={styles.text}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, onPress && styles.link]} numberOfLines={2}>
          {value}
        </Text>
      </View>
      {onPress && <Ionicons name="chevron-forward" size={16} color="#ccc" />}
    </View>
  );

  return onPress
    ? <TouchableOpacity onPress={onPress} activeOpacity={0.7}>{content}</TouchableOpacity>
    : content;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f8',
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f0efff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  text:  { flex: 1 },
  label: { fontSize: 11, color: '#aaa', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  value: { fontSize: 14, color: '#1a1a2e', marginTop: 2, fontWeight: '500' },
  link:  { color: '#6c63ff' },
});