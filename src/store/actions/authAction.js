import axios from "axios";

import * as actionTypes from "./actionTypes";

import jwt_decode from "jwt-decode";

import { AUTHENTICATION_BASE_URL } from "../../constants/urls/BaseUrls";

export const authStartAction = () => {
  return {
    type: actionTypes.AUTH_STARTED,
  };
};

export const authSuccessAction = (accessToken, userObject) => {
  return {
    type: actionTypes.AUTH_SUCCESSFUL,
    accessToken: accessToken,
    userObject: userObject,
  };
};

export const authFailAction = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  };
};

export const logoutAction = () => {
  localStorage.removeItem("gnaAuthenticated", false);
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeoutAction = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logoutAction());
    }, expirationTime * 1000);
  };
};

export const authAction = (usernameOrEmail, password) => {
  return (dispatch) => {
    dispatch(authStartAction());
    let authData;
    if (usernameOrEmail.includes(".com")) {
      const email = usernameOrEmail;
      authData = {
        email: email,
        password: password,
      };
    } else {
      const username = usernameOrEmail;
      authData = {
        username: username,
        password: password,
      };
    }
    axios
      .post(AUTHENTICATION_BASE_URL + "api/authenticate/login/", authData)
      .then((response) => {
        const expirationDate = new Date(
          response.data.refresh_token_expiry_date
        );

        localStorage.setItem("gnaAuthenticated", true);
        localStorage.setItem("expirationDate", expirationDate);

        const accessToken = response.data.access_token;
        const userObject = jwt_decode(accessToken)["user"];

        dispatch(authSuccessAction(accessToken, userObject));
        checkAuthTimeoutAction(
          (new Date(response.data.refresh_token_expiry_date).getTime() -
            new Date().getTime()) /
            1000
        );
      })
      .catch((err) => {
        dispatch(
          authFailAction(
            "login credentials were wrong, please verify and try again."
          )
          // authFail(err)
        );
      });
  };
};

export const authRefreshAction = () => {
  return (dispatch) => {
    axios
      .post(AUTHENTICATION_BASE_URL + "api/authenticate/get_refresh_token/")
      .then((response) => {
        const accessToken = response.data.access_token;
        const userObject = jwt_decode(accessToken)["user"];
        dispatch(authSuccessAction(accessToken, userObject));
      })
      .catch((err) => {
        dispatch(authFailAction(err));
      });
  };
};

export const authCheckStateAction = () => {
  return (dispatch) => {
    const isAuthenticated = localStorage.getItem("gnaAuthenticated");
    if (!isAuthenticated) {
      dispatch(logoutAction());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        dispatch(authRefreshAction());
        checkAuthTimeoutAction(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        );
      } else {
        dispatch(logoutAction());
      }
    }
  };
};
