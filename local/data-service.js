import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('Retrieved value:', value);
        return JSON.parse(value);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
};  

export async function storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      console.log('Data stored successfully');
    } catch (error) {
      console.error('Error storing data:', error);
    }
};

export async function removeData(key) {
    try {
      await AsyncStorage.removeItem(key);
      console.log('Data removed');
    } catch (error) {
      console.error('Error removing data:', error);
    }
  };
  