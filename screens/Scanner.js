import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import PRODUCTS from '../products';

export default function Scanner({ cart, setCart }) {
  const [barcodeInput, setBarcodeInput] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    // Reset permission state every time component loads
    setHasPermission(null);
    setShowCamera(false);
  }, []);

  const requestCameraPermission = async () => {
    console.log('Requesting camera permission...');
    
    if (Platform.OS === 'web') {
      Alert.alert("Not Available", "Camera is not available on web browser.");
      return false;
    }

    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log('Permission status:', status);
      setHasPermission(status === 'granted');
      
      if (status === 'granted') {
        Alert.alert("Permission Granted", "Camera permission granted! You can now scan QR codes.");
        setShowCamera(true);
      } else {
        Alert.alert(
          "Permission Denied",
          "Camera permission is required to scan QR codes. Please enable camera permissions in your device settings."
        );
      }
      
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      Alert.alert("Error", "Failed to request camera permission. Please try again.");
      return false;
    }
  };

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    const product = PRODUCTS[data];
    
    if (product) {
      Alert.alert(
        "Product Found!",
        `${product.name} - ₹${product.price}\n\nAdd to cart?`,
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Add", 
            onPress: () => {
              addToCart(data);
              setScanned(false);
            }
          }
        ]
      );
    } else {
      Alert.alert(
        "Product Not Found",
        "This barcode is not in our product database.",
        [
          { 
            text: "OK", 
            onPress: () => setScanned(false)
          }
        ]
      );
    }
  };

  const addToCart = (productId) => {
    const product = PRODUCTS[productId];
    
    setCart(prev => {
      const existing = prev.find(p => p.id === productId);

      if (existing) {
        return prev.map(p =>
          p.id === productId
            ? { ...p, qty: p.qty + 1 }
            : p
        );
      }

      return [...prev, { ...product, id: productId, qty: 1 }];
    });
  };

  const testButton = () => {
    console.log('Button clicked!');
    Alert.alert("Test", "Button is working!");
  };

  const handleManualScan = () => {
    const product = PRODUCTS[barcodeInput];
    
    if (product) {
      addToCart(barcodeInput);
      setBarcodeInput('');
      Alert.alert("Success", `${product.name} added to cart!`);
    } else {
      Alert.alert("Not Found", "Product not found. Please enter a number between 1 and 23.");
    }
  };

  if (hasPermission === null || !showCamera) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
        <View style={{ padding: 20 }}>
          <View style={{ backgroundColor: '#6366f1', padding: 20, borderRadius: 12, marginBottom: 20 }}>
            <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>
              📷 Scanner
            </Text>
            <Text style={{ color: '#e0e7ff', fontSize: 16, textAlign: 'center' }}>
              Add products to your cart
            </Text>
          </View>

          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#1f2937' }}>
              📷 Camera Scanner
            </Text>
            
            <Text style={{ marginBottom: 16, color: '#6b7280', fontSize: 16 }}>
              Point your camera at a QR code to scan products
            </Text>
            
            <TouchableOpacity 
              onPress={requestCameraPermission}
              style={{ 
                backgroundColor: '#6366f1', 
                padding: 16, 
                borderRadius: 12,
                alignItems: 'center'
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                📷 Request Camera Permission
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#1f2937' }}>
              Manual Barcode Entry
            </Text>
            
            <Text style={{ marginBottom: 12, color: '#6b7280', fontSize: 16 }}>
              Enter barcode number:
            </Text>
            
            <TextInput
              style={{
                borderWidth: 2,
                borderColor: '#e5e7eb',
                padding: 16,
                borderRadius: 12,
                marginBottom: 20,
                fontSize: 18,
                backgroundColor: '#f9fafb',
              }}
              value={barcodeInput}
              onChangeText={setBarcodeInput}
              placeholder="Enter Barcode Number"
              keyboardType="numeric"
              maxLength={2}
            />
            
            <Button 
              title="Add Product" 
              onPress={handleManualScan}
              color="#6366f1"
            />
          </View>

          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#1f2937' }}>
              Product Catalog
            </Text>
            
            {Object.entries(PRODUCTS).map(([id, product]) => (
              <View key={id} style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderBottomColor: '#f3f4f6'
              }}>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: '500', color: '#1f2937' }}>
                    {product.name}
                  </Text>
                  <Text style={{ fontSize: 14, color: '#6b7280' }}>
                    Barcode: {id} • ₹{product.price}
                  </Text>
                </View>
                <Text style={{ fontSize: 14, color: '#6366f1', fontWeight: '600' }}>
                  Enter "{id}"
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }

  if (hasPermission === false) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
        <View style={{ padding: 20 }}>
          <View style={{ backgroundColor: '#6366f1', padding: 20, borderRadius: 12, marginBottom: 20 }}>
            <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>
              📷 Scanner
            </Text>
            <Text style={{ color: '#e0e7ff', fontSize: 16, textAlign: 'center' }}>
              Add products to your cart
            </Text>
          </View>

          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#1f2937' }}>
              🌐 Camera Permission Required
            </Text>
            
            <Text style={{ marginBottom: 16, color: '#6b7280', fontSize: 16 }}>
              Camera permission is required to scan QR codes. Please grant permission to use the scanner.
            </Text>
            
            <Button 
              title="📷 Request Camera Permission" 
              onPress={requestCameraPermission}
              color="#6366f1"
            />
            
            <Text style={{ marginTop: 16, color: '#6366f1', fontSize: 14, fontStyle: 'italic' }}>
              💡 Tip: You can still use manual entry below.
            </Text>
          </View>

          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#1f2937' }}>
              Manual Barcode Entry
            </Text>
            
            <Text style={{ marginBottom: 12, color: '#6b7280', fontSize: 16 }}>
              Enter barcode number:
            </Text>
            
            <TextInput
              style={{
                borderWidth: 2,
                borderColor: '#e5e7eb',
                padding: 16,
                borderRadius: 12,
                marginBottom: 20,
                fontSize: 18,
                backgroundColor: '#f9fafb',
              }}
              value={barcodeInput}
              onChangeText={setBarcodeInput}
              placeholder="Enter 1-23"
              keyboardType="numeric"
              maxLength={2}
            />
            
            <Button 
              title="Add Product" 
              onPress={handleManualScan}
              color="#6366f1"
            />
          </View>

          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#1f2937' }}>
              Product Catalog
            </Text>
            
            {Object.entries(PRODUCTS).map(([id, product]) => (
              <View key={id} style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderBottomColor: '#f3f4f6'
              }}>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: '500', color: '#1f2937' }}>
                    {product.name}
                  </Text>
                  <Text style={{ fontSize: 14, color: '#6b7280' }}>
                    Barcode: {id} • ₹{product.price}
                  </Text>
                </View>
                <Text style={{ fontSize: 14, color: '#6366f1', fontWeight: '600' }}>
                  Enter "{id}"
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#6366f1', padding: 20, paddingTop: 50 }}>
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>
          Scan QR Code
        </Text>
        <Text style={{ color: '#e0e7ff', fontSize: 16, textAlign: 'center' }}>
          Point your camera at a QR code
        </Text>
      </View>
      
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'ean13', 'ean8', 'code128', 'code39', 'code93'],
        }}
        style={{ flex: 1 }}
      />
      
      <View style={{ 
        position: 'absolute', 
        bottom: 50, 
        left: 20, 
        right: 20, 
        flexDirection: 'row', 
        justifyContent: 'space-between' 
      }}>
        <TouchableOpacity 
          onPress={() => setScanned(false)}
          style={{ 
            backgroundColor: '#10b981', 
            padding: 15, 
            borderRadius: 25,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
            Scan Again
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => setShowCamera(false)}
          style={{ 
            backgroundColor: '#ef4444', 
            padding: 15, 
            borderRadius: 25,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
