import axios from "axios";

const BASE_URL = "http://localhost:8080";

const GET_TASKEES = "GET_TASKEES";
const GET_TASKEE = "GET_TASKEE";
const GET_TASKEE_REVIEWS = "GET_TASKEE_REVIEWS";

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

//Single TASKEE REVIEWS
export const getTaskeeReviewsThunk = (id) => async (dispatch) => {
  try {
    const { data: reviews } = await axios.get(`/api/taskee/reviews/${id}`);
    return dispatch(getTaskeeReviews(reviews));
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
    default:
      return state;
  }
}
