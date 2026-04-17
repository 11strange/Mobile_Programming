import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Check, X } from 'lucide-react-native';
import type { Booking } from '../../data/mockData';
import { colors } from '../../constants/theme';

const STATUS_CONFIG: Record<string, { bg: string; text: string; label: string }> = {
  confirmed: { bg: '#d1ff2620', text: '#d1ff26', label: 'Confirmed' },
  pending: { bg: '#ffa50020', text: '#ffa500', label: 'Pending' },
  completed: { bg: '#adaaaa20', text: '#adaaaa', label: 'Completed' },
  cancelled: { bg: '#ff444420', text: '#ff4444', label: 'Cancelled' },
};

interface BookingRowProps {
  booking: Booking;
}

export function BookingRow({ booking }: BookingRowProps) {
  const [status, setStatus] = useState(booking.status);
  const cfg = STATUS_CONFIG[status];
  const canAct = status === 'pending';

  return (
    <View className="bg-surface-container rounded-2xl p-4">
      <View className="flex-row items-start justify-between mb-2">
        <View className="flex-1 mr-3">
          <Text className="text-on-surface text-base" style={{ fontFamily: 'Inter_500Medium' }}>
            {booking.playerName}
          </Text>
          <Text className="text-on-surface-variant text-sm mt-0.5" style={{ fontFamily: 'Inter_400Regular' }}>
            {booking.courtName}
          </Text>
        </View>
        <View className="rounded-full px-3 py-1" style={{ backgroundColor: cfg.bg }}>
          <Text className="text-xs" style={{ fontFamily: 'Inter_500Medium', color: cfg.text }}>
            {cfg.label}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-on-surface-variant text-xs" style={{ fontFamily: 'Inter_400Regular' }}>
            {booking.date} · {booking.time}
          </Text>
          <Text className="text-primary text-sm mt-1" style={{ fontFamily: 'Manrope_700Bold' }}>
            Rs. {booking.amountNPR.toLocaleString()}
          </Text>
        </View>

        {canAct && (
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => setStatus('confirmed')}
              className="w-9 h-9 rounded-2xl bg-primary/15 items-center justify-center"
            >
              <Check size={16} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setStatus('cancelled')}
              className="w-9 h-9 rounded-2xl bg-red-500/10 items-center justify-center"
            >
              <X size={16} color="#ff4444" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
