import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, PermissionsAndroid, Platform } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type ScanScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Scan'>;

const ScanScreen = () => {
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const navigation = useNavigation<ScanScreenNavigationProp>();

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to scan QR codes.',
            buttonPositive: 'OK',
          }
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        setHasPermission(true); // iOS asks automatically
      }
    })();
  }, []);

  const onBarCodeRead = (e: { data: string }) => {
    if (!scanned) {
      setScanned(true);

      try {
        const data = JSON.parse(e.data);
        const { id, type } = data;

        if (id && type) {
          navigation.navigate('Transfer', { userId: id, txType: type });
        } else {
          Alert.alert('Invalid QR Code', 'Missing required fields (id or type).');
        }
      } catch (err) {
        Alert.alert('Invalid QR Code', 'Could not parse QR code data.');
      }

      setTimeout(() => setScanned(false), 3000);
    }
  };

  if (hasPermission === null) {
    return <View><Text>Checking camera permission...</Text></View>;
  }

  if (hasPermission === false) {
    return <View><Text style={{ padding: 20 }}>Camera access denied. Please enable it in settings.</Text></View>;
  }

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        onBarCodeRead={onBarCodeRead}
        captureAudio={false}
      >
        <View style={styles.scanBox}>
          <Text style={styles.scanText}>Align QR code inside the frame</Text>
        </View>
      </RNCamera>
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  preview: { flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
  scanBox: {
    position: 'absolute',
    top: '20%',
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanText: {
    color: '#fff',
    position: 'absolute',
    bottom: -30,
    fontSize: 16,
  },
});
