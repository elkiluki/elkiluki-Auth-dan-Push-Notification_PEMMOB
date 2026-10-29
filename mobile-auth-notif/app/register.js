import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { registerUser } from '../services/authService';

export default function RegisterScreen() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!nama || !email || !password) {
      Alert.alert('Peringatan', 'Semua bidang wajib diisi');
      return;
    }
    try {
      setLoading(true);
      await registerUser(nama, email, password);
      Alert.alert('Berhasil', 'Akun berhasil dibuat. Silakan login.', [
        { text: 'OK', onPress: () => router.replace('/sign-in') }
      ]);
    } catch (e) {
      Alert.alert('Registrasi gagal', e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Buat Akun Baru ✨</Text>
        <Text style={styles.subtitle}>Daftar untuk mulai menggunakan aplikasi</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nama Lengkap</Text>
          <TextInput style={styles.input} placeholder="Nama kamu" placeholderTextColor="#94A3B8" value={nama} onChangeText={setNama} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="nama@email.com" placeholderTextColor="#94A3B8" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} placeholder="Min. 8 karakter" placeholderTextColor="#94A3B8" secureTextEntry value={password} onChangeText={setPassword} />
        </View>

        <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleRegister} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Memproses...' : 'Daftar Sekarang'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Sudah punya akun? <Text style={styles.linkBold}>Login</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FB', justifyContent: 'center', padding: 24 },
  card: { backgroundColor: '#FFFFFF', padding: 28, borderRadius: 20, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12 },
  title: { fontSize: 26, fontWeight: '800', color: '#1E293B', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#64748B', marginBottom: 20 },
  inputContainer: { marginBottom: 14 },
  label: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 6 },
  input: { borderWidth: 1.5, borderColor: '#E2E8F0', padding: 14, borderRadius: 12, fontSize: 15, color: '#0F172A', backgroundColor: '#F8FAFC' },
  button: { backgroundColor: '#2563EB', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  buttonDisabled: { backgroundColor: '#93C5FD' },
  buttonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  backButton: { marginTop: 18, alignItems: 'center' },
  backButtonText: { color: '#64748B', fontSize: 14 },
  linkBold: { color: '#2563EB', fontWeight: '700' },
});
