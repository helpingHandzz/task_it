import axios from "axios";

const BASE_URL = "http://localhost:8080";

const GET_CATEGORIES = "GET_CATEGORIES";
const GET_CATEGORY = "GET_CATEGORY";

const getCategories = (categories) => ({
	type: GET_CATEGORIES,
	payload: categories,
});

const getCategory = (Category) => ({
	type: GET_CATEGORY,
	payload: Category,
});

export const getCategoriesThunk =
	() => async (dispatch) => {
		try {
			const { data: categories } = await axios.get(
				`${BASE_URL}/api/category`
			);
			return dispatch(getCategories(categories));
		} catch (error) {
			console.error(error);
		}
	};

export const getCategoryThunk =
	(id) => async (dispatch) => {
		try {
			const { data: category } = await axios.get(
				`${BASE_URL}/api/category/${id}`
			);
			return dispatch(getCategory(category));
		} catch (error) {
			console.error(error);
		}
	};

const initialState = {
	allCategories: [],
	singleCategory: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_CATEGORIES:
			return { ...state, allCategories: action.payload };
		case GET_CATEGORY:
			return { ...state, singleCategory: action.payload };
		default:
			return state;
	}
}
