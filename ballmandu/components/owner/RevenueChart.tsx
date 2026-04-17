import { View, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { colors } from '../../constants/theme';

interface RevenueChartProps {
  data: number[];
  labels: string[];
}

const screenWidth = Dimensions.get('window').width - 48;

export function RevenueChart({ data, labels }: RevenueChartProps) {
  return (
    <BarChart
      data={{
        labels,
        datasets: [{ data }],
      }}
      width={screenWidth}
      height={180}
      yAxisLabel="Rs."
      yAxisSuffix=""
      fromZero
      chartConfig={{
        backgroundColor: colors.surfaceContainer,
        backgroundGradientFrom: colors.surfaceContainer,
        backgroundGradientTo: colors.surfaceContainer,
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(209, 255, 38, ${opacity})`,
        labelColor: () => colors.onSurfaceVariant,
        barPercentage: 0.6,
        propsForBackgroundLines: {
          stroke: colors.surfaceContainerHighest,
        },
      }}
      style={{ borderRadius: 16 }}
      showValuesOnTopOfBars={false}
      withInnerLines
    />
  );
}
