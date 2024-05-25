export default function commonReducer(state = [], action) {
  switch (action.type) {
    case "CHECK_INTERNET":
      return {
        ...state,
        isInternetReachable: action.payload,
      };

    default:
      return state;
  }
}
