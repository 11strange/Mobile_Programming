import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Footprints, Building2 } from 'lucide-react-native';
import { colors } from '../constants/theme';
import LogoDark from '../assets/logo-dark.svg';

export default function ModeSelector() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background px-6 justify-center">
      <View className="mb-12 items-center">
        <LogoDark width={180} height={60} style={{ marginBottom: 8 }} />
        <Text
          className="text-on-surface-variant text-base"
          style={{ fontFamily: 'Inter_400Regular' }}
        >
          Kathmandu's futsal booking platform
        </Text>
      </View>

      <View className="gap-4">
        <TouchableOpacity
          onPress={() => router.replace('/(player)/')}
          className="bg-surface-container rounded-3xl p-6 border border-white/5"
          activeOpacity={0.85}
        >
          <View className="w-14 h-14 rounded-2xl bg-primary/15 items-center justify-center mb-4">
            <Footprints size={28} color={colors.primary} />
          </View>
          <Text
            className="text-on-surface text-xl mb-1"
            style={{ fontFamily: 'Manrope_700Bold' }}
          >
            I'm a Player
          </Text>
          <Text
            className="text-on-surface-variant text-sm"
            style={{ fontFamily: 'Inter_400Regular' }}
          >
            Browse and book futsal courts near you
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace('/(owner)/')}
          className="bg-surface-container rounded-3xl p-6 border border-white/5"
          activeOpacity={0.85}
        >
          <View className="w-14 h-14 rounded-2xl bg-primary/15 items-center justify-center mb-4">
            <Building2 size={28} color={colors.primary} />
          </View>
          <Text
            className="text-on-surface text-xl mb-1"
            style={{ fontFamily: 'Manrope_700Bold' }}
          >
            I'm a Court Owner
          </Text>
          <Text
            className="text-on-surface-variant text-sm"
            style={{ fontFamily: 'Inter_400Regular' }}
          >
            Manage your courts and view bookings
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mt-12 pt-6 border-t border-white/5 items-center">
        <Text className="text-on-surface-variant text-sm mb-4" style={{ fontFamily: 'Inter_400Regular' }}>
          Already have an account?
        </Text>
        <View className="flex-row gap-4 w-full">
          <TouchableOpacity
            onPress={() => router.push('/(auth)/login')}
            className="flex-1 bg-surface-container-high rounded-full py-4 items-center border border-white/10"
            activeOpacity={0.8}
          >
            <Text className="text-on-surface text-base" style={{ fontFamily: 'Inter_500Medium' }}>
              Log In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/(auth)/register')}
            className="flex-1 bg-primary rounded-full py-4 items-center"
            activeOpacity={0.8}
          >
            <Text className="text-on-primary text-base" style={{ fontFamily: 'Inter_500Medium' }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
