import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleCommonErrorRequest = data => {
  if (
    data.errorData == 'Network Error' ||
    data.errorData.includes('code 404') ||
    data.errorData.includes('code 500')
  ) {
    Alert.alert(
      'Network Error',
      'Please check your internet connection or contact developer.',
    );
    return true;
  }

  return false;
};

export const setStoreData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getStoreData = async (key, value) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};
