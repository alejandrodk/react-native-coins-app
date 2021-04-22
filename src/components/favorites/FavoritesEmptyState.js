import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const FavoritesEmptyState = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Don't have any favorite currency yet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: 'center',
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default FavoritesEmptyState;
