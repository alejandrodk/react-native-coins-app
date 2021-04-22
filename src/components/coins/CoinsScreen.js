import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';

import {API, HttpMethods} from '../../libs/constants';
import Http from '../../libs/http';
import Colors from '../../resources/colors';
import CoinItem from './CoinItem';
import CoinSearch from './CoinsSearch';

const CoinsScreen = props => {
  const [coins, setCoins] = useState(null);
  const [searchCoin, setSearchCoin] = useState(null);

  const handlePress = coin => {
    props.navigation.navigate('CoinDetail', {coin});
  };

  useEffect(() => {
    if (!coins) {
      (async function () {
        const data = await Http.instance.HttpRequest({
          url: API.CURRENCIES,
          method: HttpMethods.GET,
        });
        if (data) setCoins(data.data);
      })();
    }
  }, [coins]);

  const handleSearch = query => {
    if (query && query !== '') {
      const result = coins.filter(
        coin =>
          coin.name.toLowerCase().includes(query.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(query.toLowerCase()),
      );
      if (result) setSearchCoin(result);
    }

    if (query === '') setSearchCoin(null);
  };

  return (
    <View style={styles.container}>
      <CoinSearch onChange={handleSearch} />
      {coins ? (
        <FlatList
          data={searchCoin || coins}
          renderItem={({item}) => (
            <CoinItem onPress={() => handlePress(item)} item={item} />
          )}
        />
      ) : (
        <ActivityIndicator style={styles.loader} color="#459acd" size="large" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  btnText: {
    color: '#FFF',
    textAlign: 'center',
  },
  loader: {
    marginTop: '60%',
  },
});

export default CoinsScreen;
