import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useFrameCallback,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

export default function App() {
  const t = useSharedValue(0);

  // highlight-start
  useFrameCallback((frameInfo) => {
    t.value = frameInfo.timeSinceFirstFrame / 350;
  });
  // highlight-end

  const infinityStyle = useAnimatedStyle(() => {
    const scale = (2 / (3 - Math.cos(2 * t.value))) * 60;
    return {
      transform: [
        { translateX: scale * Math.cos(t.value) },
        { translateY: scale * (Math.sin(2 * t.value) / 2) },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, infinityStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#b58df1',
    position: 'absolute',
  },
});
