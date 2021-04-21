import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import {API, HttpMethods} from '../../libs/constants';
import Http from '../../libs/http';

import CoinItem from './CoinItem';

const CoinsScreen = props => {
  const [coins, setCoins] = useState(null);

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

  const handlePress = () => {
    props.navigation.navigate('CoinDetail');
  };

  return (
    <View style={styles.container}>
      {coins ? (
        <FlatList
          data={coins || []}
          renderItem={({item}) => <CoinItem item={item} />}
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
    backgroundColor: '#e4e4e4',
  },
  btn: {
    padding: 8,
    backgroundColor: '#459acd',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#FFF',
    textAlign: 'center',
  },
  loader: {
    marginTop: "60%",
  },
});

export default CoinsScreen;
