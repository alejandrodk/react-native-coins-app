import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import Colors from '../../resources/colors';

const CoinDetailScreen = ({route, navigation}) => {
  const {coin} = route.params;

  navigation.setOptions({title: coin.symbol});

  const getSymbolIcon = coinNameId => {
    if (coinNameId)
      return `https://c1.coinlore.com/img/16x16/${coinNameId}.png`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <Image
          style={styles.iconImg}
          source={{uri: getSymbolIcon(coin.nameid)}}
        />
        <Text style={styles.titleText}>{coin.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1,
  },
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 16,
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 16,
    color: '#FFF',
    marginLeft: 8,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
});

export default CoinDetailScreen;
