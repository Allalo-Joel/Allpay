import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getUserProfileAndBalance } from '../utils/user';

type RootStackParamList = {
  Home: undefined;
  Wallet: undefined;
  Scan: undefined;
  Transfer: undefined;
  Profile: undefined;
};

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [userName, setUserName] = useState('');
  const [balance, setBalance] = useState('0.00');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userInfo = await getUserProfileAndBalance();
      if (userInfo) {
        setUserName(userInfo.name);
        setBalance(userInfo.balance);
      }
    };
    fetchUserData();
  }, []);

  const menuItems = [
    { name: 'Bus', icon: 'bus-outline', route: 'Wallet' },
    { name: 'Taxis', icon: 'car-sport-outline', route: 'Transfer' },
    { name: 'Loisirs', icon: 'ribbon-outline', route: 'Profile' },
    { name: 'Facture', icon: 'wallet-outline', route: 'Wallet' },
    { name: 'Pharmacie', icon: 'storefront-outline', route: 'Wallet' },
    { name: 'Ticket', icon: 'create-outline', route: 'Wallet' },
    { name: 'Document', icon: 'document-outline', route: 'Scan' },
    { name: 'Urgence', icon: 'remove-circle-outline', route: 'Wallet' },
  ];

  const additionalFeatures = [
    { name: 'Assurance', icon: 'shield-checkmark-outline', route: 'Wallet' },
    { name: 'Éducation', icon: 'school-outline', route: 'Wallet' },
    { name: 'Santé', icon: 'medkit-outline', route: 'Wallet' },
    { name: 'Shopping', icon: 'cart-outline', route: 'Wallet' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={styles.banner}>
        {/* Top Bar: Person | Search | Notification */}
        <View style={styles.bannerHeader}>
          <Ionicons name="person-circle-outline" size={32} color="#fff" onPress={() => navigation.navigate('Profile')}/>
          
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={18} color="#555" />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </View>

        {/* Balance and User Name */}
        <Text style={styles.balanceLabel}>Balance (fcfa)</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceValue}>{balance}</Text>
          <Text style={styles.username}>{userName}</Text>
        </View>
      </View>

      {/* Menu Items */}
       <Text style={styles.sectionHeader}> Services</Text>
      <View style={styles.grid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={styles.menuCard}
            onPress={() => navigation.navigate(item.route as any)}
          >
            <View style={styles.iconCircle}>
              <Ionicons name={item.icon} size={29} color="#FB512D" />
            </View>
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Additional Features */}
      <Text style={styles.sectionHeader}>More Services</Text>
      <View style={styles.grid}>
        {additionalFeatures.map((feature) => (
          <TouchableOpacity
            key={feature.name}
            style={styles.menuCard}
            onPress={() => navigation.navigate(feature.route as any)}
          >
            <View style={styles.iconCircle}>
              <Ionicons name={feature.icon} size={29} color="#FB512D" />
            </View>
            <Text style={styles.menuText}>{feature.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 60) / 4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  banner: {
    backgroundColor: '#FB512D',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 16,
    paddingTop: 50,
  },
  bannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 25,
    marginHorizontal: 12,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingLeft: 8,
    color: '#333',
  },
  balanceLabel: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  balanceValue: {
    color: '#fff',
    fontSize: 27,
    fontWeight: 'bold',
  },
  username: {
    color: '#ffe9e1',
    fontSize: 18,
    fontWeight: '900',
  },
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
  menuText: {
    marginTop: 8,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 16,
    marginTop: 30,
    marginBottom: 10,
  },
});
