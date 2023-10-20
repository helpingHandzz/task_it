import axios from "axios";

const BASE_URL = "http://localhost:8080";

const REGISTER_TASKER = "REGISTER_TASKER";
const LOGIN_TASKER = "LOGIN_TASKER";

const addTasker = (tasker) => ({
	type: REGISTER_TASKER,
	payload: tasker,
});

const signinTasker = (tasker) => ({
	type: LOGIN_TASKER,
	payload: tasker,
});

export const loginTaskerThunk =
	(credentials) => async (dispatch) => {
		try {
			const { email, password } = credentials;
			const { data: tasker } = await axios.post(
				`${BASE_URL}/auth/auth_tasker/login`,
				{
					email,
					password,
				}
			);
			console.log(tasker);
			return dispatch(addTasker(tasker));
		} catch (error) {
			console.error(error);
		}
	};

export const registerTaskerThunk =
	(credentials) => async (dispatch) => {
		try {
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
			return dispatch(signinTasker(tasker));
		} catch (error) {
			console.error(error);
		}
	};
