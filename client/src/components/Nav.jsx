import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/taskit-high-resolution-logo-color-on-transparent-background.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutTaskerThunk } from "../store/auth";

function Nav() {
	const authContext = useSelector(
		(state) => state?.auth?.user
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	console.log(`navAuthContext: `, authContext);

	const logout = async (e) => {
		e.preventDefault();
		dispatch(logoutTaskerThunk());
		navigate("/");
	};

	if (authContext?.token !== "") {
		return (
			<nav className="h-14 bg-amber-100 w-full flex justify-between fixed">
				<div className="flex flex-col justify-center ml-2">
					<img
						className="h-10"
						src={logo}
						alt="logo"
					/>
				</div>
				<div className="flex align-middle">
					<Link
						className="flex flex-col justify-center ml-5 text-xl font-bold hover:text-cyan-700"
						to={"/"}>
						Home
					</Link>
					<section className="flex flex-col justify-center ml-5">
						{"|"}
					</section>
					<Link
						className="flex flex-col justify-center mx-3 text-xl font-bold  hover:text-cyan-700"
						to={"/categories"}>
						Categories
					</Link>
					<section className="flex flex-col justify-center mr-5">
						{"|"}
					</section>
					<Link
						className="flex flex-col justify-center mr-3 text-xl font-bold  hover:text-cyan-700"
						to={"/auth_taskee"}>
						Become a Taskee
					</Link>
					<section className="flex flex-col justify-center mr-5">
						{"|"}
					</section>
					<Link
						className="flex flex-col justify-center mr-3 text-xl font-bold  hover:text-cyan-700"
						onClick={logout}>
						Logout
					</Link>
				</div>
			</nav>
		);
	}

	return (
		<nav className="h-14 bg-amber-100 w-full flex justify-between fixed">
			<div className="flex flex-col justify-center ml-2">
				<img
					className="h-10"
					src={logo}
					alt="logo"
				/>
			</div>
			<div className="flex align-middle">
				<Link
					className="flex flex-col justify-center ml-5 text-xl font-bold hover:text-cyan-700"
					to={"/"}>
					Home
				</Link>
				<section className="flex flex-col justify-center ml-5">
					{"|"}
				</section>
				<Link
					className="flex flex-col justify-center mx-3 text-xl font-bold  hover:text-cyan-700"
					to={"/categories"}>
					Categories
				</Link>
				<section className="flex flex-col justify-center mr-5">
					{"|"}
				</section>
				<Link
					className="flex flex-col justify-center mr-3 text-xl font-bold  hover:text-cyan-700"
					to={"/auth_tasker"}>
					Login
				</Link>
				<section className="flex flex-col justify-center mr-5">
					{"|"}
				</section>
				<Link
					className="flex flex-col justify-center mr-3 text-xl font-bold  hover:text-cyan-700"
					to={"/auth_taskee"}>
					Become a Taskee
				</Link>
			</div>
		</nav>
	);
}

export default Nav;
