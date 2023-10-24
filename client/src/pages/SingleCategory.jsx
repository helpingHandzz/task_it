import { getCategoryThunk } from "../store/category";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SubCategoryItem from "../components/SubCategoryItem";

function SingleCategory() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const category = useSelector(
		(state) => state.category.singleCategory
	);
	// console.log("test", category);

	useEffect(() => {
		dispatch(getCategoryThunk(id));
	}, []);
	const background = category.image;
	return (
		<div>
			<div
				className=" bg-no-repeat bg-cover bg-center h-96 min-w-screen md:h-[500px] lg:h-[600px] xl:h-[700px] xl:bg-center lg:bg-bottom "
				style={{ backgroundImage: `url(${background})` }}>
				<div
					className="w-full h-96 md:h-[500px] lg:h-[600px] xl:h-[700px] flex justify-center"
					style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
					{" "}
					<h1 className="self-center font-extrabold text-5xl md:text-7xl text-white">
						{category.categoryName}
					</h1>
				</div>
			</div>

      {category.Subcategory &&
        category.Subcategory.map((sub) => (
          <SubCategoryItem key={sub.id} sub={sub} />
        ))}
    </div>
  );
}

export default SingleCategory;
