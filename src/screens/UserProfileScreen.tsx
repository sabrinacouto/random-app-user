import { useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, Linking } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useFavorites } from '../hooks/useFavorites';
import ProfileHeader from '../components/profile/ProfileHeader';
import InfoSection from '../components/profile/InfoSection';
import InfoRow from '../components/profile/InfoRow';
import LocationCard from '../components/profile/LocationCard';

type UserProfileProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function UserProfileScreen({ route, navigation }: UserProfileProps) {
  const { user } = route.params;
  const { loadFavorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => { loadFavorites(); }, []);

  const address = `${user.location.street.number} ${user.location.street.name}, ${user.location.city} - ${user.location.state}`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ProfileHeader
        user={user}
        isFavorite={isFavorite(user.login.uuid)}
        onFavorite={() => toggleFavorite(user)}
      />

      <InfoSection title="Contato">
        <InfoRow icon="mail-outline"           label="Email"    value={user.email}  onPress={() => Linking.openURL(`mailto:${user.email}`)} />
        <InfoRow icon="call-outline"           label="Telefone" value={user.phone}  onPress={() => Linking.openURL(`tel:${user.phone}`)} />
        <InfoRow icon="phone-portrait-outline" label="Celular"  value={user.cell}   onPress={() => Linking.openURL(`tel:${user.cell}`)} />
      </InfoSection>

      <InfoSection title="Endereço">
        <InfoRow icon="location-outline" label="Rua"    value={address} />
        <InfoRow icon="mail-outline"     label="CEP"    value={String(user.location.postcode)} />
      </InfoSection>

      <InfoSection title="Pessoal">
        <InfoRow icon="calendar-outline" label="Nascimento"    value={new Date(user.dob.date).toLocaleDateString('pt-BR')} />
        <InfoRow icon="card-outline"     label="Registro"      value={`${user.id.name}: ${user.id.value ?? 'N/A'}`} />
        <InfoRow icon="flag-outline"     label="Nacionalidade" value={user.nat} />
      </InfoSection>

      <LocationCard
        city={user.location.city}
        state={user.location.state}
        country={user.location.country}
        postcode={user.location.postcode}
        timezone={user.location.timezone}
        coordinates={user.location.coordinates}
      />

      <TouchableOpacity
        style={styles.chatBtn}
        onPress={() => navigation.navigate('Chat', { user })}
      >
        <Text style={styles.chatBtnText}>💬 Abrir Chat</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#f4f6fb' },
  content:     { paddingBottom: 40 },
  chatBtn:     { margin: 20, backgroundColor: '#6c63ff', borderRadius: 16, paddingVertical: 16, alignItems: 'center', shadowColor: '#6c63ff', shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
  chatBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});