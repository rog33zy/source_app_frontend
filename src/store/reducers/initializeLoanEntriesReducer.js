import * as actionTypes from "../actions/actionTypes";

import { updatedObject } from "../utility";

const initialState = {
  loanEntries: [],
  error: null,
  loading: false,
  params: null,
};

const initializeLoanEntriesStarted = (state) => {
  return updatedObject(state, { error: null, loading: true });
};

const initializeLoanEntriesSuccessful = (state, action) => {
  return updatedObject(state, {
    loanEntries: action.initializedLoansModelObjects,
    error: null,
    loading: false,
  });
};

const initializeLoanEntriesFailed = (state, action) => {
  return updatedObject(state, {
    error: action.error,
    loading: false,
  });
};

const setUrlInitParams = (state, action) => {
  return updatedObject(state, {
    params: action.params,
  });
};

const initializeLoanEntriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INITIALIZE_LOAN_ENTRIES_STARTED:
      return initializeLoanEntriesStarted(state);
    case actionTypes.INITIALIZE_LOAN_ENTRIES_SUCCESSFUL:
      return initializeLoanEntriesSuccessful(state, action);
    case actionTypes.INITIALIZE_LOAN_ENTRIES_FAILED:
      return initializeLoanEntriesFailed(state, action);
    case actionTypes.SET_URL_PARAMS:
      return setUrlInitParams(state, action);
    default:
      return state;
  }
};

export default initializeLoanEntriesReducer;
