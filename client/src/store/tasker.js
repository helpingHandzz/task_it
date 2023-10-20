import axios from "axios";

const BASE_URL = "http://localhost:8080";

const GET_TASKERS = "GET_TASKERS";
const GET_TASKER = "GET_TASKER";
const GET_TASKER_REVIEWS = "GET_TASKER_REVIEWS";

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
