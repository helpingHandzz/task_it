import axios from "axios";

const BASE_URL = "http://localhost:8080";

const GET_TASKS = "GET_TASKS";
const GET_TASK = "GET_TASK";

const getTasks = (tasks) => ({
  type: GET_TASKS,
  payload: tasks,
});

const getTask = (task) => ({
  type: GET_TASK,
  payload: task,
});

export const getTasksThunk = () => async (dispatch) => {
  try {
    const { data: tasks } = await axios.get(`${BASE_URL}/api/task`);
    console.log("data", tasks);
    return dispatch(getTasks(tasks));
  } catch (error) {
    console.error(error);
  }
};

export const getTaskThunk = (id) => async (dispatch) => {
  try {
    const { data: task } = await axios.get(`${BASE_URL}/api/task/${id}`);
    console.log("data", task);
    return dispatch(getTask(task));
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  allTasks: [],
  singleTask: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, allTasks: action.payload };
    case GET_TASK:
      return { ...state, singleTask: action.payload };
    default:
      return state;
  }
}