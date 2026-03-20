import { View, Text, StyleSheet } from 'react-native';

interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function InfoSection({ title, children }: InfoSectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 24, marginHorizontal: 16 },
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6c63ff',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});