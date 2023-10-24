import axios from "axios";

const BASE_URL = "http://localhost:8080";

const REGISTER_TASKER = "REGISTER_TASKER";
const LOGIN_TASKER = "LOGIN_TASKER";
const LOGOUT_TASKER = "LOGOUT_TASKER";

const REGISTER_TASKEE = "REGISTER_TASKEE";
const LOGIN_TASKEE = "LOGIN_TASKEE";
const LOGOUT_TASKEE = "LOGOUT_TASKEE";

const registerTasker = (tasker) => ({
  type: REGISTER_TASKER,
  payload: tasker,
});

const loginTasker = (token) => ({
  type: LOGIN_TASKER,
  payload: token,
});

const logoutTasker = (tasker) => ({
  type: LOGOUT_TASKER,
  payload: tasker,
});

export const loginTaskerThunk = (credentials) => async (dispatch) => {
  try {
    const { email, password } = credentials;
    const { data } = await axios
      .post(`${BASE_URL}/auth/auth_tasker/login`, {
        email,
        password,
      })
      .catch((err) => {
        console.log("error: ", err);
        throw new Error(err.message);
      });

    const token = data.token;
    window.sessionStorage.setItem("token", JSON.stringify(token));
    return dispatch(
      loginTasker({
        token,
        isTasker: true,
        isTaskee: false,
      })
    );
  } catch (error) {
    console.error(error);
  }
};

export const logoutTaskerThunk = () => async (dispatch) => {
  dispatch(
    logoutTasker({
      token: "",
      isTasker: false,
      isTaskee: false,
    })
  );
};

export const registerTaskerThunk = (credentials) => async (dispatch) => {
  try {
    const { fName, lName, email, phone, password } = credentials;
    const { data } = await axios
      .post(`${BASE_URL}/auth/auth_tasker/register`, {
        fName,
        lName,
        email,
        phone,
        password,
      })
      .catch((err) => {
        console.error(err.message);
        throw new Error(err.message);
      });

    console.log(`data: `, data);
    return dispatch(registerTasker(data));
  } catch (error) {
    console.error(error);
  }
};

// state
const initialState = {
  user: {
    token: "",
    isTasker: false,
    isTaskee: false,
  },
};

// auth reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_TASKER:
      return { ...state, user: action.payload };
    case LOGIN_TASKER:
      return { ...state, user: action.payload };
    case LOGOUT_TASKER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
