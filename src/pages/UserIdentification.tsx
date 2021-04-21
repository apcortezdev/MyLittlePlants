import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Keyboard,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Button from '../components/Button';
import TextHeading from '../components/TextHeading';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface UserIdentificationProps {}

const UserIdentification = (props: UserIdentificationProps) => {
  const navigation = useNavigation();

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isInputFilled, setIsInputFilled] = useState(false);
  const [name, setName] = useState<string>();

  const viwTranslateY = useRef(new Animated.Value(0)).current;
  const viwTranslateYAnimation = {
    transform: [{ translateY: viwTranslateY }],
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    Animated.timing(viwTranslateY, {
      toValue: Dimensions.get('window').height / -6,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const _keyboardDidHide = () => {
    Animated.timing(viwTranslateY, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  function handleInputFocusBlur() {
    setIsInputFocused((focus) => !focus);
  }

  function handleInputChange(value: string) {
    if (value) {
      setIsInputFilled(true);
    } else {
      setIsInputFilled(false);
    }
    setName(value);
  }

  function handleSubmit() {
    navigation.navigate('Confirmation');
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.View style={[styles.content, viwTranslateYAnimation]}>
          <View style={styles.form}>
            <Text style={styles.emoji}>{isInputFilled ? '😄' : '😃'} </Text>
            <TextHeading style={styles.title}>Como podemos {'\n'} chamar você?</TextHeading>
            <TextInput
              style={[
                styles.input,
                (isInputFocused || isInputFilled) && {
                  borderColor: colors.green,
                },
              ]}
              value={name}
              onChangeText={handleInputChange}
              placeholder="Digite o nome"
              onBlur={handleInputFocusBlur}
              onFocus={handleInputFocusBlur}
            />
            <View style={styles.footer}>
              <Button titleText="Confirmar" onPress={handleSubmit} />
            </View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default UserIdentification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 44,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
  },
  footer: {
    marginTop: 40,
  },
});
