import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OTP_DATABASE, getOrderByOTP, approveOrder, rejectOrder } from '../utils/otpDatabase';

export default function Cashier() {
  const [otpInput, setOtpInput] = useState('');
  const [currentOrder, setCurrentOrder] = useState(null);
  const [approvedOrders, setApprovedOrders] = useState([]);

  const searchOTP = () => {
    if (!otpInput.trim()) {
      Alert.alert("Error", "Please enter an OTP");
      return;
    }

    const order = getOrderByOTP(otpInput);
    
    if (!order) {
      Alert.alert("Not Found", "No order found with this OTP");
      return;
    }

    if (order.approved) {
      Alert.alert("Already Approved", "This order has already been approved");
      return;
    }

    setCurrentOrder({
      otp: otpInput,
      ...order
    });
  };

  const approveCurrentOrder = () => {
    if (!currentOrder) return;

    // Mark order as approved in database
    if (approveOrder(currentOrder.otp)) {
      // Add to approved orders list
      setApprovedOrders(prev => [...prev, {
        otp: currentOrder.otp,
        cart: currentOrder.cart,
        approvedAt: new Date()
      }]);

      Alert.alert(
        "Order Approved",
        `Order for OTP ${currentOrder.otp} has been approved. Customer can now proceed with payment.`,
        [{ text: "OK" }]
      );

      setCurrentOrder(null);
      setOtpInput('');
    }
  };

  const rejectCurrentOrder = () => {
    if (!currentOrder) return;

    Alert.alert(
      "Reject Order",
      "Are you sure you want to reject this order?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Reject", 
          onPress: () => {
            if (rejectOrder(currentOrder.otp)) {
              setCurrentOrder(null);
              setOtpInput('');
              Alert.alert("Order Rejected", "Order has been rejected and removed.");
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const calculateTotal = (cart) => {
    return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  };

  const calculateItems = (cart) => {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <View style={{ padding: 20 }}>
        {/* Header */}
        <View style={{ backgroundColor: '#dc2626', padding: 20, borderRadius: 12, marginBottom: 20 }}>
          <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>
            🏪 Cashier System
          </Text>
          <Text style={{ color: '#fecaca', fontSize: 16, textAlign: 'center' }}>
            Enter OTP to view customer orders
          </Text>
        </View>

        {/* OTP Input */}
        <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Ionicons name="key" size={24} color="#dc2626" />
            <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 8, color: '#1f2937' }}>
              Enter Customer OTP
            </Text>
          </View>
          
          <TextInput
            style={{
              borderWidth: 2,
              borderColor: '#e5e7eb',
              padding: 16,
              borderRadius: 12,
              marginBottom: 16,
              fontSize: 18,
              backgroundColor: '#f9fafb',
              textAlign: 'center',
              letterSpacing: 4,
            }}
            value={otpInput}
            onChangeText={setOtpInput}
            placeholder="Enter 6-digit OTP"
            keyboardType="numeric"
            maxLength={6}
          />
          
          <Button 
            title="🔍 Search Order"
            onPress={searchOTP}
            color="#dc2626"
          />
        </View>

        {/* Current Order */}
        {currentOrder && (
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Ionicons name="receipt" size={24} color="#dc2626" />
              <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 8, color: '#1f2937' }}>
                Order Details (OTP: {currentOrder.otp})
              </Text>
            </View>

            {currentOrder.cart.map(item => (
              <View key={item.id} style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderBottomColor: '#f3f4f6'
              }}>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: '500', color: '#1f2937' }}>
                    {item.name} x{item.qty}
                  </Text>
                  <Text style={{ fontSize: 14, color: '#6b7280' }}>
                    ₹{item.price} each
                  </Text>
                </View>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#dc2626' }}>
                  ₹{item.price * item.qty}
                </Text>
              </View>
            ))}

            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              paddingTop: 16,
              marginTop: 8,
              borderTopWidth: 2,
              borderTopColor: '#e5e7eb'
            }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1f2937' }}>
                Total Amount:
              </Text>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#dc2626' }}>
                ₹{calculateTotal(currentOrder.cart)}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 12, marginTop: 20 }}>
              <View style={{ flex: 1 }}>
                <Button 
                  title="✅ Approve"
                  onPress={approveCurrentOrder}
                  color="#10b981"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button 
                  title="❌ Reject"
                  onPress={rejectCurrentOrder}
                  color="#ef4444"
                />
              </View>
            </View>
          </View>
        )}

        {/* Approved Orders */}
        {approvedOrders.length > 0 && (
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Ionicons name="checkmark-circle" size={24} color="#10b981" />
              <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 8, color: '#1f2937' }}>
                Recently Approved Orders
              </Text>
            </View>

            {approvedOrders.slice(-3).reverse().map((order, index) => (
              <View key={index} style={{ 
                backgroundColor: '#f0fdf4', 
                padding: 12, 
                borderRadius: 8, 
                marginBottom: 8,
                borderLeftWidth: 4,
                borderLeftColor: '#22c55e'
              }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#16a34a' }}>
                    OTP: {order.otp}
                  </Text>
                  <Text style={{ fontSize: 14, color: '#16a34a' }}>
                    ₹{calculateTotal(order.cart)}
                  </Text>
                </View>
                <Text style={{ fontSize: 12, color: '#16a34a', marginTop: 4 }}>
                  {calculateItems(order.cart)} items • Approved at {order.approvedAt.toLocaleTimeString()}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Instructions */}
        <View style={{ backgroundColor: '#fef2f2', padding: 16, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#dc2626', marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Ionicons name="information-circle" size={20} color="#dc2626" />
            <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 8, color: '#dc2626' }}>
              How it Works
            </Text>
          </View>
          <Text style={{ fontSize: 14, color: '#dc2626', lineHeight: 20 }}>
            1. Customer generates OTP from their app{'\n'}
            2. Customer shares OTP with you{'\n'}
            3. Enter OTP to view their order details{'\n'}
            4. Review the order and click "Approve"{'\n'}
            5. Customer can then complete payment{'\n'}
            6. Click "Reject" to cancel invalid orders
          </Text>
        </View>

        {/* Sample OTPs for Testing */}
        <View style={{ backgroundColor: '#f3f4f6', padding: 16, borderRadius: 12 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>
            💡 Testing Instructions:
          </Text>
          <Text style={{ fontSize: 12, color: '#6b7280' }}>
            1. Go to Bill tab and add items to cart{'\n'}
            2. Click "Proceed to Payment"{'\n'}
            3. Select payment method to generate OTP{'\n'}
            4. Copy the OTP and enter it here{'\n'}
            5. Approve the order to test the flow
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
