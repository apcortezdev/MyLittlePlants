import React, { useEffect, useRef, useState } from 'react';
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
  const touchRef = useRef(null);
  const [positionHeight, setPositionHeight] = useState<number>(0);

  let width = 56;
  const mediumWidth = Dimensions.get('window').width * 0.65;
  const largeWidth = Dimensions.get('window').width * 0.8;

  if (titleText && titleText.length > 1) {
    width =
      positionHeight > Dimensions.get('window').height * 0.75
        ? largeWidth
        : mediumWidth;
  }

  useEffect(() => {
    if (touchRef.current) {
      // @ts-ignore
      touchRef.current.measure((fx, fy, width, height, px, py: number) => {
        setPositionHeight(py);
      });
    }
  }, [positionHeight]);

  return (
    <TouchableOpacity
      // @ts-ignore
      style={styles.button(width)}
      ref={touchRef}
      activeOpacity={0.7}
      {...rest}
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
