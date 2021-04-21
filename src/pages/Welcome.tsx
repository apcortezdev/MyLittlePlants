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
import fonts from '../styles/fonts';
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
          Gerencie {'\n'} suas plantas de {'\n'} forma fácil
        </TextHeading>
        <Image style={styles.image} source={imgWatering} resizeMode="contain" />
        <TextComplement style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
          sempre que precisar.
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
