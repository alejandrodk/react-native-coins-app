import React from 'react';
import {View, Text, Image, StyleSheet, SectionList} from 'react-native';

import Colors from '../../resources/colors';

const CoinDetailScreen = ({route, navigation}) => {
  const {coin} = route.params;

  navigation.setOptions({title: coin.symbol});

  const getSymbolIcon = coinNameId => {
    if (coinNameId)
      return `https://c1.coinlore.com/img/16x16/${coinNameId}.png`;
  };

  const getSections = coin => [
    {
      title: 'Market cap',
      data: [coin.market_cap_usd],
    },
    {
      title: 'Volume 24h',
      data: [coin.volume24],
    },
    {
      title: 'Change 24h',
      data: [coin.percent_change_24h],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <Image
          style={styles.iconImg}
          source={{uri: getSymbolIcon(coin.nameid)}}
        />
        <Text style={styles.titleText}>{coin.name}</Text>
      </View>
      <SectionList
        style={styles.sectionHeader}
        sections={getSections(coin)}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1,
  },
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: '#FFF',
    fontSize: 14,
  },
  sectionText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CoinDetailScreen;
