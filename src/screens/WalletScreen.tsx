import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useWallet, Transaction } from '../context/WalletContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QRCode from 'react-native-qrcode-svg';
import { useUser } from '../utils/transaction';
import logoImage from '../assets/logo2.png';

export default function WalletScreen() {
  const { balance, transactions } = useWallet();
  const { user } = useUser();

  const actions = [
    { name: 'Recharge', icon: 'add-circle-outline' },
    { name: 'Withdraw', icon: 'remove-circle-outline' },
    { name: 'Bill', icon: 'list-outline' },
    { name: 'Transfer', icon: 'send-outline' },
  ];

  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.txInfo}>
        <Text style={styles.txDesc}>{item.description}</Text>
        <Text style={styles.txDate}>{new Date(item.date).toLocaleString()}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 40 }}
      ListEmptyComponent={
        <Text style={styles.emptyText}>Aucune transaction</Text>
      }
      ListHeaderComponent={
        <>
          <View style={styles.banner}>
            <Text style={styles.bannerLabel}></Text>
            <View style={styles.qrSection}>
              <View style={styles.qrWrapper}>
                <QRCode
                  value={JSON.stringify({
                    id: user?.id || 'unknown-user',
                    type: 'Receive',
                  })}
                  size={120}
                  logo={logoImage}
                  logoSize={30}
                  logoBackgroundColor="transparent"
                />
              </View>
              <Text style={styles.qrLabel}>Scan to Send Money</Text>
            </View>
          </View>

          <View style={styles.actionGrid}>
            {actions.map((act) => (
              <TouchableOpacity key={act.name} style={styles.actionCard}>
                <Ionicons name={act.icon} size={28} color="#FB512D" />
                <Text style={styles.actionText}>{act.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.historyTitle}>Transactions</Text>
        </>
      }
    />
  );
}

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 80) / 4;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  banner: {
    backgroundColor: '#FB512D',
    paddingVertical: 30,
    alignItems: 'center',
  },
  bannerLabel: { color: '#fff', fontSize: 20, marginTop: 30 },
  bannerValue: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 4,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginVertical: 8,
  },
  actionCard: { alignItems: 'center', width: CARD_SIZE },
  actionText: { marginTop: 6, fontSize: 12, color: '#333' },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
    marginVertical: 8,
    color: '#34495e',
  },
  list: { paddingHorizontal: 16 },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  txInfo: { flex: 1 },
  txDesc: { fontSize: 14, color: '#2c3e50' },
  txDate: { fontSize: 12, color: '#7f8c8d', marginTop: 4 },
  txAmount: { fontSize: 16, fontWeight: 'bold', alignSelf: 'center' },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#95a5a6',
    fontSize: 14,
  },
  qrSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  qrWrapper: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  qrLabel: {
    marginTop: 10,
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
});
