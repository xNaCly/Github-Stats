import { useLocation } from "react-router-dom";
import Error from "../utils/Error";
import fetch from "node-fetch";
import { useEffect } from "react";
import { client_id, paths, production } from "../../config.json";

function Oauth() {
	const search = useLocation().search;
	const code = new URLSearchParams(search).get("code");
	useEffect(() => {
		if (!code) return <Error text="no code providen" type="warning"></Error>;
		const getAuth = async () => {
			let res = await fetch(`${paths[production]}/login/${client_id}/${code}`);
			res = await res.json();
			localStorage.setItem("login", res.access_token);
		};
		getAuth();
	}, []);
	return (
		<div className="oauth_container">
			{!localStorage.getItem("login") ? (
				<Error text="Connecting to Github"></Error>
			) : (
				<Error text="Connected to Github" type="success"></Error>
			)}
		</div>
	);
}

export default Oauth;
