import { useState } from 'react';
import {
  View, Text, TouchableOpacity, Modal,
  ScrollView, Alert, Pressable
} from 'react-native';
import { X, Calendar, Clock } from 'lucide-react-native';
import { SlotPicker } from './SlotPicker';
import { colors } from '../../constants/theme';
import { MOCK_BOOKINGS } from '../../data/mockData';
import type { FutsalCourt } from '../../data/mockData';

interface BookingSheetProps {
  court: FutsalCourt | null;
  visible: boolean;
  onClose: () => void;
}

const DATES = [
  { label: 'Today', value: 'Apr 6' },
  { label: 'Tomorrow', value: 'Apr 7' },
  { label: 'Apr 8', value: 'Apr 8' },
  { label: 'Apr 9', value: 'Apr 9' },
  { label: 'Apr 10', value: 'Apr 10' },
];

export function BookingSheet({ court, visible, onClose }: BookingSheetProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const bookedSlots = court && selectedDate
    ? MOCK_BOOKINGS
        .filter(b => b.courtId === court.id && b.date.includes(selectedDate))
        .map(b => b.time.split(' - ')[0])
    : [];

  const getEndTime = (slot: string) => {
    const [h, m] = slot.split(':').map(Number);
    return `${String(h + 1).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  const handleConfirm = () => {
    if (!selectedDate && !selectedSlot) {
      setError('Please select a date and time slot.');
      return;
    }
    if (!selectedDate) {
      setError('Please select a date.');
      return;
    }
    if (!selectedSlot) {
      setError('Please select a time slot.');
      return;
    }
    setError(null);
    Alert.alert(
      'Booking Confirmed!',
      `${court?.name}\n${selectedDate} at ${selectedSlot}\nRs. ${court?.pricePerHour.toLocaleString()}`,
      [{ text: 'OK', onPress: onClose }]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/60" onPress={onClose} />
      <View className="bg-surface-container rounded-t-3xl px-6 pt-4 pb-10 max-h-[80%]">
        {/* Handle */}
        <View className="w-12 h-1 bg-surface-container-highest rounded-full self-center mb-4" />

        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <Text
            className="text-on-surface text-xl"
            style={{ fontFamily: 'Manrope_700Bold' }}
          >
            {court?.name}
          </Text>
          <TouchableOpacity
            onPress={onClose}
            className="w-9 h-9 rounded-full bg-surface-container-highest items-center justify-center"
          >
            <X size={18} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Date row */}
          <Text
            className="text-on-surface-variant text-xs uppercase tracking-wider mb-3"
            style={{ fontFamily: 'Inter_500Medium' }}
          >
            Select Date
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-2">
              {DATES.map((d) => {
                const isSelected = selectedDate === d.value;
                return (
                  <TouchableOpacity
                    key={d.value}
                    onPress={() => { setSelectedDate(d.value); setError(null); }}
                    className={`px-4 py-3 rounded-2xl items-center min-w-[72px] ${
                      isSelected ? 'bg-primary' : 'bg-surface-container-highest'
                    }`}
                  >
                    <Text
                      className={`text-xs mb-0.5 ${isSelected ? 'text-on-primary' : 'text-on-surface-variant'}`}
                      style={{ fontFamily: 'Inter_400Regular' }}
                    >
                      {d.label}
                    </Text>
                    <Text
                      className={`text-sm ${isSelected ? 'text-on-primary' : 'text-on-surface'}`}
                      style={{ fontFamily: 'Inter_500Medium' }}
                    >
                      {d.value}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          <SlotPicker
            selectedSlot={selectedSlot}
            onSelect={(slot) => { setSelectedSlot(slot); setError(null); }}
            bookedSlots={bookedSlots}
          />

          {/* Summary */}
          {selectedDate && selectedSlot && (
            <View className="mt-6 bg-surface-container-low rounded-2xl p-4">
              <View className="flex-row items-center gap-2 mb-2">
                <Calendar size={16} color={colors.primary} />
                <Text className="text-on-surface text-sm" style={{ fontFamily: 'Inter_500Medium' }}>
                  {selectedDate}
                </Text>
              </View>
              <View className="flex-row items-center gap-2 mb-3">
                <Clock size={16} color={colors.primary} />
                <Text className="text-on-surface text-sm" style={{ fontFamily: 'Inter_500Medium' }}>
                  {selectedSlot} – {getEndTime(selectedSlot)}
                </Text>
              </View>
              <Text className="text-on-surface-variant text-xs" style={{ fontFamily: 'Inter_400Regular' }}>
                Total: <Text className="text-primary" style={{ fontFamily: 'Manrope_700Bold' }}>
                  Rs. {court?.pricePerHour.toLocaleString()}
                </Text>
              </Text>
            </View>
          )}
        </ScrollView>

        {error && (
          <Text className="text-red-400 text-sm mt-4 text-center" style={{ fontFamily: 'Inter_400Regular' }}>
            {error}
          </Text>
        )}
        <TouchableOpacity
          onPress={handleConfirm}
          className="mt-3 bg-primary h-14 rounded-2xl items-center justify-center"
          activeOpacity={0.85}
        >
          <Text className="text-on-primary text-base" style={{ fontFamily: 'Manrope_700Bold' }}>
            Confirm Booking
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
