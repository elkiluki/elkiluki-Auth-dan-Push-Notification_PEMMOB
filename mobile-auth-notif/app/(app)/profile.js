import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { getMe } from '../../services/authService';

export default function ProfileScreen() {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getMe(token).then(setProfile).catch(console.error);
  }, [token]);

  if (!profile) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#2563EB" />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{profile.nama?.charAt(0).toUpperCase()}</Text>
        </View>

        <Text style={styles.name}>{profile.nama}</Text>
        <Text style={styles.email}>{profile.email}</Text>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>User ID</Text>
          <Text style={styles.infoValue}>#{profile.id}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Status Sesi</Text>
          <Text style={styles.badgeText}>JWT Valid 🟢</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Kembali ke Dashboard</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FB', padding: 24, justifyContent: 'center' },
  card: { backgroundColor: '#FFFFFF', padding: 28, borderRadius: 20, alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12 },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#DBEAFE', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  avatarText: { fontSize: 30, fontWeight: '800', color: '#1D4ED8' },
  name: { fontSize: 22, fontWeight: '800', color: '#1E293B', marginBottom: 4 },
  email: { fontSize: 14, color: '#64748B', marginBottom: 20 },
  divider: { width: '100%', height: 1, backgroundColor: '#E2E8F0', marginBottom: 16 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingVertical: 8 },
  infoLabel: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  infoValue: { fontSize: 14, color: '#1E293B', fontWeight: '700' },
  badgeText: { fontSize: 13, color: '#16A34A', fontWeight: '700' },
  backButton: { marginTop: 20, padding: 14, alignItems: 'center' },
  backButtonText: { color: '#2563EB', fontWeight: '700', fontSize: 15 }
});