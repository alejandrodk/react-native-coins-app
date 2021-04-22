import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import Colors from '../../resources/colors';
import Http from '../../libs/http';
import {API} from '../../libs/constants';

import CoinMarketItem from './CoinMarketItem';

const CoinDetailScreen = ({route, navigation}) => {
  const {coin} = route.params;
  const [market, setMarket] = useState(null);

  navigation.setOptions({title: coin.symbol});

  useEffect(async () => {
    if (!market) {
      (async function () {
        const markets = await Http.instance.HttpRequest({
          url: API.COIN_MARKET,
          options: {
            params: {
              id: coin.id,
            },
          },
        });
        setMarket(markets);
      })();
    }
  }, [market]);

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
        style={styles.section}
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
      {market ? (
        <React.Fragment>
          <Text style={styles.marketsTitle}>Markets</Text>
          <FlatList
            style={styles.list}
            keyExtractor={item => `${item.base}-${item.name}-${item.quote}`}
            horizontal={true}
            data={market}
            renderItem={({item}) => <CoinMarketItem item={item} />}
          />
        </React.Fragment>
      ) : (
        <ActivityIndicator style={styles.loader} color="#FFF" size="large" />
      )}
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
  section: {
    maxHeight: 220,
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  marketsTitle: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: '20%',
  },
});

export default CoinDetailScreen;
