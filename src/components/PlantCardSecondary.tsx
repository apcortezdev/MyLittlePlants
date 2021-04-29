import { Feather } from '@expo/vector-icons';
import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated from 'react-native-reanimated';
import { SvgFromUri } from 'react-native-svg';
import colors from '../styles/colors';
import TextComplement from './TextComplement';

interface PlantCardSecondaryProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  handleRemove: () => void;
}

const PlantCardSecondary = ({
  data,
  handleRemove,
  ...rest
}: PlantCardSecondaryProps) => {
  return (
    <Swipeable
      overshootRight={false} // turns off swipe to the right
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton style={styles.buttonRemove} onPress={handleRemove}>
              <Feather name="trash" size={24} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={styles.container} {...rest}>
        <SvgFromUri uri={data.photo} width={70} height={70} />
        <TextComplement style={styles.title}>{data.name}</TextComplement>
        <View style={styles.details}>
          <TextComplement style={styles.timeLabel}>Watering at</TextComplement>
          <TextComplement style={styles.time}>{data.hour}</TextComplement>
        </View>
      </RectButton>
    </Swipeable>
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
  title: {},
  timeLabel: {
    fontSize: 13,
    color: colors.body_light,
  },
  time: {
    fontSize: 13,
  },
  buttonRemove: {
    width: Dimensions.get('window').width /4,
    height: 100,
    backgroundColor: colors.red,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: (Dimensions.get('window').width /4) /3,
    paddingVertical: 15,
    borderRadius: 20,
    paddingLeft: 30,
  },
});
