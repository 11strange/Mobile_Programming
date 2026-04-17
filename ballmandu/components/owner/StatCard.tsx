import { View, Text } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color?: string;
}

export function StatCard({ label, value, icon: Icon, color = '#d1ff26' }: StatCardProps) {
  return (
    <View className="flex-1 bg-surface-container rounded-3xl p-5">
      <View
        className="w-10 h-10 rounded-2xl items-center justify-center mb-3"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon size={20} color={color} />
      </View>
      <Text
        className="text-on-surface text-2xl mb-1"
        style={{ fontFamily: 'Manrope_700Bold' }}
      >
        {value}
      </Text>
      <Text
        className="text-on-surface-variant text-xs"
        style={{ fontFamily: 'Inter_400Regular' }}
      >
        {label}
      </Text>
    </View>
  );
}
