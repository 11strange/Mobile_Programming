import { View, Text, TouchableOpacity } from 'react-native';
import { TIME_SLOTS } from '../../data/mockData';

interface SlotPickerProps {
  selectedSlot: string | null;
  onSelect: (slot: string) => void;
  bookedSlots?: string[];
}

export function SlotPicker({ selectedSlot, onSelect, bookedSlots = [] }: SlotPickerProps) {
  return (
    <View>
      <Text
        className="text-on-surface-variant text-xs uppercase tracking-wider mb-3"
        style={{ fontFamily: 'Inter_500Medium' }}
      >
        Select Time Slot
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {TIME_SLOTS.map((slot) => {
          const isSelected = selectedSlot === slot;
          const isBooked = bookedSlots.includes(slot);
          return (
            <TouchableOpacity
              key={slot}
              onPress={() => !isBooked && onSelect(slot)}
              disabled={isBooked}
              className={`px-4 py-2.5 rounded-2xl ${
                isBooked
                  ? 'bg-surface-container opacity-40'
                  : isSelected
                  ? 'bg-primary'
                  : 'bg-surface-container-highest'
              }`}
            >
              <Text
                className={`text-sm ${
                  isBooked
                    ? 'text-on-surface-variant line-through'
                    : isSelected
                    ? 'text-on-primary'
                    : 'text-on-surface'
                }`}
                style={{ fontFamily: isSelected ? 'Inter_500Medium' : 'Inter_400Regular' }}
              >
                {slot}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
