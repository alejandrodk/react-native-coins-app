import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';

import Colors from '../../resources/colors';
import Http from '../../libs/http';
import {API} from '../../libs/constants';

import CoinMarketItem from './CoinMarketItem';
import Storage from '../../libs/storage';

const CoinDetailScreen = ({route, navigation}) => {
  const {coin} = route.params;
  const [market, setMarket] = useState(null);
  const [favorite, setFavorite] = useState(false);

  navigation.setOptions({title: coin.symbol});

  useEffect(() => {
    if (!market) {
      const getMarkets = async () => {
        const markets = await Http.instance.HttpRequest({
          url: API.COIN_MARKET,
          options: {
            params: {
              id: coin.id,
            },
          },
        });
        markets && setMarket(markets);
      };
      getMarkets();
    }
  }, [market]);

  useEffect(() => {
    const checkFavorite = async () => {
      const isFavorite = await Storage.instance.get(coin.id);
      isFavorite && setFavorite(true);
    };
    checkFavorite();
  }, []);

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

  const handleFavorite = async () => {
    const key = coin.id;

    if (!favorite) {
      const result = await Storage.instance.store(key, coin);
      result && setFavorite(true);
    } else {
      await Storage.instance.remove(key);
      setFavorite(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.row}>
          <Image
            style={styles.iconImg}
            source={{uri: getSymbolIcon(coin.nameid)}}
          />
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>
        <Pressable
          onPress={handleFavorite}
          style={[
            styles.btnFavorite,
            favorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
          ]}>
          <Text style={styles.btnFavoriteText}>
            {favorite ? 'Remove favorite' : 'Add favorite'}
          </Text>
        </Pressable>
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
  row: {
    flexDirection: 'row',
  },
  container: {
    backgroundColor: Colors.charade,
    flex: 1,
  },
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteText: {
    color: Colors.white,
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine,
  },
});

export default CoinDetailScreen;
