import produce from 'immer';

const NOTIFICATION_INITIAL_STATE = {
  notification: {},
};

export default function notification(
  state = NOTIFICATION_INITIAL_STATE,
  action,
) {
  return produce(state, draft => {
    switch (action.type) {
      case '@notification/UPDATE_NOTIFICATION_SUCCESS': {
        draft.notification = action.payload;
        break;
      }
      case '@notification/UPDATE_NOTIFICATION_FAILURE': {
        break;
      }
      case '@notification/UPDATE_NOTIFICATION': {
        console.tron.log('action called', action.payload);
        break;
      }
      default:
    }
  });
}
