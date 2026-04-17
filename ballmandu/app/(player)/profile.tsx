import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { User, Bell, HelpCircle, Info, ChevronRight, ArrowLeftRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MOCK_PLAYER } from '../../data/mockData';
import { colors } from '../../constants/theme';

const SETTINGS_ROWS = [
  { icon: User, label: 'Edit Profile' },
  { icon: Bell, label: 'Notifications' },
  { icon: HelpCircle, label: 'Help & Support' },
  { icon: Info, label: 'About Ballmandu' },
];

export default function PlayerProfile() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>

        <View className="px-6 pt-4 pb-6">
          <Text className="text-on-surface text-3xl" style={{ fontFamily: 'Manrope_700Bold' }}>
            Profile
          </Text>
        </View>

        {/* Avatar + name */}
        <View className="px-6 mb-8 items-center">
          <View className="w-24 h-24 rounded-full bg-surface-container-highest items-center justify-center mb-4">
            <User size={40} color={colors.primary} />
          </View>
          <Text className="text-on-surface text-2xl" style={{ fontFamily: 'Manrope_700Bold' }}>
            {MOCK_PLAYER.name}
          </Text>
          <Text
            className="text-on-surface-variant text-sm mt-1"
            style={{ fontFamily: 'Inter_400Regular' }}
          >
            Member since {MOCK_PLAYER.memberSince}
          </Text>
        </View>

        {/* Stats row */}
        <View className="px-6 mb-8">
          <View className="bg-surface-container rounded-3xl p-5 flex-row">
            {[
              { label: 'Bookings', value: String(MOCK_PLAYER.totalBookings) },
              { label: 'Hours', value: String(MOCK_PLAYER.hoursPlayed) },
              { label: 'Favorite', value: 'Kicks' },
            ].map((stat, i, arr) => (
              <View
                key={stat.label}
                className={`flex-1 items-center ${i < arr.length - 1 ? 'border-r border-white/5' : ''}`}
              >
                <Text className="text-primary text-2xl" style={{ fontFamily: 'Manrope_700Bold' }}>
                  {stat.value}
                </Text>
                <Text
                  className="text-on-surface-variant text-xs mt-1"
                  style={{ fontFamily: 'Inter_400Regular' }}
                >
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings rows */}
        <View className="px-6 mb-8">
          <View className="bg-surface-container rounded-3xl overflow-hidden">
            {SETTINGS_ROWS.map((row, i) => (
              <TouchableOpacity
                key={row.label}
                className={`flex-row items-center px-5 py-4 ${
                  i < SETTINGS_ROWS.length - 1 ? 'border-b border-white/5' : ''
                }`}
                activeOpacity={0.7}
              >
                <row.icon size={20} color={colors.onSurfaceVariant} />
                <Text
                  className="text-on-surface text-base flex-1 ml-4"
                  style={{ fontFamily: 'Inter_400Regular' }}
                >
                  {row.label}
                </Text>
                <ChevronRight size={18} color={colors.onSurfaceVariant} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Switch mode */}
        <View className="px-6">
          <TouchableOpacity
            onPress={() => router.replace('/')}
            className="flex-row items-center justify-center gap-3 h-14 bg-surface-container rounded-3xl"
            activeOpacity={0.85}
          >
            <ArrowLeftRight size={18} color={colors.primary} />
            <Text className="text-primary text-sm" style={{ fontFamily: 'Inter_500Medium' }}>
              Switch to Court Owner view
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
