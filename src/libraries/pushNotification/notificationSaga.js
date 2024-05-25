import {takeLatest, put, all, fork, takeEvery} from 'redux-saga/effects';
import Notification from './NotificationService';

import {
  pushNotificationSuccess,
  pushNotificationFailure,
} from './notificationActions';

export function* sendPush() {
  yield takeEvery(
    '@notification/UPDATE_NOTIFICATION_REQUEST',
    function* ({payload}) {
      try {
        console.log('loob ng try');
        const notif_data = JSON.parse(payload.data);
        const {orderCode} = payload.data;

        yield put(pushNotificationSuccess(orderCode));

        Notification.configure().localNotification({
          channelId: 'general',
          title: notif_data.title,
          message: notif_data.message,
        });
      } catch (err) {
        yield put(pushNotificationFailure());
      }
    },
  );
}

export default function* rootSaga() {
  yield all([fork(sendPush)]);
}

// export function* sendPush({ payload }) {
//   try {
//     console.log("loob ng try");
//     const { orderCode } = payload.data;

//     yield put(pushNotificationSuccess(orderCode));

//     Notification.configure().localNotification({
//       title: "My app",
//       message: "You have a new push notification!",
//     });
//   } catch (err) {
//     yield put(pushNotificationFailure());
//   }
// }

// export default all([
//   takeLatest("@notification/UPDATE_NOTIFICATION_REQUEST", sendPush),
// ]);
