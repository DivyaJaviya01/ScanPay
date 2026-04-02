import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoadingScreen({ message = 'Loading ScanPay...' }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="receipt" size={60} color="#6366f1" />
        <Text style={styles.appName}>ScanPay</Text>
        <ActivityIndicator size="large" color="#6366f1" style={styles.spinner} />
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.subMessage}>Please wait while we prepare your app...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    marginVertical: 15,
  },
  spinner: {
    marginVertical: 20,
  },
  message: {
    fontSize: 18,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 8,
  },
  subMessage: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
