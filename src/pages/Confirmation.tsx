import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import Button from '../components/Button';
import TextComplement from '../components/TextComplement';
import TextHeading from '../components/TextHeading';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ConfirmationProps {}

const Confirmation = (props: ConfirmationProps) => {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate('PlantSelect');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>😁</Text>
        <TextHeading style={styles.title}>Prontinho</TextHeading>
        <TextComplement style={styles.subtitle}>
          Agora vamos começar a cuidar de suas plantinhas com muito cuidado.
        </TextComplement>
        <View style={styles.footer}>
          <Button titleText="Começar" onPress={handleStart}/>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 30,
  },
  title: {
    fontSize: 22,
    lineHeight: 38,
    textAlign: 'center',
    marginTop: 25,
  },
  subtitle: {
    textAlign: 'center',
    paddingVertical: 20,
  },
  emoji: {
    fontSize: 78,
  },
  footer: {
    marginTop: 40,
  },
});
