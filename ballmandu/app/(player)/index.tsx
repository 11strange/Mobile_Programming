import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Bell } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CourtCard } from '../../components/player/CourtCard';
import { BookingSheet } from '../../components/player/BookingSheet';
import { MOCK_COURTS, MOCK_PLAYER } from '../../data/mockData';
import { colors } from '../../constants/theme';
import type { FutsalCourt } from '../../data/mockData';

export default function PlayerHome() {
  const insets = useSafeAreaInsets();
  const [selectedCourt, setSelectedCourt] = useState<FutsalCourt | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  const handleCourtPress = (court: FutsalCourt) => {
    if (!court.isAvailable) return;
    setSelectedCourt(court);
    setSheetVisible(true);
  };

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>

        {/* Header */}
        <View className="px-6 pt-4 pb-6 flex-row items-center justify-between">
          <View>
            <Text
              className="text-on-surface-variant text-xs uppercase tracking-widest mb-1"
              style={{ fontFamily: 'Inter_500Medium' }}
            >
              Welcome back
            </Text>
            <Text
              className="text-on-surface text-3xl"
              style={{ fontFamily: 'Manrope_700Bold' }}
            >
              {MOCK_PLAYER.name.split(' ')[0]}
            </Text>
          </View>
          <TouchableOpacity className="w-12 h-12 rounded-full bg-surface-container-highest items-center justify-center">
            <Bell size={22} color={colors.onSurfaceVariant} />
            <View className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background" />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View className="px-6 mb-8">
          <View className="flex-row gap-3">
            {[
              { label: 'Bookings', value: String(MOCK_PLAYER.totalBookings) },
              { label: 'Hours Played', value: String(MOCK_PLAYER.hoursPlayed) },
              { label: 'Upcoming', value: '2' },
            ].map((stat) => (
              <View key={stat.label} className="flex-1 bg-surface-container rounded-2xl p-4 items-center">
                <Text
                  className="text-primary text-2xl mb-1"
                  style={{ fontFamily: 'Manrope_700Bold' }}
                >
                  {stat.value}
                </Text>
                <Text
                  className="text-on-surface-variant text-xs text-center"
                  style={{ fontFamily: 'Inter_400Regular' }}
                >
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Featured Courts */}
        <View className="px-6">
          <Text
            className="text-on-surface text-xl mb-6"
            style={{ fontFamily: 'Manrope_700Bold' }}
          >
            Featured Arenas
          </Text>
          <View className="gap-5">
            {MOCK_COURTS.map((court) => (
              <CourtCard
                key={court.id}
                court={court}
                onPress={() => handleCourtPress(court)}
              />
            ))}
          </View>
        </View>

      </ScrollView>

      <BookingSheet
        court={selectedCourt}
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
      />
    </View>
  );
}
