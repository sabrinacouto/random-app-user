import { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import Logo from '../components/splash/Logo';
import DotsLoader from '../components/splash/DotsLoader';
import Texts from '../components/splash/Texts';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  const logoScale   = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const lineWidth   = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textY       = useRef(new Animated.Value(20)).current;
  const dotsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale,   { toValue: 1, tension: 60, friction: 6, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
      Animated.timing(lineWidth,   { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(textOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(textY,       { toValue: 0, tension: 80, friction: 8, useNativeDriver: true }),
      ]),
      Animated.timing(dotsOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(900),
    ]).start(() => navigation.replace('List'));
  }, []);

  return (
    <View style={styles.container}>
      <Logo scale={logoScale} opacity={logoOpacity} />
      <Animated.View style={[styles.line, { transform: [{ scaleX: lineWidth }] }]} />
      <Texts opacity={textOpacity} translateY={textY} />
      <DotsLoader opacity={dotsOpacity} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', gap: 20 },
  line:      { width: 48, height: 2, backgroundColor: '#6c63ff', borderRadius: 2 },
});