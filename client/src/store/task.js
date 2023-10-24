import axios from "axios";

const BASE_URL = "http://localhost:8080";

const GET_TASKS = "GET_TASKS";
const GET_TASK = "GET_TASK";
const POST_TASK = "POST_TASK";
const EDIT_TASK = "EDIT_TASK";
const DELETE_TASK = "DELETE_TASK";

const getTasks = (tasks) => ({
  type: GET_TASKS,
  payload: tasks,
});

const getTask = (task) => ({
  type: GET_TASK,
  payload: task,
});

const postTask = (task) => ({
  type: POST_TASK,
  payload: task,
});

const editTask = (task) => ({
  type: EDIT_TASK,
  payload: task,
});

const deleteTask = (task) => ({
  type: DELETE_TASK,
  payload: task,
});

//ALL TASKS
export const getTasksThunk = () => async (dispatch) => {
  try {
    const { data: tasks } = await axios.get(`${BASE_URL}/api/task`);
    console.log("data", tasks);
    return dispatch(getTasks(tasks));
  } catch (error) {
    console.error(error);
  }
};

//SINGLE TASK
export const getTaskThunk = (id) => async (dispatch) => {
  try {
    const { data: task } = await axios.get(`${BASE_URL}/api/task/${id}`);
    console.log("data", task);
    return dispatch(getTask(task));
  } catch (error) {
    console.error(error);
  }
};

//POST TASK
export const postTaskThunk = (data) => async (dispatch) => {
  try {
    const { data: task } = await axios.post(
      `${BASE_URL}/api/task/new`,
      {
        ...data,
      },
      {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      }
    );
    return dispatch(postTask(task));
  } catch (error) {
    console.error(error);
  }
};

//EDIT TASK
export const editTaskThunk = (data) => async (dispatch) => {
  try {
    const { data: task } = await axios.put(
      `${BASE_URL}/api/task/edit/${data.id}`,
      data
    );
    return dispatch(editTask(task));
  } catch (error) {
    console.error(error);
  }
};

//DELETE TASK
export const deleteTaskThunk = (id) => async (dispatch) => {
  try {
    const { data: task } = await axios.delete(
      `${BASE_URL}/api/task/delete/${id}`
    );
    return dispatch(deleteTask(task));
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
    case POST_TASK:
      state.allTasks.push(action.payload);
      return state;
    case EDIT_TASK:
      return {
        allTasks: state.allTasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        allTasks: state.allTasks.filter(
          (task) => task.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}
