import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useWallet } from '../src/context/WalletContext';
import { toast } from 'sonner-native';

export default function TransferScreen() {
  const { sendMoney } = useWallet();
  const [to, setTo] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const handleSend = () => {
    const amt = parseFloat(amount);
    if (!to.trim() || isNaN(amt)) {
      toast.error('Please enter valid recipient and amount');
      return;
    }
    const success = sendMoney(to, amt);
    if (success) {
      toast.success(`Sent $${amt.toFixed(2)} to ${to}`);
      setTo('');
      setAmount('');
    } else {
      toast.error('Insufficient balance or invalid amount');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <Text style={styles.title}>转账</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>收款方</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter recipient"
          value={to}
          onChangeText={setTo}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>金额 (¥)</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>确认转账</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#108EE9',
    marginBottom: 24,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: '#108EE9',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});