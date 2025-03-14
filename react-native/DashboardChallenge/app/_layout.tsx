import { Stack } from 'expo-router';
import { AppProvider } from './context/AppContext';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerShadowVisible: false,
        }}>
        <Stack.Screen 
          name="screens/dashboard/index" 
          options={{ 
            title: 'Dashboard'
          }} 
        />
        <Stack.Screen 
          name="screens/transactions/index" 
          options={{ 
            title: 'Transactions'
          }} 
        />
      </Stack>
    </AppProvider>
  );
}
