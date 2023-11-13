import "./App.css";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import AuthTasker from "./pages/AuthTasker";
import AuthTaskee from "./pages/AuthTaskee";
import Tasks from "./pages/Tasks";
import SingleCategory from "./pages/SingleCategory";
import Calendar from "./components/Calendar";
import ViewSked from "./pages/ViewSked";
import CreateTask from "./pages/CreateTask";
import PickATaskee from "./pages/PickATaskee";
import BookingPage from "./pages/BookingPage";
import TaskeeAccount from "./pages/TaskeeAccount";
import { useSelector } from "react-redux";
import TaskeeSkills from "./pages/TaskeeSkills";
import TaskeeProfile from "./pages/TaskeeProfile";
import TaskerAccount from "./pages/TaskerAccount";


function App() {
	const token = useSelector(
		(state) => state.auth.user?.token
	);
	const isTasker = useSelector(
		(state) => state.auth.user?.isTasker
	);
	const isTaskee = useSelector(
		(state) => state.auth.user?.isTaskee
	);

	return (
		<>
			<Nav
				isAuthenticated={!!token}
				isTasker={isTasker}
				isTaskee={isTaskee}
			/>
			<section className="pt-14">
				<Routes>
					{token ? (
						<>
							{isTasker && (
								<>
									{/* Tasker Routes */}
									<Route
										path="/"
										element={<Home />}
									/>
									<Route
										path="/categories"
										element={<Categories />}
									/>
									<Route
										path="/categories/:id"
										element={<SingleCategory />}
									/>
									<Route
										path="/tasks"
										element={<Tasks />}
									/>
									<Route
										path="/booking"
										element={<BookingPage />}
									/>
									<Route
										path="/create"
										element={<CreateTask />}
									/>
									<Route
										path="/pick"
										element={<PickATaskee />}
									/>
									<Route
										path="/tasker/:id"
										element={<TaskerAccount />}
									/>
								</>
							)}
							{isTaskee && (
								<>
									{/* Taskee Routes */}
									<Route
										path="/"
										element={<Home />}
									/>
									<Route
										path="/tasks"
										element={<Tasks />}
									/>
									<Route
										path="/calendar"
										element={<Calendar />}
									/>
									<Route
										path="/schedule"
										element={<ViewSked />}
									/>
									<Route
										path="/account"
										element={<TaskeeAccount />}
									/>
									<Route
										path="/skills"
										element={<TaskeeSkills />}
									/>
									<Route
										path="/profile"
										element={<TaskeeProfile />}
									/>
								</>
							)}
						</>
					) : (
						<>
							{/* Non Logged In Users */}
							<Route
								path="/"
								element={<Home />}
							/>
							<Route
								path="/auth_tasker"
								element={<AuthTasker />}
							/>
							<Route
								path="/auth_taskee"
								element={<AuthTaskee />}
							/>
							<Route
								path="/categories"
								element={<Categories />}
							/>
							<Route
								path="/categories/:id"
								element={<SingleCategory />}
							/>
						</>
					)}
				</Routes>
			</section>
		</>
	);
}

export default App;
