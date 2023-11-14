import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategoriesThunk } from "../store/category";
import { Link } from "react-router-dom";
import HomeCategories from "../components/HomeCategories";
import home_image from "../assets/home_image.png";

import Search from "../components/Search";

function Home() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.allCategories);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  // console.log(`categories: `, categories);

  const popularCategories = categories.slice(0, 4);

  return (
    <div>
      <div className="m-8 bg-white border rounded h-80 flex flex-col justify-center">
        <Search categories={categories} />
      </div>

      <div className="m-5">
        {popularCategories.map((category) => (
          <Link key={category.id} to={`/categories/${category.id}`}>
            <HomeCategories category={category} />
          </Link>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row m-8 border rounded bg-white">
        <div className="w-2/5">
          <img src={home_image} alt="home image" className="w-full" />
        </div>
        <div className="flex flex-col justify-around ml-3">
          <h2 className="text-3xl">About Us</h2>
          <p>
            TaskIt is a dynamic and innovative company that revolutionizes the
            way individuals get things done. Specializing in on-demand services,
            we connect users with a network of skilled and reliable Taskers who
            are ready to tackle a wide range of tasks. Whether you need help
            with home repairs, errands, office tasks, or other odd jobs, TaskIt
            has a diverse and talented pool of Taskers to meet your specific
            needs.
          </p>
          <p>
            The company's mission is to empower individuals to outsource tasks
            efficiently, saving time and reducing stress in their daily lives.
            TaskIt is more than just a service platform; it's a community of
            skilled individuals helping each other succeed in their personal and
            professional endeavors.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
