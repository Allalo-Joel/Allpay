import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MessageScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <Text style={styles.subtitle}>No messages yet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f6fa' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#FB512D' },
  subtitle: { marginTop: 12, color: '#95a5a6' },
});
