import React, {useState} from 'react';
import {TextInput, Platform, View, StyleSheet} from 'react-native';

import Colors from '../../resources/colors';

const CoinsSearch = props => {
  const {onChange} = props;
  const [query, setQuery] = useState(null);

  const handleText = text => {
    setQuery(text);
    onChange(text);
  };

  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS === 'ios' ? styles.textInputIOS : styles.textInputAndroid,
        ]}
        onChangeText={handleText}
        value={query}
        placeholder="Search coin"
        placeholderTextColor="#FFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    color: '#FFF',
    height: 46,
    backgroundColor: Colors.charade,
    paddingLeft: 16,
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.zircon,
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8,
  },
});

export default CoinsSearch;
