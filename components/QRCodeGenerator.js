import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Platform } from 'react-native';

export default function QRCodeGenerator({ product }) {
  const [qrCodeUri, setQrCodeUri] = useState(null);

  useEffect(() => {
    if (Platform.OS === 'web') {
      generateWebQRCode();
    }
  }, [product]);

  const generateWebQRCode = async () => {
    try {
      console.log('Generating QR code for product:', product.id);
      // Use an online QR code API to generate the QR code
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(String(product.id))}`;
      setQrCodeUri(qrUrl);
      console.log('Generated QR Code URL:', qrUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
      setQrCodeUri('web-placeholder');
    }
  };

  if (Platform.OS === 'web') {
    console.log('Rendering web view, qrCodeUri:', qrCodeUri);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>₹{product.price}</Text>
        <View style={styles.webQrContainer}>
          <Text style={styles.qrHeaderText}>QR CODE</Text>
          {qrCodeUri && qrCodeUri !== 'web-placeholder' ? (
            <Image 
              source={{ uri: qrCodeUri }} 
              style={styles.qrImage}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.qrBox}>
              <Text style={styles.qrCodeText}>{product.id}</Text>
            </View>
          )}
          <Text style={styles.qrInstruction}>Scan this code</Text>
        </View>
        <Text style={styles.barcodeText}>Barcode: {product.id}</Text>
      </View>
    );
  }

  // For mobile (Expo Go), use react-native-qrcode-svg
  const QRCode = require('react-native-qrcode-svg').default;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>₹{product.price}</Text>
      <View style={styles.qrContainer}>
        <QRCode
          value={product.id}
          size={200}
          color="#000000"
          backgroundColor="#ffffff"
        />
      </View>
      <Text style={styles.barcodeText}>Barcode: {product.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1f2937',
  },
  price: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: '600',
    marginBottom: 15,
  },
  qrContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  webQrContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    marginBottom: 15,
  },
  qrHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6b7280',
    marginBottom: 10,
  },
  qrBox: {
    width: 120,
    height: 120,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  qrImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  qrCodeText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
  },
  qrInstruction: {
    fontSize: 12,
    color: '#6b7280',
  },
  barcodeText: {
    marginTop: 10,
    fontSize: 14,
    color: '#6b7280',
  },
});
