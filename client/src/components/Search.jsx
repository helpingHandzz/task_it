import React, { useState } from "react";
import { Link } from "react-router-dom";

function Search({ categories }) {
	const [searchValue, setSearchValue] = useState("");
	const [filteredData, setFilteredData] = useState([]);

	const handleSearchValueChange = (event) => {
		event.preventDefault();
		setSearchValue(event.target.value);
		const newFilter = categories.filter((category) => {
			return category.categoryName
				.toLowerCase()
				.includes(searchValue.toLowerCase());
		});

		if (searchValue === "") {
			setFilteredData([]);
		} else {
			setFilteredData(newFilter);
		}
	};

	const location = "http://" + window.location.host;
	return (
		<div className="flex flex-col justify-center items-center gap-0">
			<h2 className="text-3xl text-center my-4">
				What can we help you with?
			</h2>
			<div className="inline-flex justify-center ">
				<input
					type="search"
					className="placeholder:italic placeholder:text-slate-40 flex mx-1 my-0 px-4 w-96 border border-black rounded py-2 text-lg focus:outline-none"
					name=""
					id=""
					value={searchValue}
					onChange={handleSearchValueChange}
					placeholder="Find the right help..."
				/>
			</div>
			{filteredData.length != 0 && (
				<div
					className="dataResult"
					style={{
						width: "438px",
						paddingLeft: "20px",
						paddingRight: "20px",
						marginLeft: "5px",
						marginRight: "5px",
						height: "200px",
						color: "black",
						backgroundColor: "white",
						boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
						overflow: "hidden",
						overflowY: "auto",
						WebkitScrollSnapType: "none",
						marginTop: "0px",
					}}>
					{filteredData.slice(0, 5).map((val, key) => {
						console.log(`val of filteredData: `, val);
						return (
							<Link
								key={val.id}
								className="dataItem w-full h-5 flex items-center justify-start py-4 hover:bg-yellow-300 hover:cursor-pointer"
								to={`${location}/categories/${val.id}`}>
								<p className="mx-3 block">
									{val.categoryName}
								</p>
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default Search;
