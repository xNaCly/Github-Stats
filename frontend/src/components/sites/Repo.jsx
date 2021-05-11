import { useEffect } from "react";
import fetch from "node-fetch";
import { production, paths, test_auth } from "../../config.json";

function Repo({ match }) {
	const { orgaName, repoName } = match.params;
	useEffect(() => {
		const req = async () => {
			let res = await fetch(`${paths[production]}/total/${orgaName}/${repoName}`, {
				headers: { Authorization: test_auth },
			});
			res = await res.json();
			console.log(res);
		};
		req();
	}, [orgaName, repoName]);
	return <div></div>;
}

export default Repo;
