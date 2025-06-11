import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useWallet, Transaction } from '../src/context/WalletContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function WalletScreen() {
  const { balance, transactions } = useWallet();
  const actions = [
    { name: 'Recharge', icon: 'add-circle-outline' },
    { name: 'Withdraw', icon: 'remove-circle-outline' },
    { name: 'Bill', icon: 'list-outline' },
    { name: 'Transfer', icon: 'send-outline' },
  ];

  const renderItem = ({ item }: { item: Transaction }) => {
    const isPositive = item.amount >= 0;
    return (
      <View style={styles.transactionItem}>
        <View style={styles.txInfo}>
          <Text style={styles.txDesc}>{item.description}</Text>
          <Text style={styles.txDate}>{new Date(item.date).toLocaleString()}</Text>
        </View>
        <Text style={[styles.txAmount, { color: isPositive ? '#2ecc71' : '#e74c3c' }]}>${item.amount.toFixed(2)}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={styles.banner}>
        <Text style={styles.bannerLabel}>余额 (¥)</Text>
        <Text style={styles.bannerValue}>{balance.toFixed(2)}</Text>
      </View>
      <View style={styles.actionGrid}>
        {actions.map(act => (
          <TouchableOpacity key={act.name} style={styles.actionCard}>
            <Ionicons name={act.icon} size={28} color="#108EE9" />
            <Text style={styles.actionText}>{act.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.historyTitle}>账单</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>暂无记录</Text>}
      />
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 80) / 4;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  banner: {
    backgroundColor: '#108EE9',
    paddingVertical: 30,
    alignItems: 'center',
  },
  bannerLabel: { color: '#fff', fontSize: 14 },
  bannerValue: { color: '#fff', fontSize: 36, fontWeight: 'bold', marginTop: 4 },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginVertical: 8,
  },
  actionCard: { alignItems: 'center', width: CARD_SIZE },
  actionText: { marginTop: 6, fontSize: 12, color: '#333' },
  historyTitle: { fontSize: 18, fontWeight: '600', marginLeft: 16, marginVertical: 8, color: '#34495e' },
  list: { paddingHorizontal: 16 },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  txInfo: { flex: 1 },
  txDesc: { fontSize: 14, color: '#2c3e50' },
  txDate: { fontSize: 12, color: '#7f8c8d', marginTop: 4 },
  txAmount: { fontSize: 16, fontWeight: 'bold', alignSelf: 'center' },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#95a5a6' },
});