import { View, Text, Image, Pressable } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';
import type { FutsalCourt } from '../../data/mockData';
import { colors } from '../../constants/theme';

interface CourtCardProps {
  court: FutsalCourt;
  onPress: () => void;
}

export function CourtCard({ court, onPress }: CourtCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-surface-container-low rounded-3xl overflow-hidden"
    >
      {/* Image */}
      <View className="relative h-48">
        <Image
          source={{ uri: court.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black/30" />

        {/* Rating badge */}
        <View className="absolute top-3 right-3 flex-row items-center gap-1 bg-black/50 rounded-full px-3 py-1.5">
          <Star size={13} color={colors.primary} fill={colors.primary} />
          <Text
            className="text-on-surface text-xs"
            style={{ fontFamily: 'Inter_500Medium' }}
          >
            {court.rating}
          </Text>
        </View>

        {/* Unavailable overlay */}
        {!court.isAvailable && (
          <View className="absolute bottom-3 left-3 bg-black/70 rounded-full px-3 py-1">
            <Text
              className="text-on-surface-variant text-xs uppercase tracking-wider"
              style={{ fontFamily: 'Inter_500Medium' }}
            >
              Unavailable
            </Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View className="p-5">
        <View className="flex-row items-start justify-between mb-2">
          <Text
            className="text-on-surface text-lg flex-1 mr-2"
            style={{ fontFamily: 'Manrope_700Bold' }}
          >
            {court.name}
          </Text>
          <Text
            className="text-primary text-base"
            style={{ fontFamily: 'Manrope_700Bold' }}
          >
            Rs. {court.pricePerHour.toLocaleString()}/hr
          </Text>
        </View>

        <View className="flex-row items-center gap-1.5 mb-4">
          <MapPin size={14} color={colors.onSurfaceVariant} />
          <Text
            className="text-on-surface-variant text-sm"
            style={{ fontFamily: 'Inter_400Regular' }}
          >
            {court.location}
          </Text>
        </View>

        {/* Amenity chips */}
        <View className="flex-row flex-wrap gap-2 mb-4">
          {court.amenities.slice(0, 3).map((amenity) => (
            <View
              key={amenity}
              className="bg-surface-container-highest rounded-full px-3 py-1"
            >
              <Text
                className="text-on-surface-variant text-xs uppercase tracking-wider"
                style={{ fontFamily: 'Inter_500Medium' }}
              >
                {amenity}
              </Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <View
          className={`h-12 rounded-2xl items-center justify-center ${
            court.isAvailable ? 'bg-primary' : 'bg-surface-container-highest'
          }`}
        >
          <Text
            className={`text-sm ${court.isAvailable ? 'text-on-primary' : 'text-on-surface-variant'}`}
            style={{ fontFamily: 'Manrope_700Bold' }}
          >
            {court.isAvailable ? 'Book Now' : 'Not Available'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
