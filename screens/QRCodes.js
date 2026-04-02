import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import QRCodeGenerator from '../components/QRCodeGenerator';
import PRODUCTS from '../products';

export default function QRCodes() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <View style={{ padding: 20 }}>
        <View style={{ backgroundColor: '#6366f1', padding: 20, borderRadius: 12, marginBottom: 20 }}>
          <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
            Product with QR Codes
          </Text>
          <Text style={{ color: '#e0e7ff', fontSize: 16 }}>
            Scan these codes with your camera
          </Text>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, color: '#6b7280', textAlign: 'center', marginBottom: 20 }}>
            Point your camera at any QR code to add the product to your cart
          </Text>
        </View>

        {Object.entries(PRODUCTS).map(([id, product]) => (
          <QRCodeGenerator key={id} product={{ id, ...product }} />
        ))}
      </View>
    </ScrollView>
  );
}
