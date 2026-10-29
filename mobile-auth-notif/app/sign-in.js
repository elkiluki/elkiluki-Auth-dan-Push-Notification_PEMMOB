import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function SignInScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Peringatan', 'Email dan password wajib diisi');
      return;
    }
    try {
      setLoading(true);
      await signIn(email, password);
    } catch (e) {
      Alert.alert('Login gagal', e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        
        {/* Komponen Logo UINSA */}
        <Image 
          source={require('../assets/images/logo-uinsa.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />

        <Text style={styles.title}>Selamat Datang! 👋</Text>
        <Text style={styles.subtitle}>Masuk ke akunmu untuk melanjutkan</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="nama@email.com"
            placeholderTextColor="#94A3B8"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan password"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Memproses...' : 'Masuk'}</Text>
        </TouchableOpacity>

        <Link href="/register" style={styles.link}>
          Belum punya akun? <Text style={styles.linkBold}>Daftar di sini</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FB', justifyContent: 'center', padding: 24 },
  card: { backgroundColor: '#FFFFFF', padding: 28, borderRadius: 20, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12 },
  
  /* Styling untuk Logo */
  logo: { width: 120, height: 120, alignSelf: 'center', marginBottom: 16 },
  
  title: { fontSize: 24, fontWeight: '800', color: '#1E293B', marginBottom: 6, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#64748B', marginBottom: 24, textAlign: 'center' },
  
  inputContainer: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 6 },
  input: { borderWidth: 1.5, borderColor: '#E2E8F0', padding: 14, borderRadius: 12, fontSize: 15, color: '#0F172A', backgroundColor: '#F8FAFC' },
  button: { backgroundColor: '#2563EB', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  buttonDisabled: { backgroundColor: '#93C5FD' },
  buttonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  link: { marginTop: 20, textAlign: 'center', color: '#64748B', fontSize: 14 },
  linkBold: { color: '#2563EB', fontWeight: '700' },
});
