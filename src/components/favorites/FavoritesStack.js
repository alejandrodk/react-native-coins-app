import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Colors from '../../resources/colors';

import FavoritesScreen from './FavoritesScreen';

const Stack = createStackNavigator();

const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blackPearl,
          shadowOpacity: 0,
        },
        headerTintColor: Colors.white,
      }}>
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};

export default FavoritesStack;
