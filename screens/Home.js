import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Home({ cart }) {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const [showTipsModal, setShowTipsModal] = useState(false);

  const showTips = () => {
    setShowTipsModal(true);
  };

  const closeTips = () => {
    setShowTipsModal(false);
  };

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
        <View style={{ padding: 20 }}>
          {/* Header */}
          <View style={{ backgroundColor: '#6366f1', padding: 20, borderRadius: 12, marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ 
                  backgroundColor: '#fff', 
                  width: 50, 
                  height: 50, 
                  borderRadius: 25, 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  marginRight: 15,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  elevation: 5
                }}>
                  <Ionicons name="receipt" size={28} color="#6366f1" />
                </View>
                <View>
                  <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>
                    ScanPay
                  </Text>
                  <Text style={{ color: '#e0e7ff', fontSize: 14 }}>
                    Smart Billing Solution
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity 
                onPress={showTips}
                style={{ 
                  backgroundColor: '#4f46e5', 
                  padding: 10, 
                  borderRadius: 20,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3
                }}
              >
                <Ionicons name="bulb" size={20} color="#fff" />
              </TouchableOpacity>
          </View>
      </View>
        {/* Cart Summary */}
        <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Ionicons name="cart" size={24} color="#6366f1" />
            <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 8, color: '#1f2937' }}>
              Cart Summary
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={{ color: '#6b7280', fontSize: 16 }}>Total Items:</Text>
            <Text style={{ color: '#1f2937', fontSize: 16, fontWeight: '600' }}>{totalItems}</Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#e5e7eb' }}>
            <Text style={{ color: '#6b7280', fontSize: 16 }}>Total Amount:</Text>
            <Text style={{ color: '#6366f1', fontSize: 20, fontWeight: 'bold' }}>₹{totalAmount}</Text>
          </View>
        </View>

        {/* How to Use */}
        <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Ionicons name="help-circle" size={24} color="#6366f1" />
            <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 8, color: '#1f2937' }}>
              How to Use This App
            </Text>
          </View>
          
          <View style={{ flexDirection: 'column', space: 16 }}>
            <View style={{ marginBottom: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
                <View style={{ backgroundColor: '#6366f1', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12, marginTop: 2 }}>
                  <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>1</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 4 }}>
                    Scan Products
                  </Text>
                  <Text style={{ fontSize: 14, color: '#6b7280', lineHeight: 20 }}>
                    Go to the Scan tab and use your camera to scan QR codes or enter barcode numbers manually.
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ marginBottom: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
                <View style={{ backgroundColor: '#6366f1', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12, marginTop: 2 }}>
                  <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>2</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 4 }}>
                    View QR Codes
                  </Text>
                  <Text style={{ fontSize: 14, color: '#6b7280', lineHeight: 20 }}>
                    Check the QR Codes tab to see all available products and their barcode numbers.
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ marginBottom: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
                <View style={{ backgroundColor: '#6366f1', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12, marginTop: 2 }}>
                  <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>3</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 4 }}>
                    Manage Cart
                  </Text>
                  <Text style={{ fontSize: 14, color: '#6b7280', lineHeight: 20 }}>
                    Go to the Bill tab to view your cart, adjust quantities, or remove items.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Platform Info */}
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 }}>
            <Ionicons name="information-circle" size={16} color="#6b7280" />
            <Text style={{ fontSize: 12, color: '#6b7280', marginLeft: 4 }}>
              Use tabs below to navigate
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
    
    {/* Tips Modal */}
    <Modal
      visible={showTipsModal}
      animationType="slide"
      transparent={true}
      onRequestClose={closeTips}
    >
      <View style={{ 
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.5)', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <View style={{ 
          backgroundColor: '#fff', 
          margin: 20, 
          borderRadius: 16, 
          padding: 25,
          maxHeight: '80%',
          width: '90%',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 20,
          elevation: 10
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="bulb" size={24} color="#fbbf24" />
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 8, color: '#1f2937' }}>
                Quick Tips & Tricks
              </Text>
            </View>
            <TouchableOpacity 
              onPress={closeTips}
              style={{ 
                backgroundColor: '#f3f4f6', 
                width: 32, 
                height: 32, 
                borderRadius: 16, 
                justifyContent: 'center', 
                alignItems: 'center' 
              }}
            >
              <Ionicons name="close" size={18} color="#6b7280" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={{ maxHeight: 400 }}>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#6366f1', marginBottom: 10 }}>
                🛒 Shopping Tips
              </Text>
              <Text style={{ fontSize: 14, color: '#4b5563', lineHeight: 20, marginBottom: 8 }}>
                • Double-check items before proceeding to payment{'\n'}
                • Use the Scan tab for quick barcode scanning{'\n'}
                • Cart badge shows total items in real-time{'\n'}
                • You can adjust quantities in the Bill tab
              </Text>
            </View>
            
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#6366f1', marginBottom: 10 }}>
                📱 App Features
              </Text>
              <Text style={{ fontSize: 14, color: '#4b5563', lineHeight: 20, marginBottom: 8 }}>
                • QR codes work on both mobile and web{'\n'}
                • Manual barcode entry available as backup{'\n'}
                • Real-time cart synchronization{'\n'}
                • Secure OTP-based payment approval
              </Text>
            </View>
            
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#6366f1', marginBottom: 10 }}>
                💳 Payment Process
              </Text>
              <Text style={{ fontSize: 14, color: '#4b5563', lineHeight: 20, marginBottom: 8 }}>
                • Generate OTP after selecting payment method{'\n'}
                • Share OTP with cashier for approval{'\n'}
                • Wait for cashier confirmation{'\n'}
                • Complete payment only after approval
              </Text>
            </View>
            
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#6366f1', marginBottom: 10 }}>
                ⚡ Pro Tips
              </Text>
              <Text style={{ fontSize: 14, color: '#4b5563', lineHeight: 20 }}>
                • Long press items for more options{'\n'}
                • Check QR Codes tab for product list{'\n'}
                • Use Cashier tab for order management{'\n'}
                • All data syncs automatically across tabs
              </Text>
            </View>
          </ScrollView>
          
          <TouchableOpacity 
            onPress={closeTips}
            style={{ 
              backgroundColor: '#6366f1', 
              padding: 15, 
              borderRadius: 10, 
              alignItems: 'center',
              marginTop: 10
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
              Got it!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    </>
  );
}
