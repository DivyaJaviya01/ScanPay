import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function CustomSplashScreen() {
  const [loadingText, setLoadingText] = useState('Initializing ScanPay...');
  
  useEffect(() => {
    const texts = [
      'Initializing ScanPay...',
      'Loading your shopping experience...',
      'Preparing smart payment system...',
      'Almost ready...',
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setLoadingText(texts[index]);
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="receipt" size={80} color="#ffffff" />
        </View>
        <Text style={styles.appName}>ScanPay</Text>
        <Text style={styles.tagline}>Smart Payment Solution</Text>
        
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" style={styles.spinner} />
          <Text style={styles.loadingText}>{loadingText}</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by Expo</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 3,
  },
  tagline: {
    fontSize: 18,
    color: '#e0e7ff',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 40,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  spinner: {
    marginBottom: 15,
  },
  loadingText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.9,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#e0e7ff',
    opacity: 0.8,
  },
});
