import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import loadAnimation from '../assets/load.json';

const Load = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={loadAnimation}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

export default Load;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    backgroundColor: 'transparent',
    width: 200,
    height: 200,
  },
});
