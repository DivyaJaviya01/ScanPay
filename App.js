import { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SplashScreen from './components/SplashScreen';
import CustomTabBar from './components/CustomTabBar';
import Home from './screens/Home';
import Scanner from './screens/Scanner';
import Bill from './screens/Bill';
import QRCodes from './screens/QRCodes';
import Payment from './screens/Payment';
import Cashier from './screens/Cashier';

const Tab = createBottomTabNavigator();

export default function App() {
  const [cart, setCart] = useState([]);
  const [paymentData, setPaymentData] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  const handlePaymentComplete = () => {
    setPaymentData(null);
    // Payment completed, cart is cleared in Payment component
  };

  const handlePaymentCancel = () => {
    setPaymentData(null);
    // Payment cancelled, return to main app
  };

  const proceedToPayment = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setPaymentData({ cart: [...cart] });
  };

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6366f1',
          },
          headerTintColor: '#fff',
          headerShown: true,
        }}
      >
        <Tab.Screen 
          name="Home" 
          options={{
            title: 'SmartBilling',
            headerTitle: 'SmartBilling',
          }}
        >
          {() => <Home cart={cart} setCart={setCart} paymentData={paymentData} />}
        </Tab.Screen>
        
        <Tab.Screen 
          name="QRCodes" 
          options={{
            title: 'QR Codes',
            headerTitle: 'QR Codes',
          }}
        >
          {() => <QRCodes paymentData={paymentData} />}
        </Tab.Screen>
        
        <Tab.Screen 
          name="Scanner" 
          options={{
            title: 'Scan Product',
            headerTitle: 'Scan Product',
          }}
        >
          {() => <Scanner cart={cart} setCart={setCart} paymentData={paymentData} />}
        </Tab.Screen>
        
        <Tab.Screen 
          name="Bill" 
          options={{
            title: 'View Bill',
            headerTitle: 'View Bill',
          }}
        >
          {() => <Bill cart={cart} setCart={setCart} onProceedToPayment={proceedToPayment} paymentData={paymentData} />}
        </Tab.Screen>

        <Tab.Screen 
          name="Payment" 
          options={{
            title: 'Payment',
            headerTitle: 'Payment',
          }}
        >
          {() => paymentData ? (
            <Payment 
              cart={paymentData.cart} 
              setCart={setCart} 
              onPaymentComplete={handlePaymentComplete}
              onCancel={handlePaymentCancel}
            />
          ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>No active payment</Text>
            </View>
          )}
        </Tab.Screen>

        <Tab.Screen 
          name="Cashier" 
          options={{
            title: 'Cashier System',
            headerTitle: 'Cashier System',
          }}
        >
          {() => <Cashier paymentData={paymentData} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
