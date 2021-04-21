import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';
import colors from '../styles/colors';
import TextHeading from './TextHeading';

interface PlantCardPrimaryProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  };
}

const PlantCardPrimary = ({ data, ...rest }: PlantCardPrimaryProps) => {
  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri uri={data.photo} width={70} height={70} />
      <TextHeading style={styles.text}>{data.name}</TextHeading>
    </RectButton>
  );
};

export default PlantCardPrimary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '45%',
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    margin: 10,
  },
  text: {
    fontSize: 13,
  },
});
