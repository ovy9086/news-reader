import React, { FunctionComponent, PropsWithChildren } from 'react';
import { Pressable, ViewProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withSpring
} from 'react-native-reanimated';

export const PressableCard: FunctionComponent<
  PropsWithChildren<
    ViewProps & {
      onPress?: () => void;
    }
  >
> = ({ children, style, onPress }) => {
  const animationValue = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animationValue.value, [0, 1], [0.95, 1]),
      transform: [
        {
          scale: interpolate(animationValue.value, [0, 1], [0.95, 1])
        }
      ]
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        animationValue.value = withSpring(0);
      }}
      onPressOut={() => {
        animationValue.value = withSpring(1);
      }}
    >
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </Pressable>
  );
};
