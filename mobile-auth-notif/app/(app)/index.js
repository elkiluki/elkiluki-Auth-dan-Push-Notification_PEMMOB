import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, Image } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { getExpoPushToken } from '../../utils/notifications';
import { simpanPushToken, kirimNotifikasiUji } from '../../services/notificationsService';

export default function HomeScreen() {
  const { user, token, signOut } = useAuth();

  async function aktifkanNotifikasi() {
    try {
      const expoPushToken = await getExpoPushToken();
      await simpanPushToken(token, expoPushToken);
      Alert.alert('Berhasil', 'Perangkat terdaftar untuk notifikasi');
    } catch (e) {
      Alert.alert('Notifikasi', e.message);
    }
  }

  async function testNotifikasi() {
    try {
      const data = await kirimNotifikasiUji(token);
      Alert.alert('Server', data.pesan);
    } catch (e) {
      Alert.alert('Gagal', e.message);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerCard}>

        <Image 
          source={require('../../assets/images/aku1.png')} 
          style={styles.fotoProfil} 
        />

        <Text style={styles.greeting}>Halo, {user?.nama} 👋</Text>
        <Text style={styles.subtitle}>Selamat datang di dashboard utama.</Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/profile')}>
          <Text style={styles.primaryButtonText}>Lihat Profil Pengguna</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={aktifkanNotifikasi}>
          <Text style={styles.secondaryButtonText}>🔔 Aktifkan Push Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={testNotifikasi}>
          <Text style={styles.secondaryButtonText}>🚀 Kirim Notifikasi Uji</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dangerButton} onPress={signOut}>
          <Text style={styles.dangerButtonText}>Keluar Akun</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F4F7FB', 
    padding: 24, 
    justifyContent: 'center' 
  },
  headerCard: { 
    backgroundColor: '#FFFFFF', 
    padding: 24, 
    borderRadius: 16, 
    marginBottom: 32, 
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 12 
  },
  greeting: { 
    fontSize: 24, 
    fontWeight: '800', 
    color: '#1E293B', 
    marginBottom: 8 
  },
  subtitle: { 
    fontSize: 15, 
    color: '#64748B', 
    lineHeight: 22 
  },
  actionContainer: { 
    gap: 16 
  },
  primaryButton: { 
    backgroundColor: '#2563EB', 
    padding: 16, 
    borderRadius: 12, 
    alignItems: 'center' 
  },
  primaryButtonText: { 
    color: '#FFFFFF', 
    fontWeight: '700', 
    fontSize: 16 
  },
  secondaryButton: { 
    backgroundColor: '#DBEAFE', 
    padding: 16, 
    borderRadius: 12, 
    alignItems: 'center' 
  },
  secondaryButtonText: { 
    color: '#1D4ED8', 
    fontWeight: '700', 
    fontSize: 16 
  },
  dangerButton: { 
    backgroundColor: '#FEE2E2', 
    padding: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 8 
  },
  dangerButtonText: { 
    color: '#DC2626', 
    fontWeight: '700', 
    fontSize: 16 
  },
  fotoProfil: {
    width: 100,
    height: 100,
    borderRadius: 50, // Membuat foto menjadi bulat sempurna
    alignSelf: 'center', // Posisikan di tengah
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#2563EB', // Bingkai biru senada dengan tema aplikasi
  }
});
