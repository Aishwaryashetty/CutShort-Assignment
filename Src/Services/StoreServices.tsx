import AsyncStorage from '@react-native-async-storage/async-storage';

export const store = async (key: any, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('store', error);
  }
};

export const get = async (key: any) => {
  try {
    let response = await AsyncStorage.getItem(key);
    return JSON.parse(response);
  } catch (error) {
    console.log('get', error);
  }
};

export const remove = async (key: any) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('remove', error);
  }
};
