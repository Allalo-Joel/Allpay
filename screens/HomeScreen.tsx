import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Define navigation param list
type RootStackParamList = {
  Home: undefined;
  Wallet: undefined;
  Scan: undefined;
  Transfer: undefined;
  Profile: undefined;
};

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const menuItems = [
    { name: '余额', icon: 'wallet-outline', route: 'Wallet' },
    { name: '扫一扫', icon: 'scan-outline', route: 'Scan' },
    { name: '转账', icon: 'send-outline', route: 'Transfer' },
    { name: '我的', icon: 'person-outline', route: 'Profile' },
  ];
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={styles.banner}>
        <View style={styles.bannerHeader}>
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
          <Text style={styles.bannerGreeting}>Hi, User</Text>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </View>
        <Text style={styles.balanceLabel}>Balance (¥)</Text>
        <Text style={styles.balanceValue}>10,250.00</Text>
      </View>
      <View style={styles.grid}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.name}
            style={styles.menuCard}
            onPress={() => navigation.navigate(item.route as any)}
          >
            <View style={styles.iconCircle}>
              <Ionicons name={item.icon} size={24} color="#108EE9" />
            </View>
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 60) / 4;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  banner: {
    backgroundColor: '#108EE9',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 16,
    paddingTop: 40,
  },
  bannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerGreeting: { color: '#fff', fontSize: 18, fontWeight: '600' },
  balanceLabel: { color: '#fff', fontSize: 14 },
  balanceValue: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginTop: 4 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  menuCard: {
    width: CARD_SIZE,
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuText: { marginTop: 8, fontSize: 12, color: '#333' },
});