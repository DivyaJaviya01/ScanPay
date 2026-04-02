# ScanPay - SmartBilling App

A modern React Native mobile application built with Expo that provides a smart billing and shopping cart experience with QR code scanning and payment processing.

## 📱 Features

- **Product Scanning**: Scan QR codes to add products to cart
- **Shopping Cart**: Manage items with real-time updates
- **Bill Generation**: View detailed bills with itemized pricing
- **Payment Processing**: Integrated payment system
- **QR Code Generation**: Generate QR codes for products
- **Cashier System**: Complete point-of-sale functionality
- **Cross-Platform**: Works on iOS, Android, and Web

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Expo Go app (for mobile testing) or Expo CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DivyaJaviya01/ScanPay.git
   cd ScanPay
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the App

#### Option 1: Using Expo Go (Recommended for Mobile)

1. **Start the development server**
   ```bash
   # Recommended: Uses npx (no global installation needed)
   npx expo start
   
   # Alternative: Using npm script (runs expo start internally)
   npm start
   
   # Alternative: Requires global Expo CLI installation
   expo start
   ```

2. **Scan the QR code** with Expo Go app on your iOS or Android device

**Note**: `npx expo start` is the most reliable option as it doesn't require global Expo CLI installation and always uses the compatible version.

#### Option 2: Running on Simulator/Emulator

```bash
# For iOS
npm run ios

# For Android
npm run android
```

#### Option 3: Running on Web

```bash
npm run web
```

## 📋 Available Scripts

- `npm start` - Start the Expo development server (same as `expo start`)
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint for code quality checks
- `npm run reset-project` - Reset project to clean state

## 🔧 TypeScript Configuration

This project is configured with TypeScript support. The `tsconfig.json` includes:

- **Expo Types**: `.expo/types/**/*.ts` and `expo-env.d.ts` for Expo-specific type definitions
- **React Native JSX**: Configured for React Native components
- **Strict Mode**: Enabled for better type safety
- **Module Resolution**: Set to Node.js style resolution

The TypeScript configuration ensures proper autocompletion and type checking for all Expo and React Native APIs.

## 🛠 Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform and SDK
- **React Navigation** - Navigation and routing
- **Expo Camera** - Camera functionality for QR scanning
- **React Native SVG** - SVG rendering for QR codes
- **TypeScript** - Type safety (optional)

## 📁 Project Structure

```
scanpay/
├── components/          # Reusable UI components
│   ├── CustomTabBar.js
│   └── SplashScreen.js
├── screens/            # Main app screens
│   ├── Home.js
│   ├── Scanner.js
│   ├── Bill.js
│   ├── QRCodes.js
│   ├── Payment.js
│   └── Cashier.js
├── utils/              # Utility functions
├── App.js              # Main app component
├── package.json        # Dependencies and scripts
└── app.json           # Expo configuration
```

## 🔧 Development

### Environment Setup

1. **Install Expo CLI globally (optional but recommended)**
   ```bash
   npm install -g @expo/cli
   ```
   *Note: You can also use `npx expo start` without global installation*

2. **For iOS development**, install Xcode (macOS only)
3. **For Android development**, install Android Studio
4. **Verify TypeScript support** - The project includes proper TypeScript configuration for Expo

### Adding New Features

- Components go in `/components`
- Screens go in `/screens`
- Utility functions go in `/utils`

## 📱 Platform-Specific Notes

### iOS
- Requires iOS 11.0 or higher
- Camera permissions required for QR scanning

### Android
- Requires Android 5.0 (API level 21) or higher
- Camera permissions required for QR scanning

### Web
- Limited camera functionality on web
- Some native features may not be available

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npm start -c`
2. **Dependencies not found**: Run `npm install` again
3. **Camera not working**: Check camera permissions in device settings

### Reset Project

To reset the project to a clean state:
```bash
npm run reset-project
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions, please:
- Check the [Expo documentation](https://docs.expo.dev/)
- Create an issue in the GitHub repository
- Contact the development team

---

**Built with ❤️ using Expo and React Native**
