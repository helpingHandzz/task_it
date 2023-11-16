import axios from "axios";

const BASE_URL = "https://taskit-server.onrender.com";

const GET_TASKERS = "GET_TASKERS";
const GET_TASKER = "GET_TASKER";
const GET_TASKER_REVIEWS = "GET_TASKER_REVIEWS";

const POST_TASKER_REVIEW = "POST_TASKER_REVIEW";
const EDIT_TASKER_REVIEW = "EDIT_TASKER_REVIEW";
const DELETE_TASKER_REVIEW = "DELETE_TASKER_REVIEW";

const getTaskers = (taskers) => ({
  type: GET_TASKERS,
  payload: taskers,
});

const getTasker = (tasker) => ({
  type: GET_TASKER,
  payload: tasker,
});

const getTaskerReviews = (reviews) => ({
  type: GET_TASKER_REVIEWS,
  payload: reviews,
});

const postTaskerReview = (review) => ({
  type: POST_TASKER_REVIEW,
  payload: review,
});

const editTaskerReview = (review) => ({
  type: EDIT_TASKER_REVIEW,
  payload: review,
});

const deleteTaskerReview = (review) => ({
  type: DELETE_TASKER_REVIEW,
  payload: review,
});

// ALL TASKERS
export const getTaskersThunk = () => async (dispatch) => {
  try {
    const { data: taskers } = await axios.get(`${BASE_URL}/api/tasker`);
    return dispatch(getTaskers(taskers));
  } catch (error) {
    console.error(error);
  }
};

// SINGLE TASKER
export const getTaskerThunk = (id) => async (dispatch) => {
  try {
    const { data: tasker } = await axios.get(`${BASE_URL}/api/tasker/${id}`);
    console.log("taskerthunk", tasker);
    return dispatch(getTasker(tasker));
  } catch (error) {
    console.error(error);
  }
};

// SINGLE TASKER REVIEWS
export const getTaskerReviewsThunk = (id) => async (dispatch) => {
  try {
    const { data: review } = await axios.get(
      `${BASE_URL}/api/tasker/reviews/${id}`
    );
    return dispatch(getTaskerReviews(review));
  } catch (error) {
    console.error(error);
  }
};

// CREATE NEW TASKER REVIEW
export const postTaskerReviewThunk = (data) => async (dispatch) => {
  try {
    const { data: review } = await axios.post(
      `${BASE_URL}/api/tasker/reviews/new`,
      { ...data }
    );
    return dispatch(postTaskerReview(review));
  } catch (error) {
    console.error(error);
  }
};

// EDIT TASKER REVIEW
export const editTaskerReviewThunk = (data) => async (dispatch) => {
  try {
    const { data: review } = await axios.put(
      `${BASE_URL}/api/tasker/reviews/edit/${data.id}`,
      data
    );
    return dispatch(editTaskerReview(review));
  } catch (error) {
    console.error(error);
  }
};

// DELETE TASKER REVIEW
export const deleteTaskerReviewThunk = (id) => async (dispatch) => {
  try {
    const { data: review } = await axios.delete(
      `${BASE_URL}/api/tasker/reviews/delete/${id}`
    );
    return dispatch(deleteTaskerReview(review));
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  allTaskers: [],
  singleTasker: {},
  taskerReviews: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TASKERS:
      return { ...state, allTaskers: action.payload };
    case GET_TASKER:
      return { ...state, singleTasker: action.payload };
    case GET_TASKER_REVIEWS:
      return { ...state, taskerReviews: action.payload };
    case POST_TASKER_REVIEW:
      return { ...state, taskerReviews: action.payload };
    case EDIT_TASKER_REVIEW:
      return { ...state, taskerReviews: action.payload };
    case DELETE_TASKER_REVIEW:
      return {
        ...state,
        taskerReviews: state.taskerReviews.filter(
          (review) => review.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}
