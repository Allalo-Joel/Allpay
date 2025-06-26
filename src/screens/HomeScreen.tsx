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
        <View style={styles.bannerHeader}>
          <Ionicons
            name="person-circle-outline"
            size={32}
            color="#fff"
            onPress={() => navigation.navigate('Profile')}
          />

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

        <Text style={styles.balanceLabel}>Balance (fcfa)</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceValue}>{balance}</Text>
          <Text style={styles.username}>{userName}</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Services</Text>
      <View style={styles.serviceSection}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={styles.serviceCard}
            onPress={() => navigation.navigate(item.route as any)}
            activeOpacity={0.8}
          >
            <View style={styles.serviceIcon}>
              <Ionicons name={item.icon} size={30} color="#FB512D" />
            </View>
            <Text style={styles.serviceText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionHeader}>More Services</Text>
      <View style={styles.serviceSection}>
        {additionalFeatures.map((feature) => (
          <TouchableOpacity
            key={feature.name}
            style={styles.serviceCard}
            onPress={() => navigation.navigate(feature.route as any)}
            activeOpacity={0.8}
          >
            <View style={styles.serviceIcon}>
              <Ionicons name={feature.icon} size={30} color="#FB512D" />
            </View>
            <Text style={styles.serviceText}>{feature.name}</Text>
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
    paddingTop: 40,
  },
  bannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 25,
    width: '65%',
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
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 16,
    marginTop: 30,
    marginBottom: 10,
  },
  serviceSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 12,
  },
  serviceCard: {
    width: CARD_SIZE,
    height: CARD_SIZE + 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFE5DE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
});
