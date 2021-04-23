import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  static instance = new Storage();

  store = async (key, value) => {
    try {
      value = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  get = async key => {
    try {
      const data = await AsyncStorage.getItem(key);
      return JSON.parse(data);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  getAll = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const data = await AsyncStorage.multiGet(keys);
  
      return data.map(([key, value]) => JSON.parse(value));
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  remove = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };
}

export default Storage;
