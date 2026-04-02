import React, { useState } from 'react';
import { View, Text, Button, Alert, TextInput, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { generateOTP, addOTPTodatabase, getOrderByOTP, approveOrder } from '../utils/otpDatabase';

export default function Payment({ cart, setCart, onPaymentComplete, onCancel }) {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [showOtpDisplay, setShowOtpDisplay] = useState(false);
  const [showPaymentQR, setShowPaymentQR] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const generateAndSendOTP = () => {
    const newOtp = generateOTP();
    setGeneratedOtp(newOtp);
    setShowOtpDisplay(true);
    
    // Add OTP to database for cashier to access
    addOTPTodatabase(newOtp, cart);
    
    Alert.alert(
      "OTP Generated",
      `Your OTP is: ${newOtp}\n\nPlease share this OTP with the cashier.\nThe cashier will review your order and approve payment.`,
      [{ text: "OK" }]
    );
  };

  const checkApprovalStatus = () => {
    if (!generatedOtp) {
      Alert.alert("Error", "No OTP found. Please generate an OTP first.");
      return;
    }

    // Check the actual order status from the database
    const order = getOrderByOTP(generatedOtp);
    
    if (!order) {
      // Order was rejected (deleted from database)
      Alert.alert(
        "Order Rejected",
        "The cashier has rejected your order. Please contact the cashier for more information or try again with a new order.",
        [
          { 
            text: "OK", 
            onPress: () => {
              // Reset the payment process
              handleCancel();
            }
          }
        ]
      );
      return;
    }

    if (order.approved) {
      // Order was approved
      setIsApproved(true);
      Alert.alert(
        "Order Approved!",
        "The cashier has approved your order. You can now proceed with payment.",
        [{ text: "OK" }]
      );
    } else {
      // Order is still pending
      Alert.alert(
        "Order Pending",
        "Your order is still pending approval from the cashier. Please wait a bit longer and check again.",
        [{ text: "OK" }]
      );
    }
  };

  const completePayment = () => {
    if (!generatedOtp) {
      Alert.alert("Error", "No OTP found. Please generate an OTP first.");
      return;
    }

    // Check if order still exists (not rejected)
    const order = getOrderByOTP(generatedOtp);
    if (!order) {
      Alert.alert(
        "Order Rejected",
        "The cashier has rejected your order. You cannot proceed with payment.",
        [
          { 
            text: "OK", 
            onPress: () => {
              handleCancel();
            }
          }
        ]
      );
      return;
    }

    if (!order.approved) {
      Alert.alert("Not Approved", "Please wait for cashier approval before proceeding with payment.");
      return;
    }

    setIsProcessing(true);
    
    // For online payment, open payment app with UPI
    if (selectedMethod === 'online') {
      openPaymentApp();
    } else {
      // For cash payment, just complete
      setTimeout(() => {
        setIsProcessing(false);
        onPaymentComplete();
        setCart([]);
        Alert.alert(
          "Payment Successful!",
          `Cash payment of ₹${totalAmount} completed successfully.\n\nThank you for shopping with us!`,
          [{ text: "OK" }]
        );
      }, 2000);
    }
  };

  const openPaymentApp = () => {
    // Create UPI payment URL for payment apps
    const upiId = 'yourupi@bank'; // In real app, this would be user's UPI ID
    const merchantName = 'SimpleCart';
    const transactionNote = 'Payment for order';
    const paymentUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${totalAmount}&tn=${encodeURIComponent(transactionNote)}`;
    
    // Try to open payment app using deep linking
    Linking.openURL(paymentUrl)
      .then(() => {
        Alert.alert(
          "Payment App Opened",
          "Please complete the payment in your payment app and return here to confirm.",
          [
            { text: "Cancel", style: "cancel" },
            { 
              text: "I've Paid", 
              onPress: () => {
                setIsProcessing(false);
                onPaymentComplete();
                setCart([]);
                Alert.alert(
                  "Payment Successful!",
                  `Online payment of ₹${totalAmount} completed successfully.\n\nThank you for shopping with us!`,
                  [{ text: "OK" }]
                );
              }
            }
          ]
        );
      })
      .catch((error) => {
        console.error('Error opening payment app:', error);
        Alert.alert(
          "Payment Error",
          "Unable to open payment app. Please ensure you have a payment app installed.",
          [
            { text: "OK", onPress: () => setIsProcessing(false) }
          ]
        );
      });
  };

  const handlePaymentMethod = (method) => {
    setSelectedMethod(method);
    generateAndSendOTP();
  };

  const handleCancel = () => {
    Alert.alert(
      "Cancel Payment",
      "Are you sure you want to cancel the payment process?",
      [
        { text: "No", style: "cancel" },
        { 
          text: "Yes, Cancel", 
          onPress: () => {
            if (onCancel) {
              onCancel();
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleBackToCart = () => {
    Alert.alert(
      "Back to Cart",
      "Return to cart to modify items?",
      [
        { text: "No", style: "cancel" },
        { 
          text: "Yes, Go Back", 
          onPress: () => {
            if (onCancel) {
              onCancel();
            }
          }
        }
      ]
    );
  };

  if (showPaymentQR) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
        <View style={{ padding: 20 }}>
          {/* Header with Cancel Button */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <TouchableOpacity 
              onPress={handleCancel}
              style={{ 
                backgroundColor: '#ef4444', 
                paddingHorizontal: 16, 
                paddingVertical: 8, 
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Ionicons name="close" size={16} color="#fff" />
              <Text style={{ color: '#fff', fontWeight: 'bold', marginLeft: 4 }}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={handleBackToCart}
              style={{ 
                backgroundColor: '#6b7280', 
                paddingHorizontal: 16, 
                paddingVertical: 8, 
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Ionicons name="arrow-back" size={16} color="#fff" />
              <Text style={{ color: '#fff', fontWeight: 'bold', marginLeft: 4 }}>Back to Cart</Text>
            </TouchableOpacity>
          </View>

          <View style={{ backgroundColor: '#6366f1', padding: 20, borderRadius: 12, marginBottom: 20 }}>
            <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>
              Online Payment
            </Text>
            <Text style={{ color: '#e0e7ff', fontSize: 16, textAlign: 'center' }}>
              Scan QR code to pay
            </Text>
          </View>

          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 20, color: '#1f2937' }}>
              Payment QR Code
            </Text>
            
            <View style={{ 
              width: 200, 
              height: 200, 
              backgroundColor: '#000', 
              justifyContent: 'center', 
              alignItems: 'center',
              borderRadius: 12,
              marginBottom: 20
            }}>
              <View style={{ backgroundColor: '#fff', padding: 10, borderRadius: 8 }}>
                <Text style={{ fontSize: 48, fontWeight: 'bold', color: '#000' }}>₹</Text>
              </View>
            </View>
            
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#6366f1', marginBottom: 10 }}>
              ₹{totalAmount}
            </Text>
            
            <Text style={{ fontSize: 14, color: '#6b7280', textAlign: 'center', marginBottom: 20 }}>
              Scan this QR code with any payment app{'\n'}(GPay, PhonePe, Paytm, etc.)
            </Text>
            
            <Button 
              title="I've Paid"
              onPress={completePayment}
              color="#10b981"
              disabled={isProcessing || !isApproved}
            />
            
            {!isApproved && (
              <Text style={{ color: '#ef4444', textAlign: 'center', marginTop: 10 }}>
                Waiting for cashier approval...
              </Text>
            )}
          </View>

          <View style={{ backgroundColor: '#fef3c7', padding: 16, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#f59e0b' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Ionicons name="information-circle" size={20} color="#d97706" />
              <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 8, color: '#d97706' }}>
                Payment Instructions
              </Text>
            </View>
            <Text style={{ fontSize: 14, color: '#d97706', lineHeight: 20 }}>
              1. Open your payment app (GPay, PhonePe, etc.){'\n'}
              2. Scan the QR code above{'\n'}
              3. Enter the amount: ₹{totalAmount}{'\n'}
              4. Complete the payment{'\n'}
              5. Click "I've Paid" when done
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <View style={{ padding: 20 }}>
        {/* Header with Cancel Button */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity 
            onPress={handleCancel}
            style={{ 
              backgroundColor: '#ef4444', 
              paddingHorizontal: 16, 
              paddingVertical: 8, 
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Ionicons name="close" size={16} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: 'bold', marginLeft: 4 }}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={handleBackToCart}
            style={{ 
              backgroundColor: '#6b7280', 
              paddingHorizontal: 16, 
              paddingVertical: 8, 
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Ionicons name="arrow-back" size={16} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: 'bold', marginLeft: 4 }}>Back to Cart</Text>
          </TouchableOpacity>
        </View>

        <View style={{ backgroundColor: '#6366f1', padding: 20, borderRadius: 12, marginBottom: 20 }}>
          <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>
            Checkout
          </Text>
          <Text style={{ color: '#e0e7ff', fontSize: 16, textAlign: 'center' }}>
            Choose your payment method
          </Text>
        </View>

        {/* Order Summary */}
        <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#1f2937' }}>
            Order Summary
          </Text>
          
          {cart.map(item => (
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
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#6366f1' }}>
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
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#6366f1' }}>
              ₹{totalAmount}
            </Text>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#1f2937' }}>
            Select Payment Method
          </Text>
          
          <View style={{ marginBottom: 16 }}>
            <Button 
              title="💳 Online Payment (GPay, PhonePe, etc.)"
              onPress={() => handlePaymentMethod('online')}
              color="#6366f1"
              disabled={selectedMethod !== ''}
            />
          </View>
          
          <Button 
            title="💵 Cash Payment"
            onPress={() => handlePaymentMethod('cash')}
            color="#10b981"
            disabled={selectedMethod !== ''}
          />
        </View>

        {/* OTP Display */}
        {showOtpDisplay && (
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Ionicons name="key" size={24} color="#6366f1" />
              <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 8, color: '#1f2937' }}>
                Your OTP
              </Text>
            </View>
            
            <View style={{ 
              backgroundColor: '#f0f9ff', 
              padding: 20, 
              borderRadius: 12, 
              alignItems: 'center',
              borderWidth: 2,
              borderColor: '#0ea5e9',
              marginBottom: 16
            }}>
              <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#0ea5e9', letterSpacing: 8 }}>
                {generatedOtp}
              </Text>
            </View>
            
            <Text style={{ fontSize: 14, color: '#6b7280', textAlign: 'center', marginBottom: 16 }}>
              Share this OTP with the cashier. The cashier will review your order and approve payment.
            </Text>
            
            <Button 
              title="🔄 Check Approval Status"
              onPress={checkApprovalStatus}
              color="#6366f1"
            />
            
            {isApproved && (
              <View style={{ 
                backgroundColor: '#f0fdf4', 
                padding: 12, 
                borderRadius: 8, 
                marginTop: 12,
                alignItems: 'center'
              }}>
                <Text style={{ color: '#16a34a', fontWeight: 'bold' }}>✅ Order Approved!</Text>
                <Text style={{ color: '#16a34a', fontSize: 12 }}>You can now proceed with payment</Text>
              </View>
            )}
          </View>
        )}

        {/* Proceed to Payment */}
        {selectedMethod && (
          <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
            <Button 
              title="💳 Proceed to Payment"
              onPress={() => {
                // Check if order still exists before proceeding
                const order = getOrderByOTP(generatedOtp);
                if (!order) {
                  Alert.alert(
                    "Order Rejected",
                    "The cashier has rejected your order. You cannot proceed with payment.",
                    [
                      { 
                        text: "OK", 
                        onPress: () => {
                          handleCancel();
                        }
                      }
                    ]
                  );
                  return;
                }

                if (!order.approved) {
                  Alert.alert("Not Approved", "Please wait for cashier approval before proceeding with payment.");
                  return;
                }

                if (selectedMethod === 'online') {
                  setShowPaymentQR(true);
                } else {
                  completePayment();
                }
              }}
              color="#10b981"
              disabled={!isApproved}
            />
            
            {!isApproved && (
              <Text style={{ color: '#ef4444', textAlign: 'center', marginTop: 10 }}>
                Waiting for cashier approval...
              </Text>
            )}
          </View>
        )}

        {/* Instructions */}
        <View style={{ backgroundColor: '#eff6ff', padding: 16, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#3b82f6', marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Ionicons name="help-circle" size={20} color="#3b82f6" />
            <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 8, color: '#1e40af' }}>
              How it works
            </Text>
          </View>
          <Text style={{ fontSize: 14, color: '#1e40af', lineHeight: 20 }}>
            1. Select your payment method{'\n'}
            2. An OTP will be generated for you{'\n'}
            3. Share this OTP with the cashier{'\n'}
            4. Cashier will review and approve your order{'\n'}
            5. Once approved, proceed with payment
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
