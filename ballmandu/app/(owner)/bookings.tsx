import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BookingRow } from '../../components/owner/BookingRow';
import { MOCK_BOOKINGS } from '../../data/mockData';

const FILTER_TABS = ['All', 'Pending', 'Confirmed', 'Cancelled'] as const;
type FilterTab = typeof FILTER_TABS[number];

export default function OwnerBookings() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<FilterTab>('All');

  const filtered = MOCK_BOOKINGS.filter((b) => {
    if (activeTab === 'All') return true;
    return b.status === activeTab.toLowerCase();
  });

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="px-6 pt-4 pb-4">
        <Text className="text-on-surface text-3xl" style={{ fontFamily: 'Manrope_700Bold' }}>
          Bookings
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 12, gap: 8 }}
      >
        {FILTER_TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full ${
              activeTab === tab ? 'bg-primary' : 'bg-surface-container-highest'
            }`}
          >
            <Text
              className={`text-sm ${activeTab === tab ? 'text-on-primary' : 'text-on-surface'}`}
              style={{ fontFamily: activeTab === tab ? 'Inter_500Medium' : 'Inter_400Regular' }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32, gap: 12 }}
      >
        {filtered.map((booking) => (
          <BookingRow key={booking.id} booking={booking} />
        ))}
      </ScrollView>
    </View>
  );
}
