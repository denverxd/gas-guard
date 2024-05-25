export function newNotification(data) {
  return {
    type: '@notification/UPDATE_NOTIFICATION_REQUEST',
    payload: {data},
  };
}

export function pushNotificationSuccess(data) {
  return {
    type: '@notification/UPDATE_NOTIFICATION_SUCCESS',
    payload: {data},
  };
}

export function pushNotificationFailure() {
  return {
    type: '@notification/UPDATE_NOTIFICATION_FAILURE',
  };
}
