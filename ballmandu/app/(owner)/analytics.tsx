import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RevenueChart } from '../../components/owner/RevenueChart';
import { MOCK_OWNER_STATS } from '../../data/mockData';
import { colors } from '../../constants/theme';

const WEEK_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TOP_HOURS = [
  { hour: '18:00 – 19:00', bookings: 12 },
  { hour: '19:00 – 20:00', bookings: 18 },
  { hour: '20:00 – 21:00', bookings: 22 },
  { hour: '21:00 – 22:00', bookings: 15 },
  { hour: '17:00 – 18:00', bookings: 9 },
];
const maxBookings = Math.max(...TOP_HOURS.map((h) => h.bookings));

export default function OwnerAnalytics() {
  const insets = useSafeAreaInsets();
  const [range, setRange] = useState<'week' | 'month'>('week');

  const totalRevenue = MOCK_OWNER_STATS.weeklyRevenue.reduce((a, b) => a + b, 0);
  const avgPerDay = Math.round(totalRevenue / 7);
  const peakDayIdx = MOCK_OWNER_STATS.weeklyRevenue.indexOf(Math.max(...MOCK_OWNER_STATS.weeklyRevenue));
  const peakDay = WEEK_LABELS[peakDayIdx];

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}>

        <View className="pt-4 pb-6">
          <Text className="text-on-surface text-3xl" style={{ fontFamily: 'Manrope_700Bold' }}>Analytics</Text>
        </View>

        {/* Range toggle */}
        <View className="flex-row bg-surface-container-highest rounded-2xl p-1 mb-6">
          {(['week', 'month'] as const).map((r) => (
            <TouchableOpacity
              key={r}
              onPress={() => setRange(r)}
              className={`flex-1 h-10 rounded-xl items-center justify-center ${range === r ? 'bg-primary' : ''}`}
            >
              <Text
                className={`text-sm capitalize ${range === r ? 'text-on-primary' : 'text-on-surface-variant'}`}
                style={{ fontFamily: range === r ? 'Inter_500Medium' : 'Inter_400Regular' }}
              >
                This {r === 'week' ? 'Week' : 'Month'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-on-surface text-base mb-4" style={{ fontFamily: 'Manrope_700Bold' }}>Revenue (NPR)</Text>
        <View className="bg-surface-container rounded-3xl p-4 mb-6">
          <RevenueChart data={MOCK_OWNER_STATS.weeklyRevenue} labels={WEEK_LABELS} />
        </View>

        {/* Summary cards */}
        <View className="flex-row gap-3 mb-6">
          {[
            { label: 'Total Revenue', value: `Rs. ${totalRevenue.toLocaleString()}` },
            { label: 'Avg / Day', value: `Rs. ${avgPerDay.toLocaleString()}` },
            { label: 'Peak Day', value: peakDay },
          ].map((stat) => (
            <View key={stat.label} className="flex-1 bg-surface-container rounded-2xl p-4 items-center">
              <Text className="text-primary text-base text-center" style={{ fontFamily: 'Manrope_700Bold' }}>{stat.value}</Text>
              <Text className="text-on-surface-variant text-xs text-center mt-1" style={{ fontFamily: 'Inter_400Regular' }}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Occupancy */}
        <View className="bg-surface-container rounded-3xl p-5 mb-6">
          <Text className="text-on-surface text-base mb-3" style={{ fontFamily: 'Manrope_700Bold' }}>Occupancy Rate</Text>
          <View className="flex-row items-center gap-4">
            <View className="flex-1 h-3 bg-surface-container-highest rounded-full overflow-hidden">
              <View className="h-full bg-primary rounded-full" style={{ width: `${MOCK_OWNER_STATS.weeklyOccupancy}%` }} />
            </View>
            <Text className="text-primary text-xl" style={{ fontFamily: 'Manrope_700Bold' }}>{MOCK_OWNER_STATS.weeklyOccupancy}%</Text>
          </View>
        </View>

        {/* Top booking hours */}
        <Text className="text-on-surface text-base mb-4" style={{ fontFamily: 'Manrope_700Bold' }}>Top Booking Hours</Text>
        <View className="bg-surface-container rounded-3xl p-5 gap-4">
          {TOP_HOURS.sort((a, b) => b.bookings - a.bookings).map((h) => (
            <View key={h.hour}>
              <View className="flex-row items-center justify-between mb-1.5">
                <Text className="text-on-surface text-sm" style={{ fontFamily: 'Inter_400Regular' }}>{h.hour}</Text>
                <Text className="text-on-surface-variant text-xs" style={{ fontFamily: 'Inter_400Regular' }}>{h.bookings} bookings</Text>
              </View>
              <View className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
                <View className="h-full bg-primary rounded-full" style={{ width: `${(h.bookings / maxBookings) * 100}%` }} />
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}
