import { getCategoryThunk } from "../store/category";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function SingleCategory() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.singleCategory);
  console.log("test", category);

  useEffect(() => {
    dispatch(getCategoryThunk(id));
  }, []);
  return (
    <div>
      <h1>{category.categoryName}</h1>
      {category.Subcategory &&
        category.Subcategory.map((sub) => <h2 key={sub.id}>{sub.subName}</h2>)}
    </div>
  );
}

export default SingleCategory;
