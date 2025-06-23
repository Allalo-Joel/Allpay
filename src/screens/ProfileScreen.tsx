// src/screens/ProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          setName(data.name);
          setEmail(data.email);
          setType(data.user_type);
        }
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    await AsyncStorage.removeItem('userLoggedIn'); // ❗️ KEY CHANGE
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // Navigates correctly
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileBox}>
        <Text style={styles.label}>
          Name: <Text style={styles.value}>{name}</Text>
        </Text>
        <Text style={styles.label}>
          Type: <Text style={styles.value}>{type}</Text>
        </Text>
        <Text style={styles.label}>
          Email: <Text style={styles.value}>{email}</Text>
        </Text>
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, color: '#2c3e50', marginTop: 50, textAlign: 'center' },
  profileBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: { fontSize: 16, color: '#2c3e50', marginBottom: 8 },
  value: { fontWeight: '600' },
  logoutButton: {
    backgroundColor: '#FB512D',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
