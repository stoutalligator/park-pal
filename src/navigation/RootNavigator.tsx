import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useApp } from '@/context/AppContext';
import { RootStackParamList } from './types';
import WelcomeScreen from '@/screens/Welcome/WelcomeScreen';
import AuthScreen from '@/screens/Auth/AuthScreen';
import TabNavigator from './TabNavigator';
import { colors } from '@/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { session, authLoading } = useApp();

  if (authLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      {session ? (
        <Stack.Screen name="Main" component={TabNavigator} options={{ animation: 'fade' }} />
      ) : (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} options={{ animation: 'slide_from_right' }} />
        </>
      )}
    </Stack.Navigator>
  );
}
