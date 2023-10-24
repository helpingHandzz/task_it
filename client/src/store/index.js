import {
	createStore,
	combineReducers,
	applyMiddleware,
} from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import taskerReducer from "./tasker.js";
import taskeeReducer from "./taskee";
import categoryReducer from "./category";
import taskReducer from "./task";
import authReducer from "./auth.js";

const reducer = combineReducers({
	taskee: taskeeReducer,
	category: categoryReducer,
	task: taskReducer,
	tasker: taskerReducer,
	auth: authReducer,
});

const middleware = composeWithDevTools(
	applyMiddleware(
		thunkMiddleware,
		createLogger({ collapsed: true })
	)
);

const store = createStore(reducer, middleware);

export default store;
