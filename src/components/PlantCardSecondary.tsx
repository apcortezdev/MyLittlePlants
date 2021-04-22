import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';
import colors from '../styles/colors';
import TextComplement from './TextComplement';

interface PlantCardSecondaryProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
}

const PlantCardSecondary = ({ data, ...rest }: PlantCardSecondaryProps) => {
  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri uri={data.photo} width={70} height={70} />
      <TextComplement style={styles.title}>{data.name}</TextComplement>
      <View style={styles.details}>
        <TextComplement style={styles.timeLabel}>Regar às</TextComplement>
        <TextComplement style={styles.time}>{data.hour}</TextComplement>
      </View>
    </RectButton>
  );
};

export default PlantCardSecondary;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  details: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
  },
  timeLabel: {
    fontSize: 13,
    color: colors.body_light,
  },
  time: {
    fontSize: 13,
  },
});
