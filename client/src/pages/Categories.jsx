import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategoriesThunk } from "../store/category";
import { Link } from "react-router-dom";
import background from "../assets/categoriesBackground.png";

function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.allCategories);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, []);

  return (
    <>
      <div
        className="bg-center bg-no-repeat h-96 min-w-screen bg-cover"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <h1 className="text-center text-5xl py-5">Available Categories</h1>
      <div className="flex flex-wrap justify-center">
        {categories.map((category) => (
          <div key={category.id} className="border-2 my-3 w-96 h-80 sm:mx-5">
            <div className="h-40 w-96">
              <img className="h-40 w-80 mx-auto" src={category.image} />
            </div>
            <Link
              className=" hover:text-cyan-700"
              key={category.id}
              to={`/categories/${category.id}`}
            >
              <h1 className="text-3xl py-3 text-center">
                {category.categoryName}
              </h1>
            </Link>
            {category.Subcategory.map((sub) => (
              <h2 className="text-xl text-center" key={sub.id}>
                {sub.subName}
              </h2>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Categories;
