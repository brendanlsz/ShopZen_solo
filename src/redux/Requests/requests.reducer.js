import requestsTypes from "./requests.types";

const INITIAL_STATE = {
  request: {},
  requests: [],
  userRequests: [],
  recRequests: [],
  homepageRequests: [],
};

const requestsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
      };
    case requestsTypes.SET_REQUESTS:
      return {
        ...state,
        requests: action.payload,
      };
    case requestsTypes.SET_REQUEST:
      return {
        ...state,
        request: action.payload,
      };
    case requestsTypes.SET_USER_REQUESTS:
      return {
        ...state,
        userRequests: action.payload,
      };
    case requestsTypes.SET_REC_REQUESTS:
      return {
        ...state,
        recRequests: action.payload,
      };
    case requestsTypes.SET_HOMEPAGE_REQUESTS:
      return {
        ...state,
        homepageRequests: action.payload,
      };
  }
};

export default requestsReducer;
