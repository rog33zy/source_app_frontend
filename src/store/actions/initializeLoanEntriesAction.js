import axios from "../../axios";

import * as actionTypes from "./actionTypes";

import { LoansModel } from "../../models/LoansModel";

const initializeLoanEntriesStartedAction = () => {
  return {
    type: actionTypes.INITIALIZE_LOAN_ENTRIES_STARTED,
  };
};

const initializeLoanEntriesSuccessfulAction = (
  initializedLoansModelObjects
) => {
  return {
    type: actionTypes.INITIALIZE_LOAN_ENTRIES_SUCCESSFUL,
    initializedLoansModelObjects: initializedLoansModelObjects,
  };
};

const initializeLoanEntriesFailedAction = (error) => {
  return {
    type: actionTypes.INITIALIZE_LOAN_ENTRIES_FAILED,
    error: error,
  };
};

export const initializeLoanEntriesAction = (params, accessToken) => {
  return (dispatch) => {
    dispatch(initializeLoanEntriesStartedAction());
    const loansUrl = "api/loans/list_all/";

    axios
      .get(loansUrl + params, {
        headers: { Authorization: `JWT ${accessToken}` },
      })
      .then((response) => {
        const initLoans = response.data.map(
          (responseObj) =>
            new LoansModel(
              responseObj.district,
              responseObj.partner_organization,
              responseObj.total_seed_amount_sold,
              responseObj.total_number_of_loans,
              responseObj.total_initial_amount_paid,
              responseObj.total_seed_owing,
              responseObj.total_amount_owing,
              responseObj.total_seed_quantity_paid,
              responseObj.total_subsequent_amount_paid,
              responseObj.total_seed_quantity_purchased,
              responseObj.total_seed_value_purchased
            )
        );
        dispatch(initializeLoanEntriesSuccessfulAction(initLoans));
      })
      .catch((err) => dispatch(initializeLoanEntriesFailedAction(err)));
  };
};

export const setUrlInitParamsAction = (params) => {
  return {
    type: actionTypes.SET_URL_PARAMS,
    params: params,
  };
};
