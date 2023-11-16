import axios from "axios";

const BASE_URL = "http://localhost:8080";

const GET_TASKEES = "GET_TASKEES";
const GET_TASKEE = "GET_TASKEE";
const GET_TASKEE_REVIEWS = "GET_TASKEE_REVIEWS";
const GET_TASKEE_SCHEDULE = "GET_TASKEE_SCHEDULE";

const GET_TASKEE_SKILLS = "GET_TASKEE_SKILLS"
const GET_TASKEE_TASKS = "GET_TASKEE_TASKS"

const POST_TASKEE_REVIEW = "POST_TASKEE_REVIEW";
const EDIT_TASKEE_REVIEW = "EDIT_TASKEE_REVIEW";
const DELETE_TASKEE_REVIEW = "DELETE_TASKEE_REVIEW";

const POST_TASKEE_SCHEDULE = "POST_TASKEE_SCHEDULE";
const DELETE_TASKEE_SCHEDULE = "DELETE_TASKEE_SCHEDULE";

const POST_TASKEE_TOOLS = "POST_TASKEE_TOOLS";
const POST_TASKEE_VEHICLES = "POST_TASKEE_VEHICLES";
const POST_TASKEE_FACTS = "POST_TASKEE_FACTS";
const POST_TASKEE_ABOUT = "POST_TASKEE_ABOUT";

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

const getTaskeeSchedule = (schedule) => ({
  type: GET_TASKEE_SCHEDULE,
  payload: schedule,
});

const getTaskeeSkills = (skills) => ({
  type: GET_TASKEE_SKILLS,
  payload: skills,
});

const getTaskeeTasks = (tasks) => ({
  type: GET_TASKEE_TASKS,
  payload: tasks,
})

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

const postTaskeeSchedule = (schedule) => ({
  type: POST_TASKEE_SCHEDULE,
  payload: schedule,
});

const deleteTaskeeSchedule = (schedule) => ({
  type: DELETE_TASKEE_SCHEDULE,
  payload: schedule,
});

const postTaskeeTools = (tools) => ({
  type: POST_TASKEE_TOOLS,
  payload: tools,
});

const postTaskeeVehicles = (vehicles) => ({
  type: POST_TASKEE_VEHICLES,
  payload: vehicles,
});

const postTaskeeFacts = (facts) => ({
  type: POST_TASKEE_FACTS,
  payload: facts,
});

const postTaskeeAbout = (about) => ({
  type: POST_TASKEE_ABOUT,
  payload: about,
});


// All TASKEES
export const getTaskeesThunk = () => async (dispatch) => {
  try {
    const { data: taskees } = await axios.get(`${BASE_URL}/api/taskee`);
    return dispatch(getTaskees(taskees));
  } catch (error) {
    console.error(error);
  }
};

// SINGLE TASKEE
export const getTaskeeThunk = (id) => async (dispatch) => {
  try {
    const { data: taskee } = await axios.get(`${BASE_URL}/api/taskee/${id}`);
    return dispatch(getTaskee(taskee));
  } catch (error) {
    console.error;
  }
};

// SINGLE TASKEE REVIEWS
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

// GET TASKEE SCHEDULE
export const getTaskeeScheduleThunk = (id) => async (dispatch) => {
  try {
    const { data: schedule } = await axios.get(
      `${BASE_URL}/api/taskee/schedule/${id}`
    );

    return dispatch(getTaskeeSchedule(schedule));
  } catch (error) {
    console.error(error);
  }
};

// GET TASKEE SKILLS
export const getTaskeeSkillsThunk = (taskeeId) => async (dispatch) => {
  try {
    const { data: skills } = await axios.get(
      `${BASE_URL}/api/taskee/skills/${taskeeId}`
    );
    dispatch(getTaskeeSkills(skills));
  } catch (error) {
    console.error(error);
  }
};


// GET TASKEE TASKS
export const getTaskeeTasksThunk = (id) => async (dispatch) => {
  try {
    const { data: tasks } = await axios.get(
      `${BASE_URL}/api/taskee/tasks/${id}`
    );
    dispatch(getTaskeeTasks(tasks));
  } catch (error) {
      console.error(error)
  }
};


// CREATE NEW TASKEE REVIEW
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

