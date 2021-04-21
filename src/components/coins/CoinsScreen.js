import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {API, HttpMethods} from '../../libs/constants';
import Http from '../../libs/http';

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
      <Text>Coins Screen 🚀</Text>
      <Pressable style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnText}>Detail</Text>
      </Pressable>
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
});

export default CoinsScreen;
