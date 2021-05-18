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
			const types = [
				"commits",
				"additions",
				"deletions",
				"additionsPerCommit",
			].filter((e) => e !== type);
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
				headers: { Authorization: auth },
			});
			res = await res.json();
			for (const x in res) {
				let tempStats = {
					totalCommits: (totalStats.totalCommits += res[x].commits),
					totalAdditions: (totalStats.totalAdditions +=
						res[x].additions),
					totalDeletions: (totalStats.totalDeletions +=
						res[x].deletions),
					totalAdditionsPerCommit:
						(totalStats.totalAdditionsPerCommit +=
							res[x].additionsPerCommit),
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
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
				<path
					fill="var(--third)"
					fillOpacity="1"
					d="M0,128L40,138.7C80,149,160,171,240,160C320,149,400,107,480,96C560,85,640,107,720,133.3C800,160,880,192,960,208C1040,224,1120,224,1200,218.7C1280,213,1360,203,1400,197.3L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
			</svg>
			{auth ? (
				<div className="header">
					<div className="orga_container_container">
						<div className="orga_container">
							<div className="orga_card">
								<div className="orga_header">
									<a href={`https://github.com/${orgaName}`}>
										{orgaName}
									</a>
								</div>
								<div className="user_card_stat_container">
									<h5 className="user_card_stat_header">
										Total Commits
									</h5>
									<span className="user_card_stat_content">
										{totalStats.totalCommits}
									</span>
								</div>
								<div className="user_card_stat_container">
									<h5 className="user_card_stat_header">
										Total Additions
									</h5>
									<span className="user_card_stat_content">
										{totalStats.totalAdditions}
									</span>
								</div>
								<div className="user_card_stat_container">
									<h5 className="user_card_stat_header">
										Total Deletions
									</h5>
									<span className="user_card_stat_content">
										{totalStats.totalDeletions}
									</span>
								</div>
								<div className="user_card_stat_container">
									<h5 className="user_card_stat_header">
										Total Additions/Commit
									</h5>
									<span className="user_card_stat_content">
										{totalStats.totalAdditionsPerCommit}
									</span>
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
			) : (
				<div className="user_card_container_container">
					<div className="user_card_container">
						<Error
							text="Please sign in with Github"
							type="warning"></Error>
					</div>
				</div>
			)}
			<div className="user_card_container_container">
				<div className="user_card_container">
					{contributors.map((x) => (
						<User key={x?.name} user={x}></User>
					))}

					{auth && !contributors.length && (
						<Error text={"No contributors found"}></Error>
					)}
				</div>
			</div>
			<svg viewBox="0 0 1920 250" xmlns="http://www.w3.org/2000/svg">
				<path
					fill="var(--third)"
					d="M1920 250H0V0s126.707 78.536 349.975 80.05c177.852 1.203 362.805-63.874 553.803-63.874 290.517 0 383.458 57.712 603.992 61.408 220.527 3.696 278.059-61.408 412.23-17.239"></path>
				<path
					fill="var(--secondary)"
					d="M1920 144s-467.917 116.857-1027.243-17.294C369.986 1.322 0 45.578 0 45.578V250h1920V144z"></path>
				<path
					fill="var(--primary)"
					d="M0 195.553s208.547-75.581 701.325-20.768c376.707 41.908 520.834-67.962 722.545-67.962 222.926 0 311.553 83.523 496.129 86.394V250H0v-54.447z"></path>
			</svg>
		</div>
	);
}

export default Orga;
