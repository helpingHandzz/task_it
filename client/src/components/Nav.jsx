import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/taskit-high-resolution-logo-color-on-transparent-background.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutTaskerThunk } from "../store/auth";

function Nav({
  isAuthenticated,
  isTasker,
  isTaskee,
  openMobileMenu,
  setOpenMobileMenu,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const taskerId = useSelector((state) => state.auth?.user?.taskerId);

  // handler for logout
  const logout = async (e) => {
    e.preventDefault();
    dispatch(logoutTaskerThunk());
    navigate("/");
  };

  // if token is present && isTasker is true, render Navbar with Logout
  if (isAuthenticated) {
    if (isTasker) {
      return (
        <nav className=" bg-white w-full fixed py-2 border-b">
          <div className="flex max-w-full justify-between items-center ml-2 px-[8%] flex-wrap w-full">
            <Link to={"/"}>
              <img className="h-10" src={logo} alt="logo" />
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 block my-auto mr-5 md:hidden cursor-pointer hover:text-cyan-900"
              onClick={() => setOpenMobileMenu(!openMobileMenu)}
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>

            <div
              className={`${
                openMobileMenu ? "block" : "hidden"
              } w-full md:flex md:items-center md:w-auto`}
            >
              <div className="md:flex md:justify-between">
                <Link
                  className="md:mx-3 text-xl font-bold py-2 md:py-0 text-cyan-700  hover:text-cyan-900 "
                  to={"/categories"}
                >
                  Categories
                </Link>
                <section className="hidden md:block">{"|"}</section>
                <Link
                  className="flex flex-col justify-center md:mx-3 text-xl py-2 pt-4 md:pt-0 md:py-0 font-bold text-cyan-700  hover:text-cyan-900"
                  to={`/tasker/${taskerId}`}
                >
                  Account
                </Link>
                <section className="hidden md:block">{"|"}</section>
                <button
                  className="flex flex-col justify-center md:mx-3 text-xl py-2 md:py-0 font-bold text-cyan-700  hover:text-cyan-900"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      );
    } else if (isTaskee) {
      return (
        <nav className=" bg-white w-full fixed py-2 border-b">
          <div className="flex max-w-full justify-between items-center ml-2 px-[8%] flex-wrap w-full">
            <Link to={"/"}>
              <img className="h-10" src={logo} alt="logo" />
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 block my-auto mr-5 md:hidden cursor-pointer hover:text-cyan-900"
              onClick={() => setOpenMobileMenu(!openMobileMenu)}
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>

            <div
              className={`${
                openMobileMenu ? "block" : "hidden"
              } w-full md:flex md:items-center md:w-auto`}
            >
              <div className="md:flex md:justify-between">
                <Link
                  className="md:mx-3 text-xl font-bold py-2 md:py-0 text-cyan-700  hover:text-cyan-900 "
                  to={"/taskee/tasks"}
                >
                  Tasks
                </Link>
                <section className="hidden md:block">{"|"}</section>
                <Link
                  className="flex flex-col justify-center md:mx-3 text-xl py-2 pt-4 md:pt-0 md:py-0 font-bold text-cyan-700  hover:text-cyan-900"
                  to={"/schedule"}
                >
                  Schedule
                </Link>
                <section className="hidden md:block">{"|"}</section>
                <Link
                  className="flex flex-col justify-center md:mx-3 text-xl py-2 pt-4 md:pt-0 md:py-0 font-bold text-cyan-700  hover:text-cyan-900"
                  to={"/account"}
                >
                  Account
                </Link>
                <button
                  className="flex flex-col justify-center md:mx-3 text-xl py-2 md:py-0 font-bold text-cyan-700  hover:text-cyan-900"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      );
    }
  } else {
    return (
      <nav className=" bg-white w-full fixed py-2 border-b">
        <div className="flex max-w-full justify-between items-center ml-2 px-[8%] flex-wrap w-full">
          <Link to={"/"}>
            <img className="h-10" src={logo} alt="logo" />
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 block my-auto mr-5 md:hidden cursor-pointer hover:text-cyan-900"
            onClick={() => setOpenMobileMenu(!openMobileMenu)}
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>

          <div
            className={`${
              openMobileMenu ? "block" : "hidden"
            } w-full md:flex md:items-center md:w-auto`}
          >
            <div className="md:flex md:justify-between">
              <Link
                className="md:mx-3 text-xl font-bold py-2 md:py-0 text-cyan-700  hover:text-cyan-900 "
                to={"/categories"}
              >
                Categories
              </Link>
              <section className="hidden md:block">{"|"}</section>
              <Link
                className="flex flex-col justify-center md:mx-3 text-xl py-2 pt-4 md:pt-0 md:py-0 font-bold text-cyan-700  hover:text-cyan-900"
                to={"/auth_tasker"}
              >
                Login / Signup
              </Link>
              <section className="hidden md:block">{"|"}</section>
              <Link
                className="flex flex-col justify-center md:mx-3 text-xl py-2 pt-4 md:pt-0 md:py-0 font-bold text-cyan-700  hover:text-cyan-900"
                to={"/auth_taskee"}
              >
                Become a Taskee
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
export default Nav;
