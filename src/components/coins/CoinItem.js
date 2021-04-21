import React from 'react';
import {View, Pressable, Text, Image, StyleSheet, Platform} from 'react-native';

import Colors from '../../resources/colors';

const CoinItem = ({item, onPress}) => {
  const getImageArrow = () => {
    if (item.percent_change_1h > 0) {
      return require('../../assets/arrow_up.png');
    }
    return require('../../assets/arrow_down.png');
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percent_change_1h}</Text>
        <Image style={styles.imageIcon} source={getImageArrow()} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 0.2,
    marginLeft: Platform.OS === 'ios' ? 0 : 16,
    paddingLeft: Platform.OS === 'ios' ? 16 : 0,
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
    marginRight: 8,
  },
  priceText: {
    color: '#FFF',
    fontSize: 14,
  },
  imageIcon: {
    width: 20,
    height: 20,
  },
});

export default CoinItem;
