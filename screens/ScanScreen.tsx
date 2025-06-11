import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ScanScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>扫一扫</Text>
      {/* TODO: Implement camera scan view */}
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>相机视图准备中</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5', justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, color: '#108EE9' },
  placeholder: { width: '80%', height: 300, backgroundColor: '#ecf0f1', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  placeholderText: { color: '#95a5a6' },
});