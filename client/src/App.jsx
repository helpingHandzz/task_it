import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import AuthTasker from "./pages/AuthTasker";
import AuthTaskee from "./pages/AuthTaskee";
import Tasks from "./pages/Tasks";
import AllTaskers from "./pages/AllTaskers";
import SingleTasker from "./pages/SingleTasker";
import SingleCategory from "./pages/SingleCategory";
import Calendar from "./components/Calendar";

import ViewSked from "./pages/ViewSked";
import CreateTask from "./pages/CreateTask";
import PickATaskee from "./pages/PickATaskee";
import BookingPage from "./pages/BookingPage";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.auth.user.token);
  console.log("app token", token);
  if (token) {
    return (
      <section className="pt-14">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:id" element={<SingleCategory />} />
          <Route path="/taskers" element={<AllTaskers />} />
          <Route path="/taskers/:id" element={<SingleTasker />} />
          <Route path="/auth_taskee" element={<AuthTaskee />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/schedule" element={<ViewSked />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/pick" element={<PickATaskee />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </section>
    );
  }

  return (
    <section className="pt-14">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth_tasker" element={<AuthTasker />} />
        <Route path="/auth_taskee" element={<AuthTaskee />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<SingleCategory />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/taskers" element={<AllTaskers />} />
        <Route path="/taskers/:id" element={<SingleTasker />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/schedule" element={<ViewSked />} />
      </Routes>
    </section>
  );
}

export default App;
