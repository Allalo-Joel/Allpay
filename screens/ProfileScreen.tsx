import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      {/* Placeholder for user details and settings */}
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Profile details here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, color: '#2c3e50' },
  placeholder: { flex: 1, backgroundColor: 'white', borderRadius: 8, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  placeholderText: { color: '#95a5a6' },
});