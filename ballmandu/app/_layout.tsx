import '../global.css';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_700Bold,
} from '@expo-google-fonts/manrope';
import {
  Inter_400Regular,
  Inter_500Medium,
} from '@expo-google-fonts/inter';
import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import SplashScreen from '../components/SplashScreen';

export default function RootLayout() {
  const [isSplashAnimationComplete, setIsSplashAnimationComplete] = useState(false);
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_700Bold,
    Inter_400Regular,
    Inter_500Medium,
  });

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#0e0e0e' }}>
      <StatusBar style="light" backgroundColor="#0e0e0e" />
      
      {fontsLoaded ? <Slot /> : <View style={{ flex: 1, backgroundColor: '#0e0e0e' }} />}

      {!isSplashAnimationComplete && (
        <View style={[StyleSheet.absoluteFill, { zIndex: 9999 }]}>
          <SplashScreen onAnimationComplete={() => setIsSplashAnimationComplete(true)} />
        </View>
      )}
    </SafeAreaProvider>
  );
}
