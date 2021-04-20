import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
  titleText?: string;
  titleIcon?: object;
}

export default function Button({ titleText, titleIcon, ...rest }: ButtonProps) {

  const [screenHeight, setScreenHeight] = useState(0);
  let width = 56;
  const mediumWidth = Dimensions.get('window').width * 0.65;
  const largeWidth = Dimensions.get('window').width * 0.80;

  if (titleText && titleText.length > 1) {
    width = screenHeight > Dimensions.get('window').height * 0.75 ? largeWidth : mediumWidth;
  }

  return (
    <TouchableOpacity
      // @ts-ignore
      style={styles.button(width)}
      activeOpacity={0.7}
      {...rest}
      onLayout={({ nativeEvent }) => {
        setScreenHeight(nativeEvent.layout.y);
      }}
    >
      <Text style={styles.buttonText}>
        {titleIcon && titleIcon}
        {titleText && titleText}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // @ts-ignore
  button: (width: Number) => ({
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    width: width,
    height: 56,
  }),
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.text,
  },
});
