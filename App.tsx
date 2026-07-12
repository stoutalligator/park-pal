import React from 'react';
import { View, ActivityIndicator, Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';
import { Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { AppProvider } from '@/context/AppContext';
import RootNavigator from '@/navigation/RootNavigator';
import { colors, radius, shadows } from '@/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  const app = (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <AppProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );

  if (Platform.OS !== 'web') {
    return app;
  }

  // Constrain to a phone-sized frame on web so the layout isn't stretched full-width.
  return (
    <View style={styles.webBackdrop}>
      <View style={styles.webFrame}>{app}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  webBackdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.textPrimary,
  },
  webFrame: {
    width: '100%',
    maxWidth: 430,
    height: '100%',
    maxHeight: 932,
    borderRadius: radius['2xl'],
    overflow: 'hidden',
    ...shadows.lg,
  },
});
