import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import imgWatering from '../assets/watering.png';
import Button from '../components/Button';
import { Feather } from '@expo/vector-icons';
import colors from '../styles/colors';
import { useNavigation } from '@react-navigation/core';
import TextHeading from '../components/TextHeading';
import TextComplement from '../components/TextComplement';

export default function Welcome() {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate('User');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <TextHeading style={styles.title}>
          Manage {'\n'} your plants {'\n'} easily!
        </TextHeading>
        <Image style={styles.image} source={imgWatering} resizeMode="contain" />
        <TextComplement style={styles.subtitle}>
          Never again forget to water your plants. We will take care of
          remembering you anytime!
        </TextComplement>
        <Button
          titleIcon={
            <Feather name="chevron-right" size={24} color={colors.white} />
          }
          onPress={handleStart}
        />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 38,
    lineHeight: 34,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
  },
  image: {
    height: Dimensions.get('window').width * 0.7,
  },
});
