import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useApp } from '@/context/AppContext';
import { RootStackParamList } from './types';
import WelcomeScreen from '@/screens/Welcome/WelcomeScreen';
import OnboardingScreen from '@/screens/Onboarding/OnboardingScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { userProfile } = useApp();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      {!userProfile.onboardingComplete ? (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ animation: 'slide_from_right' }} />
        </>
      ) : null}
      <Stack.Screen name="Main" component={TabNavigator} options={{ animation: 'fade' }} />
    </Stack.Navigator>
  );
}
