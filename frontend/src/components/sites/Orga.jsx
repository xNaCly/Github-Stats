import { useEffect, useState } from "react";
import fetch from "node-fetch";
import { production, paths, test_auth } from "../../config.json";
import User from "../utils/User";
import Error from "../utils/Error";

function Orga({ match }) {
	const { orgaName } = match.params;
	const [contributors, updateContributors] = useState([]);
	const [activeFilter, updateFilter] = useState("");

	function sortContributors(type) {
		try {
			const types = ["commits", "additions", "deletions", "additionsPerCommit"].filter((e) => e !== type);
			for (let t of types) {
				document.getElementById(t).classList.remove("active");
			}
			document.getElementById(type).classList.add("active");
		} catch {}
		updateContributors([
			...contributors.sort((a, b) => {
				return b[type] - a[type];
			}),
		]);
	}

	useEffect(() => {
		const req = async () => {
			let contr = [];
			let res = await fetch(`${paths[production]}/total/${orgaName}`, {
				headers: { Authorization: test_auth },
			});
			res = await res.json();
			for (const x in res) {
				contr.push({ name: x, ...res[x] });
			}
			updateContributors(
				contr.sort((a, b) => {
					return b["commits"] - a["commits"];
				})
			);
			document.getElementById("commits").classList.add("active");
		};
		req();
	}, []);

	useEffect(() => {
		sortContributors(activeFilter);
	}, [activeFilter]);

	return (
		<div>
			<div className="header">
				<h1>{orgaName.toUpperCase()}</h1>
				<div className="filter_container">
					<button
						className="filter_button"
						id="commits"
						onClick={() => {
							updateFilter("commits");
						}}>
						Filter by commits
					</button>
					<button
						className="filter_button"
						id="additions"
						onClick={() => {
							updateFilter("additions");
						}}>
						Filter by additions
					</button>
					<button
						className="filter_button"
						id="deletions"
						onClick={() => {
							updateFilter("deletions");
						}}>
						Filter by deletions
					</button>
					<button
						className="filter_button"
						id="additionsPerCommit"
						onClick={() => {
							updateFilter("additionsPerCommit");
						}}>
						Filter by additionsPerCommit
					</button>
				</div>
			</div>
			<div className="user_card_container_container">
				<div className="user_card_container">
					{contributors.map((x) => (
						<User key={x?.name} user={x}></User>
					))}
					{!contributors.length && <Error text={"No contributors found"}></Error>}
				</div>
			</div>
		</div>
	);
}

export default Orga;
