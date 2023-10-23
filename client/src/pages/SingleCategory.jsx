import { getCategoryThunk } from "../store/category";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

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
					<div
						key={sub.id}
						className="flex h-52 border-2 m-5">
						<div className="h-52 self-center pl-3 rounded">
							<img
								className="h-48 w-48 pt-5 rounded"
								src={sub.image}
							/>
						</div>
						<div className="flex flex-col">
							<h2 className="pt-16 pl-10 text-2xl">
								{sub.subName}
							</h2>
							<button className="border-2 border-black rounded px-3 w-28 ml-10 mt-5">
								Book Now
							</button>
						</div>
					</div>
				))}
		</div>
	);
}

export default SingleCategory;
