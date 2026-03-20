import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroupProps {
  label: string;
  options: FilterOption[];
  selected: string;
  onSelect: (value: string) => void;
}

function FilterGroup({ label, options, selected, onSelect }: FilterGroupProps) {
  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {options.map(opt => (
          <TouchableOpacity
            key={opt.value}
            style={[styles.chip, selected === opt.value && styles.chipActive]}
            onPress={() => onSelect(opt.value)}
          >
            <Text style={[styles.chipText, selected === opt.value && styles.chipTextActive]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

interface FilterBarProps {
  gender: string;
  nat: string;
  onGenderChange: (value: string) => void;
  onNatChange: (value: string) => void;
}

export default function FilterBar({ gender, nat, onGenderChange, onNatChange }: FilterBarProps) {
  const genders: FilterOption[] = [
    { label: '👥 Todos', value: '' },
    { label: '👨 Masculino', value: 'male' },
    { label: '👩 Feminino', value: 'female' },
  ];

  const nats: FilterOption[] = [
    { label: '🌍 Todos', value: '' },
    { label: '🇧🇷 BR', value: 'BR' },
    { label: '🇺🇸 US', value: 'US' },
    { label: '🇬🇧 GB', value: 'GB' },
    { label: '🇦🇺 AU', value: 'AU' },
  ];

  return (
    <View style={styles.container}>
      <FilterGroup label="Gênero" options={genders} selected={gender} onSelect={onGenderChange} />
      <FilterGroup label="Nacionalidade" options={nats} selected={nat} onSelect={onNatChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:       { backgroundColor: '#fff', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  group:           { marginBottom: 6 },
  label:           { fontSize: 11, fontWeight: '700', color: '#aaa', textTransform: 'uppercase', letterSpacing: 0.8, marginLeft: 16, marginBottom: 6 },
  row:             { paddingHorizontal: 16, gap: 8 },
  chip:            { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: '#f4f4f8' },
  chipActive:      { backgroundColor: '#6c63ff' },
  chipText:        { fontSize: 13, color: '#555', fontWeight: '500' },
  chipTextActive:  { color: '#fff', fontWeight: '700' },
});