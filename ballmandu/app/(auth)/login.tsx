import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Smartphone, LogIn, Lock } from 'lucide-react-native';
import { colors } from '../../constants/theme';
import { supabase } from '../../lib/supabase';
import LogoDark from '../../assets/logo-dark.svg';

export default function Login() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter a valid phone number with country code (e.g., +977...)');
      return;
    }
    
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      phone: phoneNumber,
    });
    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      setIsOtpSent(true);
      Alert.alert('Success', 'OTP sent to your phone number!');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return;
    
    setLoading(true);
    const { data, error } = await supabase.auth.verifyOtp({
      phone: phoneNumber,
      token: otp,
      type: 'sms',
    });
    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
    } else if (data.session) {
      router.replace('/');
    }
  };

  const handleGoogleSignIn = async () => {
    // Note: Expo Auth Session requires configuring the redirect URL depending on the environment.
    // For now we setup the basic implementation that can be expanded with native signin modules.
    Alert.alert('Google Sign-In', 'Google Authentication flow comes here.');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <View className="flex-1 justify-center px-6">
        <View className="items-center mb-10">
          <LogoDark width={160} height={50} style={{ marginBottom: 16 }} />
          <Text className="text-on-surface text-2xl" style={{ fontFamily: 'Manrope_700Bold' }}>
            Welcome Back
          </Text>
          <Text className="text-on-surface-variant text-sm mt-2 text-center" style={{ fontFamily: 'Inter_400Regular' }}>
            Log in to continue booking top futsal courts all around Kathmandu.
          </Text>
        </View>

        <View className="gap-4">
          {!isOtpSent ? (
            <>
              <View className="flex-row items-center bg-surface-container rounded-2xl px-4 py-3 border border-white/5">
                <Smartphone size={20} color={colors.onSurfaceVariant} style={{ marginRight: 10 }} />
                <TextInput
                  className="flex-1 text-on-surface text-base"
                  style={{ fontFamily: 'Inter_400Regular' }}
                  placeholder="Phone number (e.g. +97798...)"
                  placeholderTextColor={colors.onSurfaceVariant}
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  editable={!loading}
                />
              </View>

              <TouchableOpacity
                onPress={handleSendOtp}
                disabled={loading}
                className="bg-primary rounded-2xl py-4 flex-row justify-center items-center mt-2"
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color={colors.onPrimary} />
                ) : (
                  <>
                    <LogIn size={20} color={colors.onPrimary} style={{ marginRight: 8 }} />
                    <Text className="text-on-primary text-base" style={{ fontFamily: 'Manrope_700Bold' }}>
                      Send OTP
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View className="flex-row items-center bg-surface-container rounded-2xl px-4 py-3 border border-white/5">
                <Lock size={20} color={colors.onSurfaceVariant} style={{ marginRight: 10 }} />
                <TextInput
                  className="flex-1 text-on-surface text-base tracking-[0.25em]"
                  style={{ fontFamily: 'Inter_400Regular' }}
                  placeholder="000000"
                  placeholderTextColor={colors.onSurfaceVariant}
                  keyboardType="number-pad"
                  maxLength={6}
                  value={otp}
                  onChangeText={setOtp}
                  editable={!loading}
                />
              </View>

              <TouchableOpacity
                onPress={handleVerifyOtp}
                disabled={loading}
                className="bg-primary rounded-2xl py-4 flex-row justify-center items-center mt-2"
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color={colors.onPrimary} />
                ) : (
                  <Text className="text-on-primary text-base" style={{ fontFamily: 'Manrope_700Bold' }}>
                    Verify & Login
                  </Text>
                )}
              </TouchableOpacity>
            </>
          )}

          <View className="flex-row items-center my-4">
            <View className="flex-1 h-[1px] bg-white/10" />
            <Text className="text-on-surface-variant mx-4 text-sm" style={{ fontFamily: 'Inter_400Regular' }}>or</Text>
            <View className="flex-1 h-[1px] bg-white/10" />
          </View>

          <TouchableOpacity
            onPress={handleGoogleSignIn}
            className="bg-surface-container-high rounded-2xl py-4 flex-row justify-center items-center border border-white/5"
            activeOpacity={0.8}
          >
            <Text className="text-on-surface text-base" style={{ fontFamily: 'Manrope_700Bold' }}>
              Sign In with Google
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-10">
          <Text className="text-on-surface-variant text-sm" style={{ fontFamily: 'Inter_400Regular' }}>
            New to Ballmandu?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text className="text-primary text-sm" style={{ fontFamily: 'Inter_500Medium' }}>
              Create an account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
