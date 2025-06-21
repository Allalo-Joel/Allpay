import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  Camera,
  useCameraDevices,
} from 'react-native-vision-camera';

const ScanScreen = () => {
  const [permission, setPermission] = useState<null | 'granted' | 'denied'>(null);
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    const requestPermission = async () => {
      const status = await Camera.requestCameraPermission();
      console.log('[Camera Permission Status]', status);
      setPermission(status);
    };
    requestPermission();
  }, []);

  useEffect(() => {
    console.log('[Available Devices]', devices);
  }, [devices]);


  // 1️⃣ No permission granted
  if (permission === 'denied') {
    return (
      <View style={styles.center}>
        <Text>❌ Camera permission denied. Enable it in settings.</Text>
      </View>
    );
  }

  // 2️⃣ Waiting for permission
  if (permission === null) {
    return (
      <View style={styles.center}>
        <Text>⏳ Requesting camera permission…</Text>
      </View>
    );
  }

  // 3️⃣ No camera device found
  if (!device) {
    return (
      <View style={styles.center}>
        <Text>📷 Loading camera device…</Text>
      </View>
    );
  }

  // 4️⃣ Render the camera when permission granted and device found
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} device={device} isActive={true} />
      <View style={styles.scanBox}>
        <Text style={styles.scanText}>Align QR code inside the frame</Text>
      </View>
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  camera: {flex: 1},
  scanBox: {
    position: 'absolute',
    top: '20%',
    left: '50%',
    marginLeft: -125,
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
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
