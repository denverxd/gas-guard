import {combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import common from './commonReducer';
import sagas from './sagas';
import {configureStore} from '@reduxjs/toolkit';

const reducer = combineReducers({
  common,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      immutableCheck: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});
sagaMiddleware.run(sagas);

export default store;
