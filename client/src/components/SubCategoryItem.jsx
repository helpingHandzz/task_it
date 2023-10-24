import { Link } from "react-router-dom";

function SubCategoryItem({ sub }) {
  console.log("sub", sub);
  return (
    <div className="flex h-52 border-2 m-5">
      <div className="h-52 self-center pl-3 rounded">
        <img className="h-48 w-48 pt-5 rounded" src={sub.image} />
      </div>
      <div className="flex flex-col">
        <h2 className="pt-16 pl-10 text-2xl">{sub.subName}</h2>
        <Link to={"/create"} state={{ subcat: sub }}>
          <button className="border-2 border-black rounded px-3 w-28 ml-10 mt-5">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SubCategoryItem;
