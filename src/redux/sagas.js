import notificationSaga from '../libraries/pushNotification/notificationSaga';
import {all} from 'redux-saga/effects';

export default function* rootSaga(getState) {
  yield all([notificationSaga()]);
}
