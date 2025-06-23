import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { signUp } from '../services/AuthService';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState<Date | null>(null);
  const [job, setJob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirm] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();

  const isAtLeast18 = (date: Date) => {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      age--;
    }
    return age >= 18;
  };
  
  const formatDateLocalized = (date: Date | null): string => {
    if (!date) return 'Select Date of Birth';
    return date.toLocaleDateString();
  };
  
  const handleRegister = async () => {
    if (!name || !phone || !dob || !job || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (!isAtLeast18(dob)) {
      Alert.alert('Error', 'You must be at least 18 years old to register');
      return;
    }

    const formattedDob = dob.toISOString().split('T')[0];
    const { error } = await signUp(phone, password, {
      name,
      dob: formattedDob,
      job,
    });
    if (!error) {
      navigation.navigate('Login');
    } else {
      Alert.alert('Error', error.message);
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create an Account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#888"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="#888"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#888"
            style={styles.icon}
          />
          <Text style={{ color: dob ? '#000' : '#888' }}>
            {formatDateLocalized(dob)}
          </Text>
        </TouchableOpacity>
     {showDatePicker && (
  <DateTimePicker
    value={dob || new Date(1990, 0, 1)}
    mode="date"
    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
    maximumDate={new Date()}
    textColor="#FB512D" // iOS only
    themeVariant="light" // iOS only
    onChange={(event, selectedDate) => {
      // Always close the picker
      setShowDatePicker(false);

      // Set the date if selected
      if (selectedDate) {
        setDob(selectedDate);
      }
    }}
  />
)}

        <TextInput
          placeholder="Job"
          placeholderTextColor="#888"
          style={styles.input}
          value={job}
          onChangeText={setJob}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirm}
        />
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
          activeOpacity={0.8}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FAFAFA',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FB512D',
    textAlign: 'center',
    marginBottom: 20,
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
    marginBottom: 14,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    padding: 14,
    borderRadius: 8,
    marginBottom: 14,
  },
  icon: {
    marginRight: 10,
  },
  registerButton: {
    backgroundColor: '#FB512D',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  registerButtonText: {
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
