import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signIn } from '../services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const { error } = await signIn(phone, password);
      if (!error) {
        await AsyncStorage.setItem('userLoggedIn', 'true');
        navigation.navigate('MainTabs');
      } else {
        alert(error.message);
      }
    } catch (err) {
      console.error('Login error:', err.message);
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <Text style={styles.header}>Welcome Back</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
  placeholder="Phone Number"
  placeholderTextColor="#888"
  style={styles.input}
  value={phone}
  onChangeText={setPhone}
  keyboardType="phone-pad"
/>
<TextInput
  placeholder="Password"
  placeholderTextColor="#888"
  secureTextEntry
  style={styles.input}
  value={password}
  onChangeText={setPassword}
/>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Don't have an account? Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FB512D',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F3F3F3',
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#FB512D',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  link: {
    color: '#FB512D',
    textAlign: 'center',
    marginTop: 18,
    fontSize: 14,
  },
});
