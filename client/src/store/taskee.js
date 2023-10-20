import axios from "axios";

const BASE_URL = "http://localhost:8080";

const GET_TASKEES = "GET_TASKEES";
const GET_TASKEE = "GET_TASKEE";
const GET_TASKEE_REVIEWS = "GET_TASKEE_REVIEWS";
const POST_TASKEE_REVIEW = "POST_TASKEE_REVIEW";
const EDIT_TASKEE_REVIEW = "EDIT_TASKEE_REVIEW";
const DELETE_TASKEE_REVIEW = "DELETE_TASKEE_REVIEW";

const getTaskees = (taskees) => ({
  type: GET_TASKEES,
  payload: taskees,
});

const getTaskee = (taskee) => ({
  type: GET_TASKEE,
  payload: taskee,
});

const getTaskeeReviews = (reviews) => ({
  type: GET_TASKEE_REVIEWS,
  payload: reviews,
});

const postTaskeeReview = (review) => ({
  type: POST_TASKEE_REVIEW,
  payload: review,
});

const editTaskeeReview = (review) => ({
  type: EDIT_TASKEE_REVIEW,
  payload: review,
});

const deleteTaskeeReview = (review) => ({
  type: DELETE_TASKEE_REVIEW,
  payload: review,
});

//All TASKEES
export const getTaskeesThunk = () => async (dispatch) => {
  try {
    const { data: taskees } = await axios.get(`${BASE_URL}/api/taskee`);
    return dispatch(getTaskees(taskees));
  } catch (error) {
    console.error(error);
  }
};

//SINGLE TASKEE
export const getTaskeeThunk = (id) => async (dispatch) => {
  try {
    const { data: taskee } = await axios.get(`${BASE_URL}/api/taskee/${id}`);
    return dispatch(getTaskee(taskee));
  } catch (error) {
    console.error;
  }
};

//SINGLE TASKEE REVIEWS
export const getTaskeeReviewsThunk = (id) => async (dispatch) => {
  try {
    const { data: reviews } = await axios.get(
      `${BASE_URL}/api/taskee/reviews/${id}`
    );
    return dispatch(getTaskeeReviews(reviews));
  } catch (error) {
    console.error(error);
  }
};

// CEATE NEW TASKEE REVIEW
export const postTaskeeReviewThunk = (data) => async (dispatch) => {
  try {
    const { data: review } = await axios.post(
      `${BASE_URL}/api/taskee/reviews/new`,
      { ...data }
    );
    return dispatch(postTaskeeReview(review));
  } catch (error) {
    console.error(error);
  }
};
// EDIT TASKEE REVIEW
export const editTaskeeReviewThunk = (data) => async (dispatch) => {
  try {
    const { data: review } = await axios.put(
      `${BASE_URL}/api/taskee/reviews/edit/${data.id}`,
      data
    );
    return dispatch(editTaskeeReview(review));
  } catch (error) {
    console.error(error);
  }
};

// DELETE TASKEE REVIEW
export const deleteTaskeeReviewThunk = (id) => async (dispatch) => {
  try {
    const { data: review } = await axios.delete(
      `${BASE_URL}/api/taskee/reviews/delete/${id}`
    );
    return dispatch(deleteTaskeeReview(review));
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  allTaskees: [],
  singleTaskee: {},
  taskeeReviews: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TASKEES:
      return { ...state, allTaskees: action.payload };
    case GET_TASKEE:
      return { ...state, singleTaskee: action.payload };
    case GET_TASKEE_REVIEWS:
      return { ...state, taskeeReviews: action.payload };
    case POST_TASKEE_REVIEW:
      state.taskeeReviews.push(action.payload);
      return state;
    case EDIT_TASKEE_REVIEW:
      return {
        taskeeReviews: state.taskeeReviews.map((review) =>
          review.id === action.payload.id ? action.payload : review
        ),
      };
    case DELETE_TASKEE_REVIEW:
      return {
        ...state,
        taskeeReviews: state.taskeeReviews.filter(
          (review) => review.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}
