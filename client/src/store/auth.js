import axios from "axios";

const BASE_URL = "http://localhost:8080";

const REGISTER_TASKER = "REGISTER_TASKER";
const LOGIN_TASKER = "LOGIN_TASKER";
const LOGOUT_TASKER = "LOGOUT_TASKER";

const REGISTER_TASKEE = "REGISTER_TASKEE";
const LOGIN_TASKEE = "LOGIN_TASKEE";
const LOGOUT_TASKEE = "LOGOUT_TASKEE";

// TASKER

const registerTasker = (tasker) => ({
	type: REGISTER_TASKER,
	payload: tasker,
});

const loginTasker = (tasker) => ({
	type: LOGIN_TASKER,
	payload: tasker,
});

const logoutTasker = (tasker) => ({
	type: LOGOUT_TASKER,
	payload: tasker,
});

// TASKEE

const registerTaskee = (taskee) => ({
	type: REGISTER_TASKEE,
	payload: taskee,
});

const loginTaskee = (taskee) => ({
	type: LOGIN_TASKEE,
	payload: taskee,
});

const logoutTaskee = (taskee) => ({
	type: LOGOUT_TASKEE,
	payload: taskee,
});

export const loginTaskerThunk =
	(credentials) => async (dispatch) => {
		try {
			const { email, password } = credentials;
			const res = await axios
				.post(`${BASE_URL}/auth/auth_tasker/login`, {
					email,
					password,
				})
				.catch((err) => {
					console.log("error: ", err);
					return;
				});

			console.log(`res: `, res);
			return dispatch(loginTasker(res));
		} catch (error) {
			console.error(error);
		}
	};

export const registerTaskerThunk =
	(credentials) => async (dispatch) => {
		try {
			console.log(`credentials: `, credentials);
			const { fName, lName, email, phone, password } =
				credentials;
			const { data: tasker } = await axios.post(
				`${BASE_URL}/auth/auth_tasker/register`,
				{
					fName,
					lName,
					email,
					phone,
					password,
				}
			);
			console.log(tasker);
			return dispatch(registerTasker(tasker));
		} catch (error) {
			console.error(error);
		}
	};

	export const loginTaskeeThunk =
	(credentials) => async (dispatch) => {
		try {
			const { email, password } = credentials;
			const res = await axios
				.post(`${BASE_URL}/auth/auth_taskee/login`, {
					email,
					password,
				})
				.catch((err) => {
					console.log("error: ", err);
					return;
				});

			console.log(`res: `, res);
			return dispatch(loginTaskee(res));
		} catch (error) {
			console.error(error);
		}
	};

export const registerTaskeeThunk =
	(credentials) => async (dispatch) => {
		try {
			console.log(`credentials: `, credentials);
			const { fName, lName, email, phone, password } =
				credentials;
			const { data: taskee } = await axios.post(
				`${BASE_URL}/auth/auth_taskee/register`,
				{
					fName,
					lName,
					email,
					phone,
					password,
				}
			);
			console.log(taskee);
			return dispatch(registerTaskee(taskee));
		} catch (error) {
			console.error(error);
		}
	};

const initialState = {
	user: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case REGISTER_TASKER:
			return { ...state, user: action.payload };
		case LOGIN_TASKER:
			return { ...state, user: action.payload };
		case LOGOUT_TASKER:
			return { ...state, user: null };
		case REGISTER_TASKEE:
			return { ...state, user: action.payload };
		case LOGIN_TASKEE:
			return { ...state, user: action.payload };
		case LOGOUT_TASKEE:
			return { ...state, user: null };
		default:
			return state;
	}
}
