import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {
  Calendar, TrendingUp, BarChart2, Building2,
  Clock, ArrowLeftRight
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatCard } from '../../components/owner/StatCard';
import { MOCK_OWNER_STATS, MOCK_BOOKINGS } from '../../data/mockData';
import { colors } from '../../constants/theme';

export default function OwnerDashboard() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const todayBookings = MOCK_BOOKINGS.filter(
    (b) => b.date === 'Apr 6, 2026' && (b.status === 'confirmed' || b.status === 'pending')
  );

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>

        {/* Header */}
        <View className="px-6 pt-4 pb-6 flex-row items-start justify-between">
          <View>
            <Text
              className="text-on-surface-variant text-xs uppercase tracking-widest mb-1"
              style={{ fontFamily: 'Inter_500Medium' }}
            >
              Today, Apr 6
            </Text>
            <Text className="text-on-surface text-3xl" style={{ fontFamily: 'Manrope_700Bold' }}>
              Dashboard
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.replace('/')}
            className="h-10 w-10 rounded-full bg-surface-container-highest items-center justify-center mt-1"
          >
            <ArrowLeftRight size={18} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        {/* KPI Cards row 1 */}
        <View className="px-6 mb-3 flex-row gap-3">
          <StatCard
            label="Today's Bookings"
            value={String(MOCK_OWNER_STATS.todayBookings)}
            icon={Calendar}
            color="#d1ff26"
          />
          <StatCard
            label="Today's Revenue"
            value={`Rs. ${MOCK_OWNER_STATS.todayRevenue.toLocaleString()}`}
            icon={TrendingUp}
            color="#d1ff26"
          />
        </View>

        {/* KPI Cards row 2 */}
        <View className="px-6 mb-8 flex-row gap-3">
          <StatCard
            label="Weekly Occupancy"
            value={`${MOCK_OWNER_STATS.weeklyOccupancy}%`}
            icon={BarChart2}
            color="#adaaaa"
          />
          <StatCard
            label="Active Courts"
            value={String(MOCK_OWNER_STATS.activeCourts)}
            icon={Building2}
            color="#adaaaa"
          />
        </View>

        {/* Today's upcoming bookings */}
        <View className="px-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-on-surface text-lg" style={{ fontFamily: 'Manrope_700Bold' }}>
              Upcoming Today
            </Text>
            <TouchableOpacity onPress={() => router.push('/(owner)/bookings')}>
              <Text className="text-primary text-sm" style={{ fontFamily: 'Inter_500Medium' }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <View className="gap-3">
            {todayBookings.length === 0 ? (
              <Text className="text-on-surface-variant text-sm" style={{ fontFamily: 'Inter_400Regular' }}>
                No bookings scheduled for today.
              </Text>
            ) : (
              todayBookings.slice(0, 3).map((booking) => (
                <View
                  key={booking.id}
                  className="bg-surface-container rounded-2xl px-4 py-4 flex-row items-center"
                >
                  <View className="w-10 h-10 rounded-2xl bg-primary/10 items-center justify-center mr-4">
                    <Clock size={18} color={colors.primary} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-on-surface text-sm" style={{ fontFamily: 'Inter_500Medium' }}>
                      {booking.playerName}
                    </Text>
                    <Text className="text-on-surface-variant text-xs mt-0.5" style={{ fontFamily: 'Inter_400Regular' }}>
                      {booking.time} · Rs. {booking.amountNPR.toLocaleString()}
                    </Text>
                  </View>
                  <View className={`rounded-full px-2.5 py-1 ${booking.status === 'confirmed' ? 'bg-primary/15' : 'bg-orange-500/15'}`}>
                    <Text
                      className={`text-xs capitalize ${booking.status === 'confirmed' ? 'text-primary' : 'text-orange-400'}`}
                      style={{ fontFamily: 'Inter_500Medium' }}
                    >
                      {booking.status}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
