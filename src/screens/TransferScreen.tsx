import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const TransferScreen = ({ route }) => {
  const { userId, txType } = route.params;

  const handleSend = () => {
    Alert.alert('Payment Sent', `To: ${userId}\nType: ${txType}`);
    // Add real logic here (e.g. call API or Supabase)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recipient ID:</Text>
      <Text style={styles.value}>{userId}</Text>

      <Text style={styles.label}>Transaction Type:</Text>
      <Text style={styles.value}>{txType}</Text>

      <Text style={styles.label}>Amount:</Text>
      <TextInput style={styles.input} keyboardType="numeric" placeholder="Enter amount" />

      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Confirm Transfer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransferScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
  label: { fontSize: 16, color: '#555', marginTop: 20 },
  value: { fontSize: 18, fontWeight: 'bold', color: '#222', marginTop: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#FB512D',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
