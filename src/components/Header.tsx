import * as React from 'react';
import { View, StyleSheet, Image, StyleProp, ViewStyle } from 'react-native';
import userImg from '../../assets/face.png';
import TextComplement from './TextComplement';
import TextHeading from './TextHeading';

interface IProps {
  style?: StyleProp<ViewStyle>;
}

const Header: React.FunctionComponent<IProps> = (props): JSX.Element => {
  return (
    <View style={[styles.container, props.style]}>
      <View>
        <TextComplement style={styles.header}>Olá, </TextComplement>
        <TextHeading style={styles.header}>Tiago</TextHeading>
      </View>
      <Image style={styles.image} source={userImg} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    lineHeight: 36,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
});
