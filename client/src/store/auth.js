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


const registerTaskee = (taskee) => ({
	type: REGISTER_TASKEE,
	payload: taskee,
});

const getToken = () => {
	const token = localStorage.getItem("token");
	if (token) {
		return token;
	}
	return null;
};

export const loginTaskerThunk =
	(credentials) => async (dispatch) => {
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

			if (!localStorage.getItem("token")) {
				localStorage.setItem("token", token);
			}

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
	if (localStorage.getItem("token")) {
		localStorage.clear();
	}
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

			const { token } = data;

			if (!localStorage.getItem("token")) {
				localStorage.setItem("token", token);
			}

			return dispatch(
				registerTasker({
					token,
					isTasker: true,
					isTaskee: false,
				})
			);
		} catch (error) {
			console.error(error);
		}
	};

export const loginTaskeeThunk =
	(credentials) => async (dispatch) => {
		try {
			const { email, password } = credentials;
			const { data } = await axios
				.post(`${BASE_URL}/auth/auth_taskee/login`, {
					email,
					password,
				})
				.catch((err) => {
					console.log("error: ", err);
					throw new Error(err.message);
				});

			const token = data.token;

			if (!localStorage.getItem("token")) {
				localStorage.setItem("token", token);
			}

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

export const registerTaskeeThunk =
	(credentials) => async (dispatch) => {
		try {
			const {
				fName,
				lName,
				email,
				password,
				phone,
				city,
				state,
			} = credentials;

			const { data } = await axios
				.post(`${BASE_URL}/auth/auth_taskee/register`, {
					fName,
					lName,
					email,
					phone,
					password,
					city,
					state,
				})
				.catch((err) => {
					console.error(err.message);
					throw new Error(err.message);
				});

			const token = data.token;

			if (!localStorage.getItem("token")) {
				localStorage.setItem("token", token);
			}

			return dispatch(
				registerTaskee({
					token,
					isTaskee: true,
					isTasker: false,
				})
			);
		} catch (error) {
			console.error(error);
		}
	};

// state
const initialState = {
	user: {
		token: getToken(),
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
		case REGISTER_TASKEE:
			return { ...state, user: action.payload };
		case LOGIN_TASKEE:
			return { ...state, user: action.payload };
		default:
			return state;
	}
}
