import { useEffect, useState } from "react";
import fetch from "node-fetch";
import { production, paths, test_auth } from "../../config.json";
import User from "../utils/User";

function Orga({ match }) {
	const { orgaName } = match.params;
	const [contributors, updateContributors] = useState([]);
	const [activeFilter, updateFilter] = useState("commit");

	function sortContributors(type) {
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
			updateContributors(contr);
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
				<div>
					<button onClick={() => updateFilter("commits")}>Filter by commits</button>
					<button onClick={() => updateFilter("additions")}>Filter by additions</button>
					<button onClick={() => updateFilter("deletions")}>Filter by deletions</button>
					<button onClick={() => updateFilter("additionsPerCommit")}>Filter by additionsPerCommit</button>
				</div>
			</div>

			<div className="user_card_container">
				{contributors.map((x) => (
					<User key={x.name} user={x}></User>
				))}
				{() => sortContributors(activeFilter)}
			</div>
		</div>
	);
}

export default Orga;
