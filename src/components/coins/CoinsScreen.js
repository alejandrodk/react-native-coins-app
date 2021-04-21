import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

const CoinsScreen = props => {
  const handlePress = () => {
    props.navigation.navigate("CoinDetail")
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
