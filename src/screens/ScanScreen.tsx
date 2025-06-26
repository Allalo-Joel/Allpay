import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { scanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { runOnJS } from 'react-native-reanimated';

const ScanScreen = () => {
  const [permission, setPermission] = useState<null | 'granted' | 'denied'>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    const requestPermission = async () => {
      const status = await Camera.requestCameraPermission();
      setPermission(status);
    };
    requestPermission();
  }, []);

  const handleBarcode = (data: string) => {
    if (!scannedData) {
      setScannedData(data);
      Alert.alert('QR Code Scanned', data);
    }
  };

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const barcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE]);
    if (barcodes.length > 0) {
      runOnJS(handleBarcode)(barcodes[0].rawValue || '');
    }
  }, [scannedData]);

  if (permission === 'denied') {
    return (
      <View style={styles.center}>
        <Text>❌ Camera permission denied. Enable it in settings.</Text>
      </View>
    );
  }

  if (permission === null) {
    return (
      <View style={styles.center}>
        <Text>⏳ Requesting camera permission…</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.center}>
        <Text>📷 Loading camera device…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        //frameProcessorFps={5}
      />
      <View style={styles.scanBox}>
        <Text style={styles.scanText}>Align QR code inside the frame</Text>
      </View>
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
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
