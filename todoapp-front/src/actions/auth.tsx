import axios from "axios";
import { stopSubmit } from "redux-form";

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "./types";

export const loadUser = () => async (dispatch, state) => {
  dispatch({
    type: USER_LOADING,
  });

  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/auth/user/",
      tokenConfig(state)
    );
    dispatch({
      type: USER_LOADED,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const loginUser = ({ username, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ username, password });

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/auth/logins/",
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
    // Pass server side errors to be displayed.
    dispatch(stopSubmit("loginForm", error.response.data));
  }
};

export const logoutUser = () => async (dispatch, state) => {
  await axios.post(
    "http://127.0.0.1:8000/api/auth/logout/",
    null,
    tokenConfig(state)
  );

  dispatch({
    type: LOGOUT_SUCCESS,
  });
};

export const registerUser = ({ username, email, password }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ username, email, password });

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/auth/register/",
      body,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
    });
    // Helps prevent double registers
    dispatch(stopSubmit("registerForm", error.response.data));
  }
};

// Get and Set Tokens
export const tokenConfig = (state) => {
  const token = state().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};
