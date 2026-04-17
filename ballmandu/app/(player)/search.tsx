import { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CourtCard } from '../../components/player/CourtCard';
import { BookingSheet } from '../../components/player/BookingSheet';
import { MOCK_COURTS } from '../../data/mockData';
import { colors } from '../../constants/theme';
import type { FutsalCourt } from '../../data/mockData';

const FILTERS = ['All', 'Indoor', 'Outdoor', 'Thamel', 'Lalitpur', 'Baneshwor', 'Under Rs.1000'];

export default function PlayerSearch() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCourt, setSelectedCourt] = useState<FutsalCourt | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  const filtered = MOCK_COURTS.filter((court) => {
    const matchesQuery =
      court.name.toLowerCase().includes(query.toLowerCase()) ||
      court.location.toLowerCase().includes(query.toLowerCase());

    if (activeFilter === 'All') return matchesQuery;
    if (activeFilter === 'Under Rs.1000') return matchesQuery && court.pricePerHour < 1000;
    if (['Indoor', 'Outdoor'].includes(activeFilter))
      return matchesQuery && court.amenities.includes(activeFilter);
    const courtArea = court.location.split(',')[0].trim().toLowerCase();
    return matchesQuery && courtArea === activeFilter.toLowerCase();
  });

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>

      {/* Search bar */}
      <View className="px-6 pt-4 pb-4">
        <Text
          className="text-on-surface text-3xl mb-5"
          style={{ fontFamily: 'Manrope_700Bold' }}
        >
          Find Arenas
        </Text>
        <View className="flex-row items-center bg-surface-container-low rounded-2xl px-4 h-14">
          <Search size={20} color={colors.onSurfaceVariant} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search by name or area..."
            placeholderTextColor={colors.onSurfaceVariant}
            className="flex-1 ml-3 text-on-surface text-base"
            style={{ fontFamily: 'Inter_400Regular' }}
            autoFocus={false}
          />
        </View>
      </View>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 12, gap: 8 }}
      >
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-full ${
              activeFilter === f ? 'bg-primary' : 'bg-surface-container-highest'
            }`}
          >
            <Text
              className={`text-sm ${activeFilter === f ? 'text-on-primary' : 'text-on-surface'}`}
              style={{ fontFamily: activeFilter === f ? 'Inter_500Medium' : 'Inter_400Regular' }}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32, gap: 20 }}
      >
        {filtered.length === 0 ? (
          <View className="items-center py-24">
            <Search size={48} color={colors.onSurfaceVariant} style={{ opacity: 0.3 }} />
            <Text
              className="text-on-surface-variant mt-4 text-base"
              style={{ fontFamily: 'Inter_500Medium' }}
            >
              No arenas found
            </Text>
            <Text
              className="text-on-surface-variant text-sm mt-1 opacity-60"
              style={{ fontFamily: 'Inter_400Regular' }}
            >
              Try a different name or filter
            </Text>
          </View>
        ) : (
          filtered.map((court) => (
            <CourtCard
              key={court.id}
              court={court}
              onPress={() => {
                if (!court.isAvailable) return;
                setSelectedCourt(court);
                setSheetVisible(true);
              }}
            />
          ))
        )}
      </ScrollView>

      <BookingSheet
        court={selectedCourt}
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
      />
    </View>
  );
}
