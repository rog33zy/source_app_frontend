import * as actionTypes from "../actions/actionTypes";

import { updatedObject } from "../utility";

const initialState = {
  accessToken: null,
  userObject: null,
  error: null,
  loading: false,
};

const authStarted = (state) => {
  return updatedObject(state, { error: null, loading: true });
};

const authSuccessful = (state, action) => {
  return updatedObject(state, {
    accessToken: action.accessToken,
    userObject: action.userObject,
    error: null,
    loading: false,
  });
};

const authFailed = (state, action) => {
  return updatedObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state) => {
  return updatedObject(state, { accessToken: null, userObject: null });
};

// const setAuthRedirectPath = (state, action) => {
//   return updatedObject(state, { authRedirectPath: action.path });
// };
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_STARTED:
      return authStarted(state);
    case actionTypes.AUTH_SUCCESSFUL:
      return authSuccessful(state, action);
    case actionTypes.AUTH_FAILED:
      return authFailed(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    default:
      return state;
  }
};

export default authReducer;
