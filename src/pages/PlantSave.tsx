import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';
import waterdrop from '../assets/waterdrop.png';
import Button from '../components/Button';
import TextComplement from '../components/TextComplement';
import TextHeading from '../components/TextHeading';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loadPlant, PlantProps, savePlant } from '../libs/storage';

interface PlantSaveProps {}

interface Params {
  plant: PlantProps;
}

const PlantSave = (props: PlantSaveProps) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { plant } = route.params as Params;
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const handleChangeTime = (_: Event, dateTime: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker((state) => !state);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma hora futura! ⏰');
    }

    if (dateTime) {
      setSelectedDateTime(dateTime);
    }
  };

  const openTimePickerAndroid = () => {
    setShowDatePicker((state) => !state);
  };

  const handleSave = async () => {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });

      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle:
          'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
        buttonTitle: 'Muito obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants',
      });
    } catch (err) {
      return Alert.alert(
        'Ops! Deu 💩! Reinicie o seu celular ou compre outro!'
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri={plant.photo} height={150} width={150} />
        <TextHeading style={styles.plantName}>{plant.name}</TextHeading>
        <TextComplement style={styles.plantAbout}>{plant.about}</TextComplement>
      </View>
      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image source={waterdrop} style={styles.tipImage} />
          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>
        <TextComplement style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado:
        </TextComplement>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDateTime}
            mode="time"
            display="spinner"
            onChange={handleChangeTime}
          />
        )}
        {Platform.OS === 'android' && (
          <TouchableOpacity activeOpacity={0.7} onPress={openTimePickerAndroid}>
            <TextComplement style={styles.setTime}>
              <Ionicons name="alarm-outline" size={24} color={colors.heading} />
              {format(selectedDateTime, 'HH:mm')}
            </TextComplement>
          </TouchableOpacity>
        )}
        <Button titleText="Cadastrar Planta" onPress={handleSave} />
      </View>
    </View>
  );
};

export default PlantSave;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace(),
    alignItems: 'center',
  },
  plantName: {
    fontSize: 24,
    marginTop: 15,
    lineHeight: 27,
  },
  plantAbout: {
    textAlign: 'center',
    marginTop: 10,
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 66,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 15,
    textAlign: 'justify',
  },
  alertLabel: {
    fontSize: 13,
    marginBottom: 5,
  },
  setTime: {
    lineHeight: 55,
    paddingVertical: 40,
    fontSize: 24,
  },
});
