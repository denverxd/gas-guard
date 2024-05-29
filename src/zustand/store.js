import axios from 'axios';
import {create} from 'zustand';
import {getStoreData} from '../libraries/helpers';
import {Alert} from 'react-native';

// const BASE_URL = 'http://192.168.100.60:8000'; // local
const BASE_URL = 'http://rport.thousandminds.com:27741'; // rport

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: null,
  errorData: null,
};

export const getBaseUrl = async () => {
  let baseUrl = await getStoreData('base_url');
  if (baseUrl?.val) {
    return baseUrl.val;
  }

  return null;
};

export const useGetData = create(set => ({
  ...initialState,

  execute: async (url, params = {}) => {
    const baseUrl = await getBaseUrl();
    if (baseUrl) {
      set({...initialState, loading: true});
      try {
        const res = await axios.get(baseUrl + url, {params});
        set({...initialState, success: true, data: res.data});
      } catch (err) {
        console.error('Error in get data:', err.response);
        set({...initialState, error: true, errorData: err.message});
      }
    } else {
      Alert.alert('Network Error', 'Cannot connect to the gas detector device');
    }
  },
}));
export const usePostData = create(set => ({
  ...initialState,

  execute: async (url, data = {}) => {
    const baseUrl = await getBaseUrl();
    if (baseUrl) {
      set({...initialState, loading: true});
      try {
        const res = await axios.post(baseUrl + url, data);
        set({...initialState, success: true, data: res.data});
      } catch (err) {
        console.error('Error in post data:', err);
        set({...initialState, error: true, errorData: err.message});
      }
    } else {
      Alert.alert('Network Error', 'Cannot connect to the gas detector device');
    }
  },
}));

export const usePostForgotPinData = create(set => ({
  ...initialState,

  execute: async data => {
    const baseUrl = await getBaseUrl();
    if (baseUrl) {
      set({...initialState, loading: true});
      try {
        const res = await axios.post(baseUrl + '/forgot-pin', data);
        set({...initialState, success: true, data: res.data});
      } catch (err) {
        console.error('Error in post data:', err);
        set({...initialState, error: true, errorData: err.message});
      }
    } else {
      Alert.alert('Network Error', 'Cannot connect to the gas detector device');
    }
  },
}));

export const usePutData = create(set => ({
  ...initialState,

  execute: async (url, data = {}) => {
    const baseUrl = await getBaseUrl();
    if (baseUrl) {
      set({...initialState, loading: true});
      try {
        const res = await axios.put(baseUrl + url, data);
        set({...initialState, success: true, data: res.data});
      } catch (err) {
        console.error('Error in put data:', err);
        set({...initialState, error: true, errorData: err.message});
      }
    } else {
      Alert.alert('Network Error', 'Cannot connect to the gas detector device');
    }
  },
}));

export const useDeleteData = create(set => ({
  ...initialState,

  execute: async (url, data = {}) => {
    const baseUrl = await getBaseUrl();
    if (baseUrl) {
      set({...initialState, loading: true});
      try {
        const res = await axios.delete(baseUrl + url, {data});
        set({...initialState, success: true, data: res.data});
      } catch (err) {
        console.error('Error in delete:', err);
        set({...initialState, error: true, errorData: err.message});
      }
    } else {
      Alert.alert('Network Error', 'Cannot connect to the gas detector device');
    }
  },
}));
