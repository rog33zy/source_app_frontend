import axios from "../../axios";

import * as actionTypes from "./actionTypes";

const FileDownload = require("js-file-download");

export const downloadCSVFileStartedAction = () => {
  return {
    type: actionTypes.DOWNLOAD_CSV_FILE_STARTED,
  };
};

export const downloadCSVFileSuccessfulAction = () => {
  return {
    type: actionTypes.DOWNLOAD_CSV_FILE_SUCCESSFUL,
  };
};

export const downloadCSVFileFailedAction = (error) => {
  return {
    type: actionTypes.DOWNLOAD_CSV_FILE_FAILED,
    error: error,
  };
};

export const downloadCSVFileAction = (content, accessToken) => {
  return (dispatch) => {
    dispatch(downloadCSVFileStartedAction());
    const downloadCSVFileUrl = `api/${content}/download_csv/`;

    axios
      .get(downloadCSVFileUrl, {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
        responseType: "blob",
      })
      .then((response) => {
        FileDownload(response.data, `source_${content}.csv`);
        dispatch(downloadCSVFileSuccessfulAction());
      })
      .catch((err) => {
        dispatch(downloadCSVFileFailedAction(err));
      });
  };
};
