import { View, Text, Button, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Bill({ cart, setCart, onProceedToPayment }) {

  const updateQty = (id, change) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Remove", 
          onPress: () => setCart(prev => prev.filter(item => item.id !== id)),
          style: "destructive"
        }
      ]
    );
  };

  const clearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to clear all items?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Clear", 
          onPress: () => setCart([]),
          style: "destructive"
        }
      ]
    );
  };

  const proceedToPayment = () => {
    if (onProceedToPayment) {
      onProceedToPayment();
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <View style={{ padding: 20 }}>
        <View style={{ backgroundColor: '#6366f1', padding: 20, borderRadius: 12, marginBottom: 20 }}>
          <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
            Shopping Bill
          </Text>
          <Text style={{ color: '#e0e7ff', fontSize: 16 }}>
            Review your cart items
          </Text>
        </View>

        {cart.length === 0 ? (
          <View style={{ 
            backgroundColor: '#fff', 
            padding: 40, 
            borderRadius: 12, 
            alignItems: 'center',
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: 0.1, 
            shadowRadius: 4, 
            elevation: 3 
          }}>
            <Ionicons name="cart-outline" size={48} color="#6b7280" />
            <Text style={{ fontSize: 18, color: '#6b7280', textAlign: 'center', marginTop: 16 }}>
              Your cart is empty
            </Text>
            <Text style={{ fontSize: 14, color: '#9ca3af', marginTop: 8, textAlign: 'center' }}>
              Add some products to get started!
            </Text>
          </View>
        ) : (
          <>
            {cart.map(item => (
              <View key={item.id} style={{ 
                backgroundColor: '#fff', 
                padding: 16, 
                borderRadius: 12, 
                marginBottom: 12,
                shadowColor: '#000', 
                shadowOffset: { width: 0, height: 2 }, 
                shadowOpacity: 0.1, 
                shadowRadius: 4, 
                elevation: 3 
              }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#1f2937' }}>
                      {item.name}
                    </Text>
                    <Text style={{ fontSize: 16, color: '#6366f1', fontWeight: '500', marginTop: 4 }}>
                      ₹{item.price} each
                    </Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1f2937' }}>
                      ₹{item.price * item.qty}
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <Button 
                      title="-" 
                      onPress={() => updateQty(item.id, -1)}
                      color="#6b7281"
                      disabled={item.qty <= 1}
                    />
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937', minWidth: 30, textAlign: 'center' }}>
                      {item.qty}
                    </Text>
                    <Button 
                      title="+" 
                      onPress={() => updateQty(item.id, 1)}
                      color="#6b7281"
                    />
                  </View>
                  <Button 
                    title="Remove" 
                    onPress={() => removeItem(item.id)}
                    color="#ef4444"
                  />
                </View>
              </View>
            ))}

            <View style={{ 
              backgroundColor: '#fff', 
              padding: 20, 
              borderRadius: 12, 
              marginTop: 20,
              shadowColor: '#000', 
              shadowOffset: { width: 0, height: 2 }, 
              shadowOpacity: 0.1, 
              shadowRadius: 4, 
              elevation: 3 
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <Text style={{ fontSize: 16, color: '#6b7280' }}>Total Items:</Text>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937' }}>{totalItems}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#e5e7eb' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1f2937' }}>Grand Total:</Text>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#6366f1' }}>₹{total}</Text>
              </View>
            </View>

            {/* Payment Button */}
            <View style={{ marginTop: 20 }}>
              <Button 
                title="💳 Proceed to Payment"
                onPress={proceedToPayment}
                color="#10b981"
              />
            </View>

            {/* Clear Cart Button */}
            <View style={{ marginTop: 12 }}>
              <Button 
                title="🗑️ Clear Cart" 
                onPress={clearCart}
                color="#ef4444"
              />
            </View>

            {/* Payment Info */}
            <View style={{ backgroundColor: '#f0fdf4', padding: 16, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#22c55e', marginTop: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Ionicons name="shield-checkmark" size={20} color="#16a34a" />
                <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 8, color: '#16a34a' }}>
                  Secure Payment
                </Text>
              </View>
              <Text style={{ fontSize: 14, color: '#16a34a', lineHeight: 20 }}>
                • OTP verification for security{'\n'}
                • Multiple payment options available{'\n'}
                • Cashier approval required{'\n'}
                • Safe and secure transactions
              </Text>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}
