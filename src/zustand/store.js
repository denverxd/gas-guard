import axios from 'axios';
import {create} from 'zustand';

// const BASE_URL = 'http://192.168.100.60:8000'; // local
const BASE_URL = 'http://rport.thousandminds.com:27741'; // rport

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: null,
  errorData: null,
};

export const useGetData = create(set => ({
  ...initialState,

  execute: async (url, params = {}) => {
    set({...initialState, loading: true});
    try {
      const res = await axios.get(BASE_URL + url, {params});
      set({...initialState, success: true, data: res.data});
    } catch (err) {
      console.error('Error in get data:', err);
      set({...initialState, error: true, errorData: err.message});
    }
  },
}));
export const usePostData = create(set => ({
  ...initialState,

  execute: async (url, data = {}) => {
    set({...initialState, loading: true});
    try {
      const res = await axios.post(BASE_URL + url, data);
      set({...initialState, success: true, data: res.data});
    } catch (err) {
      console.error('Error in post data:', err);
      set({...initialState, error: true, errorData: err.message});
    }
  },
}));

export const usePutData = create(set => ({
  ...initialState,

  execute: async (url, data = {}) => {
    set({...initialState, loading: true});
    try {
      const res = await axios.put(BASE_URL + url, data);
      set({...initialState, success: true, data: res.data});
    } catch (err) {
      console.error('Error in put data:', err);
      set({...initialState, error: true, errorData: err.message});
    }
  },
}));

export const useDeleteData = create(set => ({
  ...initialState,

  execute: async url => {
    set({...initialState, loading: true});
    try {
      const res = await axios.delete(BASE_URL + url);
      set({...initialState, success: true, data: res.data});
    } catch (err) {
      console.error('Error in delete:', err);
      set({...initialState, error: true, errorData: err.message});
    }
  },
}));
