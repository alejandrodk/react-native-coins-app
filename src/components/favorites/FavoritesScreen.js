import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';

import Color from '../../resources/colors';
import Storage from '../../libs/storage';

import FavoritesEmptyState from './FavoritesEmptyState';
import CoinItem from '../coins/CoinItem';

const FavoritesScreen = props => {
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    const getFavorites = async () => {
      const data = await Storage.instance.getAll();
      data && setFavorites(data);
    };
    props.navigation.addListener('focus', () => {
      getFavorites();
    });

    return () => {
      props.navigation.removeListener('focus', () => {
        getFavorites();
      });
    };
  }, [favorites]);

  const handlePress = coin => {
    props.navigation.navigate('CoinDetail', {coin});
  };

  return (
    <View style={styles.container}>
      {favorites?.length ? (
        <FlatList
          data={favorites}
          renderItem={({item}) => (
            <CoinItem item={item} onPress={() => handlePress(item)} />
          )}
        />
      ) : null}
      {!favorites?.length && <FavoritesEmptyState />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.charade,
  },
  loader: {
    marginTop: '60%',
  },
});

export default FavoritesScreen;
