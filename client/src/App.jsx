import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Auth from "./pages/Auth";
import Upload from "./components/Upload";
import Tasks from "./pages/Tasks";
import AllTaskers from "./pages/AllTaskers";
import SingleTasker from "./pages/SingleTasker";
import SingleCategory from "./pages/SingleCategory";
import Calendar from "./components/Calendar";
import ViewSked from "./pages/ViewSked";

function App() {
  return (
    <section className="pt-14">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
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
