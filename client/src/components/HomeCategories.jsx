import React from "react";

function HomeCategories({ category }) {
  const prices = category.Subcategory.map((subcat) =>
    subcat.Skills.map((skill) => skill.price)
  );

  const concatPrices = prices[0].concat(prices[1]);

  const sortedPrices = concatPrices.sort(function (a, b) {
    return a - b;
  });

  return (
    <div className="border rounded shadow-md bg-white m-3 xl:m-1 h-28 flex xl:flex-col xl:h-60">
      <div className="w-[30%] h-full xl:w-full xl:h-3/5">
        <img
          src={category.image}
          alt={category.categoryName}
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-col ml-4 justify-center xl:p-3">
        <h1 className="text-xl font-bold">{category.categoryName}</h1>
        <h2>
          {" "}
          Avg. Cost per Hour: ${(sortedPrices[0] / 100).toFixed(2)} - $
          {(sortedPrices[sortedPrices.length - 1] / 100).toFixed(2)}
        </h2>
      </div>
    </div>
  );
}

export default HomeCategories;
