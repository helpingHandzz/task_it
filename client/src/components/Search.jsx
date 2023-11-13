import React, { useState } from "react";

function Search({ categories }) {
	const [searchValue, setSearchValue] = useState("");

	const handleSearchValueChange = (event) => {
		// event.preventDefault();
		console.log(`categories: `, categories);
		// console.log(event.target.value);
		// setSearchValue(event.target.value);
	};

	// if (searchValue.length > 0) {
	// 	console.log(`categories: `, categories);
	// 	categories.filter((category) => {
	// 		return category.categoryName.match(searchValue);
	// 	});
	// }

	return (
		<div className="flex flex-col justify-center items-center gap-4">
			<h2 className="text-4xl text-center">
				What can we help you with?
			</h2>
			<div className="inline-flex justify-center">
				{/* <input
					type="search"
					className="flex m-4 px-6 w-96 border border-black"
					name=""
					id=""
					value={searchValue}
					onChange={handleSearchValueChange}
					placeholder="Find the right help..."
				/> */}
			</div>
		</div>
	);
}

export default Search;
