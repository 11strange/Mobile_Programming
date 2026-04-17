import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeftRight } from 'lucide-react-native';
import { colors } from '../../constants/theme';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  showSwitchMode?: boolean;
}

export function ScreenHeader({ title, subtitle, showSwitchMode = false }: ScreenHeaderProps) {
  const router = useRouter();

  return (
    <View className="px-6 pt-4 pb-2 flex-row items-start justify-between">
      <View className="flex-1">
        {subtitle && (
          <Text
            className="text-on-surface-variant text-xs uppercase tracking-widest mb-1"
            style={{ fontFamily: 'Inter_500Medium' }}
          >
            {subtitle}
          </Text>
        )}
        <Text
          className="text-on-surface text-3xl"
          style={{ fontFamily: 'Manrope_700Bold' }}
        >
          {title}
        </Text>
      </View>
      {showSwitchMode && (
        <TouchableOpacity
          onPress={() => router.replace('/')}
          className="h-10 w-10 rounded-full bg-surface-container-highest items-center justify-center mt-1"
        >
          <ArrowLeftRight size={18} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
      )}
    </View>
  );
}
