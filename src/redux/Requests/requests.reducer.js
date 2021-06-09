import requestsTypes from "./requests.types";

const INITIAL_STATE = {
  request: {},
  requests: [],
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
  }
};

export default requestsReducer;
