import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategoriesThunk } from "../store/category";
import { Link } from "react-router-dom";
import HomeCategories from "../components/HomeCategories";
import home_image from "../assets/home_image.png";

import Search from "../components/Search";

function Home() {
	const dispatch = useDispatch();
	const categories = useSelector(
		(state) => state.category.allCategories
	);

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
					<Link
						key={category.id}
						to={`/categories/${category.id}`}>
						<HomeCategories category={category} />
					</Link>
				))}
			</div>
			<div className="flex flex-col lg:flex-row m-8 border rounded bg-white">
				<div className="w-2/5">
					<img
						src={home_image}
						alt="home image"
						className="w-full"
					/>
				</div>
				<div className="flex flex-col justify-around ml-3">
					<h2>About us</h2>
					<p>
						Lorem ipsum, dolor sit amet consectetur
						adipisicing elit. Illum ducimus nostrum quam
						perferendis, tempore harum vitae ad quaerat
						repudiandae quasi vel provident voluptatibus
						placeat aspernatur maiores libero aliquam,
						doloremque ipsum?
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Nam itaque delectus cum
						voluptates, sint neque, atque nostrum ratione
						cupiditate magni debitis veniam unde repellat
						fugiat incidunt, sapiente facilis obcaecati
						laudantium?
					</p>
				</div>
			</div>
		</div>
	);
}

export default Home;
