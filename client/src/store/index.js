import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import taskerReducer from "./tasker.js";
import taskeeReducer from "./taskee";
import categoryReducer from "./category";
import taskReducer from "./task";
import authReducer from "./auth.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducer = combineReducers({
  taskee: taskeeReducer,
  category: categoryReducer,
  task: taskReducer,
  tasker: taskerReducer,
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

export const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);
export default persistor;
