import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import AuthTasker from "./pages/AuthTasker";
import AuthTaskee from "./pages/AuthTaskee";
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
import TaskeeTasks from "./pages/TaskeeTasks";
import TaskeeReviews from "./pages/TaskeeReviews";
import TaskeeContact from "./pages/TaskeeContact";


function App() {
  const token = useSelector((state) => state.auth.user?.token);
  const isTasker = useSelector((state) => state.auth.user?.isTasker);
  const isTaskee = useSelector((state) => state.auth.user?.isTaskee);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <>
      <Nav
        isAuthenticated={!!token}
        isTasker={isTasker}
        isTaskee={isTaskee}
        openMobileMenu={openMobileMenu}
        setOpenMobileMenu={setOpenMobileMenu}
      />
      <section className="pt-14">
        <div onClick={() => setOpenMobileMenu(false)}>
          <Routes>
            {token ? (
              <>
                {isTasker && (
                  <>
                    {/* Tasker Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route
                      path="/categories/:id"
                      element={<SingleCategory />}
                    />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="/create" element={<CreateTask />} />
                    <Route path="/pick" element={<PickATaskee />} />
                    <Route path="/tasker/:id" element={<TaskerAccount />} />
                  </>
                )}
                {isTaskee && (
                  <>
                    {/* Taskee Routes */}
                    <Route path="/" element={<TaskeeTasks />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/schedule" element={<ViewSked />} />
                    <Route path="/account" element={<TaskeeAccount />} />
                    <Route path="/skills" element={<TaskeeSkills />} />
                    <Route path="/profile" element={<TaskeeProfile />} />
                    <Route path="/taskee/tasks" element={<TaskeeTasks />} />
                    <Route path="/taskee/reviews" element={<TaskeeReviews />} />
                    <Route path="/contact" element={<TaskeeContact />} />
                  </>
                )}
              </>
            ) : (
              <>
                {/* Non Logged In Users */}
                <Route path="/" element={<Home />} />
                <Route path="/auth_tasker" element={<AuthTasker />} />
                <Route path="/auth_taskee" element={<AuthTaskee />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/:id" element={<SingleCategory />} />
              </>
            )}
          </Routes>
        </div>
      </section>
    </>
  );
}
export default App;
