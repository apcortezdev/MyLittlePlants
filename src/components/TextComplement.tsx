import * as React from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface IProps {
  style?: StyleProp<TextStyle>;
}

const TextComplement: React.FunctionComponent<IProps> = ({style, children}): JSX.Element => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default TextComplement;

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.complement,
    lineHeight: 23,
  },
});
