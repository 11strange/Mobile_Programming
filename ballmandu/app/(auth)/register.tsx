import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Smartphone, Lock, Eye, EyeOff } from 'lucide-react-native';
import { colors } from '../../constants/theme';
import { supabase } from '../../lib/supabase';
import LogoDark from '../../assets/logo-dark.svg';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterUser = async () => {
    if (!name || !phoneNumber) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setLoading(true);
    // Since phone auth via OTP doesn't formally register a "user profile" in standard auth
    // until the first successful verification, we just send OTP here too and then handle profile updates.
    const { error } = await supabase.auth.signInWithOtp({
      phone: phoneNumber,
      options: {
        data: {
          full_name: name,
        }
      }
    });
    setLoading(false);

    if (error) {
      Alert.alert('Registration Error', error.message);
    } else {
      Alert.alert('Success', 'OTP sent to your phone! Please verify to finish registration.', [
        { text: 'OK', onPress: () => router.replace('/(auth)/login') }
      ]);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 }}>
        <View className="items-center mb-10">
          <LogoDark width={160} height={50} style={{ marginBottom: 16 }} />
          <Text className="text-on-surface text-2xl" style={{ fontFamily: 'Manrope_700Bold' }}>
            Create Account
          </Text>
          <Text className="text-on-surface-variant text-sm mt-2 text-center" style={{ fontFamily: 'Inter_400Regular' }}>
            Join the biggest futsal community in Kathmandu.
          </Text>
        </View>

        <View className="gap-4">
          <View className="flex-row items-center bg-surface-container rounded-2xl px-4 py-3 border border-white/5">
            <User size={20} color={colors.onSurfaceVariant} style={{ marginRight: 10 }} />
            <TextInput
              className="flex-1 text-on-surface text-base"
              style={{ fontFamily: 'Inter_400Regular' }}
              placeholder="Full Name"
              placeholderTextColor={colors.onSurfaceVariant}
              value={name}
              onChangeText={setName}
              editable={!loading}
            />
          </View>

          <View className="flex-row items-center bg-surface-container rounded-2xl px-4 py-3 border border-white/5">
            <Smartphone size={20} color={colors.onSurfaceVariant} style={{ marginRight: 10 }} />
            <TextInput
              className="flex-1 text-on-surface text-base"
              style={{ fontFamily: 'Inter_400Regular' }}
              placeholder="Phone number (+977...)"
              placeholderTextColor={colors.onSurfaceVariant}
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              editable={!loading}
            />
          </View>

          <TouchableOpacity
            onPress={handleRegisterUser}
            disabled={loading}
            className="bg-primary rounded-2xl py-4 flex-row justify-center items-center mt-4"
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color={colors.onPrimary} />
            ) : (
              <Text className="text-on-primary text-base" style={{ fontFamily: 'Manrope_700Bold' }}>
                Sign Up
              </Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            className="bg-surface-container-high rounded-2xl py-4 mt-2 flex-row justify-center items-center border border-white/5"
            activeOpacity={0.8}
            onPress={() => Alert.alert('Google Sign-In', 'Google Authentication flows here.')}
          >
            <Text className="text-on-surface text-base" style={{ fontFamily: 'Manrope_700Bold' }}>
              Sign Up with Google
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-10">
          <Text className="text-on-surface-variant text-sm" style={{ fontFamily: 'Inter_400Regular' }}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-primary text-sm" style={{ fontFamily: 'Inter_500Medium' }}>
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
