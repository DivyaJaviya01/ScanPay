import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomTabBar = ({ state, descriptors, navigation, cart = [], paymentData = null }) => {
  const animatedValues = useRef(
    state.routes.map(() => new Animated.Value(1))
  ).current;

  const tabs = [
    { name: 'Home', icon: 'home', label: 'Home' },
    { name: 'QRCodes', icon: 'grid', label: 'Product' },
    { name: 'Scanner', icon: 'qr-code', label: 'Scan' },
    { name: 'Bill', icon: 'receipt', label: 'Bill' },
    { name: 'Payment', icon: 'card', label: 'Payment' },
    { name: 'Cashier', icon: 'storefront', label: 'Cashier' }
  ];

  useEffect(() => {
    state.index;
    // Animate all tabs to normal size first
    animatedValues.forEach((anim, index) => {
      Animated.spring(anim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
    });

    // Animate active tab to larger size
    Animated.spring(animatedValues[state.index], {
      toValue: 1.3,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  const getBadgeCount = (tabName) => {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    
    switch (tabName) {
      case 'Bill':
        return totalItems > 0 ? totalItems.toString() : null;
      case 'Payment':
        return paymentData ? '!' : null;
      default:
        return null;
    }
  };

  const renderBadge = (count) => {
    if (!count) return null;
    
    return (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{count}</Text>
      </View>
    );
  };

  const handlePress = (routeName, index) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: routeName,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isFocused = state.index === index;
        const animatedStyle = {
          transform: [{ scale: animatedValues[index] }],
        };
        const badgeCount = getBadgeCount(tab.name);

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => handlePress(tab.name, index)}
            style={styles.tabButton}
            activeOpacity={0.7}
          >
            <Animated.View style={[styles.iconContainer, animatedStyle]}>
              <Ionicons
                name={isFocused ? tab.icon : `${tab.icon}-outline`}
                size={24}
                color={isFocused ? '#fff' : '#a5b4fc'}
              />
              {renderBadge(badgeCount)}
            </Animated.View>
            <Text style={[styles.label, { color: isFocused ? '#fff' : '#a5b4fc' }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#6366f1',
    paddingBottom: 8,
    paddingTop: 12,
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#4f46e5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    position: 'relative',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    zIndex: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomTabBar;
