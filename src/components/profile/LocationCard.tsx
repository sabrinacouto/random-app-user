import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LocationCardProps {
  city: string;
  state: string;
  country: string;
  postcode: string | number;
  timezone: { offset: string; description: string };
  coordinates: { latitude: string; longitude: string };
}

export default function LocationCard({ city, state, country, postcode, timezone, coordinates }: LocationCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <Ionicons name="location" size={20} color="#6c63ff" />
        </View>
        <View>
          <Text style={styles.city}>{city}, {state}</Text>
          <Text style={styles.country}>{country} — CEP {postcode}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={styles.info}>
          <Ionicons name="time-outline" size={14} color="#aaa" />
          <Text style={styles.infoLabel}>Fuso Horário</Text>
          <Text style={styles.infoValue}>{timezone.offset}</Text>
          <Text style={styles.infoSub} numberOfLines={1}>{timezone.description}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.info}>
          <Ionicons name="navigate-outline" size={14} color="#aaa" />
          <Text style={styles.infoLabel}>Coordenadas</Text>
          <Text style={styles.infoValue}>{parseFloat(coordinates.latitude).toFixed(4)}</Text>
          <Text style={styles.infoValue}>{parseFloat(coordinates.longitude).toFixed(4)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f0efff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  city:    { fontSize: 16, fontWeight: '700', color: '#1a1a2e' },
  country: { fontSize: 13, color: '#aaa', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#f4f4f8', marginVertical: 14 },
  row:     { flexDirection: 'row' },
  separator: { width: 1, backgroundColor: '#f4f4f8', marginHorizontal: 16 },
  info:    { flex: 1, gap: 4 },
  infoLabel: { fontSize: 11, color: '#aaa', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 },
  infoValue: { fontSize: 13, fontWeight: '600', color: '#1a1a2e' },
  infoSub:   { fontSize: 11, color: '#aaa' },
});