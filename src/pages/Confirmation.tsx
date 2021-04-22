import { useNavigation, useRoute } from '@react-navigation/core';
import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import Button from '../components/Button';
import TextComplement from '../components/TextComplement';
import TextHeading from '../components/TextHeading';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ConfirmationProps {}

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen: string;
}

const emojis = {
  hug: '🤗',
  smile: '😁',
};

const Confirmation = (props: ConfirmationProps) => {
  const navigation = useNavigation();
  const routes = useRoute();

  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen,
  } = routes.params as Params;

  function handleStart() {
    navigation.navigate(nextScreen);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>
        <TextHeading style={styles.title}>{title}</TextHeading>
        <TextComplement style={styles.subtitle}>{subtitle}</TextComplement>
        <View style={styles.footer}>
          <Button titleText={buttonTitle} onPress={handleStart} />
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
