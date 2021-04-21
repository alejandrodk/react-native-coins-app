import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const CoinItem = ({item}) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <Text style={styles.symbolText}>{item.symbol}</Text>
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
    </View>

    <View style={styles.row}>
      <Text style={styles.percentText}>{item.percent_change_1h}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: '#FFF',
    fontSize: 14,
    marginRight: 16,
  },
  percentText: {
    color: '#FFF',
    fontSize: 12,
  },
  priceText: {
    color: '#FFF',
    fontSize: 14,
  },
});

export default CoinItem;
