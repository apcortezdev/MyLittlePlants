import * as React from 'react';
import { Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentButtonProps extends RectButtonProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  active?: boolean;
}

const EnvironmentButton = ({
  title,
  style,
  active = false,
  ...rest
}: EnvironmentButtonProps) => {
  return (
    <RectButton style={[styles.container, active && styles.containerActive, style]}
    {...rest}>
      <Text style={[styles.text, active && styles.textActive]}>
        {title}
      </Text>
    </RectButton>
  );
};

export default EnvironmentButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    paddingVertical: 7,
    height: 40,
    width: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerActive: {
    backgroundColor: colors.green_light,
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.complement,
    fontSize: 13,
  },
  textActive: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
  },
});
