import { useEffect, useState } from "react";
import fetch from "node-fetch";
import { production, paths } from "../../config.json";
import User from "../utils/User";
import Error from "../utils/Error";

function Orga({ match }) {
	const { orgaName } = match.params;
	const [contributors, updateContributors] = useState([]);
	const [activeFilter, updateFilter] = useState("");
	const auth = localStorage.getItem("login");
	const [totalStats, updateStats] = useState({
		totalCommits: 0,
		totalAdditions: 0,
		totalDeletions: 0,
		totalAdditionsPerCommit: 0,
	});

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
		if (!auth) return <Error text="Please sign in with Github" type="warning"></Error>;
		const req = async () => {
			let contr = [];
			let res = await fetch(`${paths[production]}/total/${orgaName}`, {
				headers: { Authorization: auth },
			});
			res = await res.json();
			for (const x in res) {
				let tempStats = {
					totalCommits: (totalStats.totalCommits += res[x].commits),
					totalAdditions: (totalStats.totalAdditions += res[x].additions),
					totalDeletions: (totalStats.totalDeletions += res[x].deletions),
					totalAdditionsPerCommit: (totalStats.totalAdditionsPerCommit += res[x].additionsPerCommit),
				};
				updateStats(tempStats);
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
				<div className="orga_container_container">
					<div className="orga_container">
						<div className="orga_card">
							<div className="orga_header">
								<a href={`https://github.com/${orgaName}`}>{orgaName}</a>
							</div>
							<div className="user_card_stat_container">
								<h5 className="user_card_stat_header">Total Commits</h5>
								<span className="user_card_stat_content">{totalStats.totalCommits}</span>
							</div>
							<div className="user_card_stat_container">
								<h5 className="user_card_stat_header">Total Additions</h5>
								<span className="user_card_stat_content">{totalStats.totalAdditions}</span>
							</div>
							<div className="user_card_stat_container">
								<h5 className="user_card_stat_header">Total Deletions</h5>
								<span className="user_card_stat_content">{totalStats.totalDeletions}</span>
							</div>
							<div className="user_card_stat_container">
								<h5 className="user_card_stat_header">Total Additions/Commit</h5>
								<span className="user_card_stat_content">{totalStats.totalAdditionsPerCommit}</span>
							</div>
						</div>
					</div>
				</div>
				<div className="filter_container">
					<button
						className="filter_button"
						id="commits"
						onClick={() => {
							updateFilter("commits");
						}}>
						Sort by commits
					</button>
					<button
						className="filter_button"
						id="additions"
						onClick={() => {
							updateFilter("additions");
						}}>
						Sort by additions
					</button>
					<button
						className="filter_button"
						id="deletions"
						onClick={() => {
							updateFilter("deletions");
						}}>
						Sort by deletions
					</button>
					<button
						className="filter_button"
						id="additionsPerCommit"
						onClick={() => {
							updateFilter("additionsPerCommit");
						}}>
						Sort by additionsPerCommit
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
