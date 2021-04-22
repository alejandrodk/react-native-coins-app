import React from 'react';
import {View, StyleSheet} from 'react-native';

import Color from '../../resources/colors';

import FavoritesEmptyState from './FavoritesEmptyState';

const FavoritesScreen = props => {
  return (
    <View style={styles.container}>
      <FavoritesEmptyState />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.charade,
  },
});

export default FavoritesScreen;
