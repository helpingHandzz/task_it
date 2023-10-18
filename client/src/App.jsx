
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Auth from "./pages/Auth";
import Upload from "./components/Upload";
import Tasks from "./pages/Tasks";
import AllTaskers from './AllTaskers'
import SingleTasker from './SingleTasker'


function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/task" element={<Tasks />} />
        <Route path="/taskers" element={<AllTaskers />} />
        <Route path="/taskers/:id" element={<SingleTasker />} />
      </Routes>

    </>
  );
}

export default App;