// POST TASKEE WORK SCHEDULE
export const postTaskeeScheduleThunk =
  (taskeeId, workSchedules) => async (dispatch) => {
    try {
      const payload = {
        taskeeId: taskeeId,
        workSchedules: workSchedules,
      };

      const { data: schedule } = await axios.post(
        `${BASE_URL}/api/taskee/schedule/new`,
        payload
      );

      return dispatch(postTaskeeSchedule(schedule));
    } catch (error) {
      console.error(error);
    }
  };

// DELETE TASKEE WORK SCHEDULE
export const deleteTaskeeScheduleThunk = (scheduleId) => async (dispatch) => {
  try {
    const { data: schedule } = await axios.delete(
      `${BASE_URL}/api/taskee/schedule/delete/${scheduleId}`
    );
    return dispatch(deleteTaskeeSchedule(schedule));
  } catch (error) {
    console.error(error);
  }
};

// POST TASKEE TOOLS
export const postTaskeeToolsThunk = (taskeeId, tools) => async (dispatch) => {
  try {
    const { data: updatedTaskee } = await axios.put(
      `${BASE_URL}/api/taskee/tools/${taskeeId}`,
      { tools }
    );
    dispatch(postTaskeeTools(updatedTaskee))
  } catch (error) {
    console.error(error);
  }
}

// POST TASKEE VEHICLES
export const postTaskeeVehiclesThunk = (taskeeId, vehicles) => async (dispatch) => {
  try {
    const { data: updatedTaskee } = await axios.put(
      `${BASE_URL}/api/taskee/vehicles/${taskeeId}`,
      { vehicles }
    );
    dispatch(postTaskeeVehicles(updatedTaskee))
  } catch (error) {
    console.error(error);
  }
}

// POST TASKEE FACTS
export const postTaskeeFactsThunk = (taskeeId, facts) => async (dispatch) => {
  try {
    const { data: updatedTaskee } = await axios.put(
      `${BASE_URL}/api/taskee/facts/${taskeeId}`,
      { facts }
    );
    dispatch(postTaskeeFacts(updatedTaskee))
  } catch (error) {
    console.error(error);
  }
}

// POST TASKEE ABOUT
export const postTaskeeAboutThunk = (taskeeId, about) => async (dispatch) => {
  try {
    const { data: updatedTaskee } = await axios.put(
      `${BASE_URL}/api/taskee/about/${taskeeId}`,
      { about }
    );
    dispatch(postTaskeeAbout(updatedTaskee))
  } catch (error) {
    console.error(error);
  }
}

const initialState = {
  allTaskees: [],
  singleTaskee: {},
  taskeeReviews: [],
  workSchedule: [],
  taskeeSkills: [],
  taskeeTasks: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TASKEES:
      return { ...state, allTaskees: action.payload };
    case GET_TASKEE:
      return { ...state, singleTaskee: action.payload };
    case GET_TASKEE_REVIEWS:
      return { ...state, taskeeReviews: action.payload };
    case GET_TASKEE_SCHEDULE:
      return { ...state, workSchedule: action.payload };
    case GET_TASKEE_SKILLS:
      return { ...state, taskeeSkills: action.payload };
    case GET_TASKEE_TASKS:
      return { ...state, taskeeTasks: action.payload };
    case POST_TASKEE_REVIEW:
      return { ...state, taskeeReviews: action.payload };
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
    case POST_TASKEE_SCHEDULE:
      return {
        ...state,
        workSchedule: [...state.workSchedule, action.payload],
      };
    case DELETE_TASKEE_SCHEDULE:
      return {
        ...state,
        workSchedule: state.workSchedule.filter(
          (schedule) => schedule.id !== action.payload.id
        ),
      };
    case POST_TASKEE_TOOLS:
      return {
        ...state,
        singleTaskee: {
          ...state.singleTaskee,
          tools: action.payload.tools
        }
      } ; 
    case POST_TASKEE_VEHICLES:
      return {
        ...state,
        singleTaskee: {
          ...state.singleTaskee,
          tools: action.payload.vehicles
        }
      } ; 
    case POST_TASKEE_FACTS:
      return {
        ...state,
        singleTaskee: {
          ...state.singleTaskee,
          tools: action.payload.facts
        }
      } ; 
    case POST_TASKEE_ABOUT:
      return {
        ...state,
        singleTaskee: {
          ...state.singleTaskee,
          tools: action.payload.about
        }
      } ; 
    default:
      return state;
  }
}
