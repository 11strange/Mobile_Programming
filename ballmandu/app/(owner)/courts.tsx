import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, TextInput } from 'react-native';
import { MapPin, Clock } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_COURTS } from '../../data/mockData';
import { colors } from '../../constants/theme';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function OwnerCourts() {
  const insets = useSafeAreaInsets();
  const court = MOCK_COURTS[0];

  const [isOpen, setIsOpen] = useState(true);
  const [availability, setAvailability] = useState<Record<string, boolean>>(
    Object.fromEntries(DAYS.map((d) => [d, d !== 'Mon']))
  );
  const [price, setPrice] = useState(String(court.pricePerHour));
  const [editingPrice, setEditingPrice] = useState(false);

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}>

        <View className="pt-4 pb-6">
          <Text className="text-on-surface text-3xl" style={{ fontFamily: 'Manrope_700Bold' }}>
            My Courts
          </Text>
        </View>

        {/* Court card */}
        <View className="bg-surface-container rounded-3xl p-5 mb-4">
          <View className="flex-row items-start justify-between mb-3">
            <View className="flex-1 mr-4">
              <Text className="text-on-surface text-xl" style={{ fontFamily: 'Manrope_700Bold' }}>
                {court.name}
              </Text>
              <View className="flex-row items-center gap-1.5 mt-1">
                <MapPin size={14} color={colors.onSurfaceVariant} />
                <Text className="text-on-surface-variant text-sm" style={{ fontFamily: 'Inter_400Regular' }}>
                  {court.location}
                </Text>
              </View>
            </View>
            <View className={`rounded-full px-3 py-1 ${isOpen ? 'bg-primary/15' : 'bg-red-500/10'}`}>
              <Text className="text-xs" style={{ fontFamily: 'Inter_500Medium', color: isOpen ? colors.primary : '#ff4444' }}>
                {isOpen ? 'Open' : 'Closed'}
              </Text>
            </View>
          </View>

          <View className="flex-row flex-wrap gap-2 mb-4">
            {court.amenities.map((a) => (
              <View key={a} className="bg-surface-container-highest rounded-full px-3 py-1">
                <Text className="text-on-surface-variant text-xs" style={{ fontFamily: 'Inter_400Regular' }}>{a}</Text>
              </View>
            ))}
          </View>

          <View className="flex-row items-center justify-between bg-surface-container-low rounded-2xl px-4 py-3">
            <Text className="text-on-surface text-sm" style={{ fontFamily: 'Inter_500Medium' }}>Court Status</Text>
            <Switch
              value={isOpen}
              onValueChange={setIsOpen}
              trackColor={{ false: colors.surfaceContainerHighest, true: `${colors.primary}60` }}
              thumbColor={isOpen ? colors.primary : colors.onSurfaceVariant}
            />
          </View>
        </View>

        {/* Price editor */}
        <View className="bg-surface-container rounded-3xl p-5 mb-4">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-on-surface text-base" style={{ fontFamily: 'Manrope_700Bold' }}>Hourly Rate</Text>
            <TouchableOpacity onPress={() => setEditingPrice(!editingPrice)}>
              <Text className="text-primary text-sm" style={{ fontFamily: 'Inter_500Medium' }}>{editingPrice ? 'Save' : 'Edit'}</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-on-surface-variant text-base" style={{ fontFamily: 'Inter_400Regular' }}>Rs.</Text>
            <TextInput
              value={price}
              onChangeText={setPrice}
              editable={editingPrice}
              keyboardType="numeric"
              style={{ fontFamily: 'Manrope_700Bold', color: colors.primary, fontSize: 24, flex: 1 }}
            />
            <Text className="text-on-surface-variant text-sm" style={{ fontFamily: 'Inter_400Regular' }}>/hr</Text>
          </View>
        </View>

        {/* Availability by day */}
        <View className="bg-surface-container rounded-3xl p-5">
          <View className="flex-row items-center gap-2 mb-4">
            <Clock size={18} color={colors.primary} />
            <Text className="text-on-surface text-base" style={{ fontFamily: 'Manrope_700Bold' }}>Weekly Availability</Text>
          </View>
          <View className="gap-3">
            {DAYS.map((day) => (
              <View key={day} className="flex-row items-center justify-between">
                <Text className="text-on-surface text-sm w-12" style={{ fontFamily: 'Inter_500Medium' }}>{day}</Text>
                <Switch
                  value={availability[day]}
                  onValueChange={(val) => setAvailability((prev) => ({ ...prev, [day]: val }))}
                  trackColor={{ false: colors.surfaceContainerHighest, true: `${colors.primary}60` }}
                  thumbColor={availability[day] ? colors.primary : colors.onSurfaceVariant}
                />
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
