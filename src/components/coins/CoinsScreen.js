import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';

import {API, HttpMethods} from '../../libs/constants';
import Http from '../../libs/http';
import CoinItem from './CoinItem';
import Colors from '../../resources/colors';

const CoinsScreen = props => {
  const [coins, setCoins] = useState(null);

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
        if (data) setCoins(data);
      })();
    }
  }, [coins]);

  return (
    <View style={styles.container}>
      {coins ? (
        <FlatList
          data={coins || []}
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
