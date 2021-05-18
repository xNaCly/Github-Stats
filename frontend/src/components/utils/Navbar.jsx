import fetch from "node-fetch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client_id, production, paths } from "../../config.json";
function Navbar() {
	const login = localStorage.getItem("login");
	const [user, updateUser] = useState({});

	useEffect(() => {
		if (login) {
			const getUser = async () => {
				let res = await fetch(`${paths[production]}/user/${login}`, {
					headers: { Authorization: login },
				});
				res = await res.json();
				updateUser(res);
			};
			getUser();
		}
	}, []);

	return (
		<div className="navbar">
			<div>
				<Link className="navbar_item" to="/">
					Home
				</Link>
			</div>
			<div>
				{!login ? (
					<a
						className="github_signin"
						href={`https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo%20user`}>
						Log in with Github
					</a>
				) : (
					<div className="navbar_github_container">
						<span className="navbar_github_name">{user?.name}</span>
						<a className="navbar_github_link" href={user?.url}>
							<img
								className="navbar_github_avatar"
								src={user?.avatar}
								alt={user?.name}></img>
						</a>
					</div>
				)}
			</div>
		</div>
	);
}

export default Navbar;
