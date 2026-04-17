import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  withSequence,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { colors } from '../constants/theme';
import LogoDark from '../assets/logo-dark.svg';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

export default function SplashScreen({ onAnimationComplete }: SplashScreenProps) {
  // Shared values for the ball
  const ballTranslateY = useSharedValue(-height / 2 - 100);
  const ballScale = useSharedValue(1);
  const ballOpacity = useSharedValue(1);

  // Shared values for the ripples
  const ripple1Scale = useSharedValue(0.1);
  const ripple1Opacity = useSharedValue(0);
  const ripple2Scale = useSharedValue(0.1);
  const ripple2Opacity = useSharedValue(0);

  // Shared values for the logo
  const logoOpacity = useSharedValue(0);
  const logoTranslateY = useSharedValue(20);

  // Shared value for the overall container fade out
  const containerOpacity = useSharedValue(1);

  // Easing for water drop
  const dropEasing = Easing.bezier(0.5, 0.01, 0, 1);

  useEffect(() => {
    // 1. Drop the ball
    ballTranslateY.value = withTiming(
      0,
      { duration: 600, easing: dropEasing },
      () => {
        // Once hit, trigger ripples
        
        // Ripple 1
        ripple1Opacity.value = 1;
        ripple1Opacity.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.ease) });
        ripple1Scale.value = withTiming(5, { duration: 1000, easing: Easing.out(Easing.ease) });

        // Ripple 2 (slightly delayed)
        ripple2Opacity.value = withDelay(150, withTiming(1, { duration: 0 }));
        ripple2Opacity.value = withDelay(150, withTiming(0, { duration: 1000, easing: Easing.out(Easing.ease) }));
        ripple2Scale.value = withDelay(150, withTiming(4, { duration: 1000, easing: Easing.out(Easing.ease) }));

        // Make the ball plunge/shrink into water
        ballScale.value = withTiming(0, { duration: 300 });
        ballOpacity.value = withTiming(0, { duration: 300 });

        // Logo floats up and fades in
        logoOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));
        logoTranslateY.value = withDelay(300, withSpring(0, { damping: 12 }));

        // Finally, fade out the whole overlay
        containerOpacity.value = withDelay(
          1500, // wait for 1.5s after drop
          withTiming(0, { duration: 500 }, (finished) => {
            if (finished) {
              runOnJS(onAnimationComplete)();
            }
          })
        );
      }
    );
  }, []);

  const ballStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: ballTranslateY.value },
        { scale: ballScale.value },
      ],
      opacity: ballOpacity.value,
    };
  });

  const ripple1Style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: ripple1Scale.value }],
      opacity: ripple1Opacity.value,
    };
  });

  const ripple2Style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: ripple2Scale.value }],
      opacity: ripple2Opacity.value,
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: logoOpacity.value,
      transform: [{ translateY: logoTranslateY.value }],
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      opacity: containerOpacity.value,
    };
  });

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.container, containerStyle]}>
      <View style={styles.centerStage}>
        {/* Ripples */}
        <Animated.View style={[styles.ripple, styles.ripple1, ripple1Style]} />
        <Animated.View style={[styles.ripple, styles.ripple2, ripple2Style]} />

        {/* The Dropping Ball */}
        <Animated.View style={[styles.ball, ballStyle]} />

        {/* The Logo fading in after drop */}
        <Animated.View style={[styles.logoContainer, logoStyle]}>
           <LogoDark width={200} height={70} />
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0e0e0e', // Brand dark background
    zIndex: 9999, // Ensure it's on top of everything
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerStage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
  },
  ball: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#d1ff26', // Brand neon green
    position: 'absolute',
    // Glow effect
    shadowColor: '#d1ff26',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  ripple: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#d1ff26',
  },
  ripple1: {
    // Opacity handled by animation
  },
  ripple2: {
    // Opacity handled by animation
  },
  logoContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
