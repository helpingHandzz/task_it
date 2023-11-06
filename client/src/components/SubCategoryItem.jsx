import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function SubCategoryItem({ sub }) {

  const isAuthenticated = useSelector((state) => !!state.auth.user?.token)

  const linkTo = isAuthenticated ? "/create" : "/auth_tasker";

  return (
    <div className="flex h-64 border shadow-md m-5 bg-white rounded">
      <div className=" w-1/3 self-center pl-3 rounded">
        <img className="h-44 w-full rounded" src={sub.image} />
      </div>
      <div className="flex flex-col justify-around pb-6 w-2/3">
        <h2 className="pt-5 pl-10 text-2xl text-bold font-bold">
          {sub.subName}
        </h2>
        <h3 className="pl-10 pr-4 pt-3 text-md">{sub.description}</h3>
        <Link to={linkTo} state={{ subcat: sub }}>
          <button className="bg-cyan-700 text-white font-bold hover:bg-cyan-900 py-2 rounded px-3 w-28 ml-10 mt-5">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SubCategoryItem;
