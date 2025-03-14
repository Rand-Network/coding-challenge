# Dashboard challenge app


## Features

### 📱 User Interface
- View and track all financial transactions
- Detailed transaction modal view
- Offline data persistence
- Pull-to-refresh functionality
- Error handling with graceful fallbacks
- Loading states with skeleton screens

## Technical Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **State Management**: React Context API
- **Storage**: AsyncStorage for offline persistence
- **Styling**: React Native StyleSheet
- **Animations**: React Native Animated API


## State Management

The app uses React Context for global state management, handling:
- Transaction data
- Product data
- Loading states
- Error states
- Balance calculations

## Offline Support

- Transactions and products are cached locally
- Automatic fallback to cached data when offline
- Background sync when connection is restored
- Error handling for failed API requests

## Getting Started

1. Clone the repository

2. Add a .env file containing : 
  ```bash
EXPO_PUBLIC_API_URL=https://628b46b07886bbbb37b46173.mockapi.io/api/v1
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npx expo start
   ```
