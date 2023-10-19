import { Link } from "react-router-dom";
import logo from "../assets/taskit-high-resolution-logo-color-on-transparent-background.png";

function Nav() {
  return (
    <nav className="h-14 bg-amber-100 w-full flex justify-between fixed">
      <div className="flex flex-col justify-center ml-2">
        <img className="h-10" src={logo} alt="logo" />
      </div>
      <div className="flex align-middle">
        <Link
          className="flex flex-col justify-center ml-5 text-xl font-bold hover:text-cyan-700"
          to={"/"}
        >
          Home
        </Link>
        <section className="flex flex-col justify-center ml-5">{"|"}</section>
        <Link
          className="flex flex-col justify-center mx-5 text-xl font-bold  hover:text-cyan-700"
          to={"/categories"}
        >
          Categories
        </Link>
        <section className="flex flex-col justify-center mr-5">{"|"}</section>
        <Link
          className="flex flex-col justify-center mr-5 text-xl font-bold  hover:text-cyan-700"
          to={"/auth"}
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
