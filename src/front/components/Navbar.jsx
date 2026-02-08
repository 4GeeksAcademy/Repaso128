import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [username, setUsername] = useState("");

	useEffect(() => {
		if (store.user?.username) {
			setIsLoggedIn(true);
			setUsername(store.user.username);
		} else {
			setIsLoggedIn(false);
			setUsername("");
		}
	}, [store.user]);

	const buttonText = isLoggedIn
		? username
		: "Login";

	const buttonTo = isLoggedIn ? "/profile" : "/login";

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/" className="text-decoration-none">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>

				<div className="ms-auto d-flex gap-2">
					<Link to={buttonTo}>
						<button className="btn btn-primary">{buttonText}</button>
					</Link>

					{isLoggedIn && (
						<button
							className="btn btn-outline-secondary"
							onClick={() => dispatch({ type: "auth_logout" })}
						>
							Logout
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};
