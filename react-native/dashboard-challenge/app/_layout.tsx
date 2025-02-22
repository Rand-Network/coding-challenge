import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'

export default function Layout () {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="transaction-detail"
          options={{ presentation: 'modal', title: 'Detail' }}
        />
      </Stack>
    </QueryClientProvider>
  )
}
