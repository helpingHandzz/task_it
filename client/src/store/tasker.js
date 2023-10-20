import axios from "axios";

const BASE_URL = "http://localhost:8080";

const GET_TASKERS = "GET_TASKERS";
const GET_TASKER = "GET_TASKER";
const GET_TASKER_REVIEWS = "GET_TASKER_REVIEWS";

const REGISTER_TASKER = "REGISTER_TASKER";
const LOGIN_TASKER = "LOGIN_TASKER";

const getTaskers = (taskers) => ({
	type: GET_TASKERS,
	payload: taskers,
});

const getTasker = (tasker) => ({
	type: GET_TASKER,
	payload: tasker,
});

const getTaskerReviews = (taskerReviews) => ({
	type: GET_TASKER_REVIEWS,
	payload: taskerReviews,
});

const addTasker = (tasker) => ({
	type: REGISTER_TASKER,
	payload: tasker,
});

const signinTasker = (tasker) => ({
	type: LOGIN_TASKER,
	payload: tasker,
});

export const getTaskersThunk = () => async (dispatch) => {
	try {
		const { data: taskers } = await axios.get(
			`${BASE_URL}/api/tasker`
		);
		console.log("data", taskers);
		return dispatch(getTaskers(taskers));
	} catch (error) {
		console.error(error);
	}
};

export const getTaskerThunk = (id) => async (dispatch) => {
	try {
		const { data: tasker } = await axios.get(
			`${BASE_URL}/api/tasker/${id}`
		);
		console.log("data", tasker);
		return dispatch(getTasker(tasker));
	} catch (error) {
		console.error(error);
	}
};

export const getTaskerReviewsThunk =
	(id) => async (dispatch) => {
		try {
			const { data: taskerReview } = await axios.get(
				`${BASE_URL}/api/taskers/reviews/${id}`
			);
			console.log("data", taskerReview);
			return dispatch(getTaskerReviews(taskerReview));
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
			return dispatch(addTasker(tasker));
		} catch (error) {
			console.error(error);
		}
	};

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

const initialState = {
	allTaskers: [],
	singleTasker: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_TASKERS:
			return { ...state, allTaskers: action.payload };
		case GET_TASKER:
			return { ...state, singleTasker: action.payload };
		default:
			return state;
	}
}
