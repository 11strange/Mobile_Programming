import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Calendar, Clock, MapPin } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_BOOKINGS, MOCK_COURTS } from '../../data/mockData';
import { colors } from '../../constants/theme';

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  confirmed: { bg: '#d1ff2620', text: '#d1ff26' },
  pending: { bg: '#ffa50020', text: '#ffa500' },
  completed: { bg: '#adaaaa20', text: '#adaaaa' },
  cancelled: { bg: '#ff444420', text: '#ff4444' },
};

export default function PlayerBookings() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const myBookingIds = ['b1', 'b2', 'b3', 'b4'];
  const myBookings = MOCK_BOOKINGS.filter((b) => myBookingIds.includes(b.id));

  const upcoming = myBookings.filter((b) => b.status === 'confirmed' || b.status === 'pending');
  const past = myBookings.filter((b) => b.status === 'completed' || b.status === 'cancelled');
  const displayed = activeTab === 'upcoming' ? upcoming : past;

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="px-6 pt-4 pb-4">
        <Text className="text-on-surface text-3xl" style={{ fontFamily: 'Manrope_700Bold' }}>
          My Bookings
        </Text>
      </View>

      {/* Tabs */}
      <View className="flex-row px-6 mb-4 gap-3">
        {(['upcoming', 'past'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`flex-1 h-11 rounded-2xl items-center justify-center ${
              activeTab === tab ? 'bg-primary' : 'bg-surface-container-highest'
            }`}
          >
            <Text
              className={`text-sm capitalize ${activeTab === tab ? 'text-on-primary' : 'text-on-surface-variant'}`}
              style={{ fontFamily: activeTab === tab ? 'Inter_500Medium' : 'Inter_400Regular' }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32, gap: 16 }}
      >
        {displayed.length === 0 ? (
          <View className="items-center py-24">
            <Calendar size={48} color={colors.onSurfaceVariant} style={{ opacity: 0.3 }} />
            <Text
              className="text-on-surface-variant mt-4 text-base"
              style={{ fontFamily: 'Inter_500Medium' }}
            >
              No {activeTab} bookings
            </Text>
          </View>
        ) : (
          displayed.map((booking) => {
            const court = MOCK_COURTS.find((c) => c.id === booking.courtId);
            const statusStyle = STATUS_COLORS[booking.status];
            return (
              <View key={booking.id} className="bg-surface-container-low rounded-3xl overflow-hidden">
                {court && (
                  <Image
                    source={{ uri: court.image }}
                    className="w-full h-32"
                    resizeMode="cover"
                  />
                )}
                <View className="p-5">
                  <View className="flex-row items-start justify-between mb-3">
                    <Text
                      className="text-on-surface text-lg flex-1 mr-3"
                      style={{ fontFamily: 'Manrope_700Bold' }}
                    >
                      {booking.courtName}
                    </Text>
                    <View
                      className="rounded-full px-3 py-1"
                      style={{ backgroundColor: statusStyle.bg }}
                    >
                      <Text
                        className="text-xs uppercase tracking-wider capitalize"
                        style={{ fontFamily: 'Inter_500Medium', color: statusStyle.text }}
                      >
                        {booking.status}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row gap-4">
                    <View className="flex-row items-center gap-1.5">
                      <Calendar size={14} color={colors.onSurfaceVariant} />
                      <Text
                        className="text-on-surface-variant text-sm"
                        style={{ fontFamily: 'Inter_400Regular' }}
                      >
                        {booking.date}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-1.5">
                      <Clock size={14} color={colors.onSurfaceVariant} />
                      <Text
                        className="text-on-surface-variant text-sm"
                        style={{ fontFamily: 'Inter_400Regular' }}
                      >
                        {booking.time}
                      </Text>
                    </View>
                  </View>
                  <Text
                    className="text-primary text-sm mt-2"
                    style={{ fontFamily: 'Manrope_700Bold' }}
                  >
                    Rs. {booking.amountNPR.toLocaleString()}
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}
