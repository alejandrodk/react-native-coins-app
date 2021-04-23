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
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  getAll = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return await AsyncStorage.multiGet(keys);
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
