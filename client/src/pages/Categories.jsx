import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategoriesThunk } from "../store/category";

function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.allCategories);
  console.log("test", categories);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, []);

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>
          <h1>{category.categoryName}</h1>
          {category.Subcategory.map((sub) => (
            <h2 key={sub.id}>{sub.subName}</h2>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Categories;
