import * as actionTypes from "../actions/actionTypes";

import { updatedObject } from "../utility";

const initialState = {
  error: null,
  loading: false,
};

const downloadCSVFileStarted = (state) => {
  return updatedObject(state, { error: null, loading: true });
};

const downloadCSVFileSuccessful = (state) => {
  return updatedObject(state, { error: null, loading: false });
};

const downloadCSVFileFailed = (state, action) => {
  return updatedObject(state, {
    error: action.error,
    loading: false,
  });
};

const downloadCSVFileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DOWNLOAD_CSV_FILE_STARTED:
      return downloadCSVFileStarted(state);
    case actionTypes.DOWNLOAD_CSV_FILE_SUCCESSFUL:
      return downloadCSVFileSuccessful(state);
    case actionTypes.DOWNLOAD_CSV_FILE_FAILED:
      return downloadCSVFileFailed(state, action);
    default:
      return state;
  }
};

export default downloadCSVFileReducer;
