import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, Alert } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Header from '../components/Header';
import colors from '../styles/colors';
import waterdrop from '../assets/waterdrop.png';
import TextHeading from '../components/TextHeading';
import { FlatList } from 'react-native-gesture-handler';
import { loadPlant, PlantProps, removePlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { enUS } from 'date-fns/locale';
import PlantCardSecondary from '../components/PlantCardSecondary';
import Load from '../components/Load';

const MyPlants = () => {
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextWatered, setNextWatered] = useState<string>();

  const handleRemove = (plant: PlantProps) => {
    Alert.alert('Remove', `Sure you want to remove this ${plant.name}?`, [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          try {
            await removePlant(plant.id);
            setPlants((plants) =>
              plants.filter((item) => item.id !== plant.id)
            );
          } catch (err) {
            Alert.alert('Ops! Some 💩 just happend! Please try again later!');
          }
        },
      },
    ]);
  };

  useEffect(() => {
    async function loadStorageData() {
      const plantsStorage = await loadPlant();
      const nextTime = formatDistance(
        new Date(plantsStorage[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: enUS }
      );
      setNextWatered(`Water your ${plantsStorage[0].name} in ${nextTime}`);

      setPlants(plantsStorage);
      setLoading(false);
    }
    loadStorageData();
  }, []);

  if (loading) return <Load />;

  return (
    <View style={styles.container}>
      <Header style={styles.header} />
      <View style={styles.spotlight}>
        <Image source={waterdrop} style={styles.spotlightImage} />
        <Text style={styles.spotlightText}>{nextWatered}</Text>
      </View>
      <View style={styles.plants}>
        <TextHeading style={styles.plantsTitle}>Next waterings</TextHeading>
        <FlatList
          data={plants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary
              data={item}
              onPress={() => {}}
              handleRemove={() => handleRemove(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default MyPlants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingTop: 40,
    backgroundColor: colors.background,
  },
  header: {
    marginTop: getStatusBarHeight(),
    marginBottom: 40,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: '100%',
  },
  plantsTitle: {
    fontSize: 24,
    marginVertical: 20,
    lineHeight: 30,
  },
});
