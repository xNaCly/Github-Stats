import { Link } from "react-router-dom";
import { Pie, Doughnut } from "react-chartjs-2";
import User from "../utils/User";
import OrgaComp from "../utils/OrgaComp";

const data = {
	labels: [],
	datasets: [
		{
			label: "# of Commits",
			data: [12, 19, 3, 5],
			backgroundColor: [
				"rgb(46, 52, 64, 0.8)",
				"rgb(60, 67, 83, 0.8)",
				"rgb(67, 76, 94, 0.8)",
				"rgb(76, 86, 106, 0.8)",
			],
			borderColor: [
				"rgb(46, 52, 64, 0.8)",
				"rgb(60, 67, 83, 0.8)",
				"rgb(67, 76, 94, 0.8)",
				"rgb(76, 86, 106, 0.8)",
			],
			borderWidth: 1,
		},
	],
};

function LandingPage() {
	return (
		<div className="landingpage">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
				<path
					fill="var(--third)"
					fillOpacity="1"
					d="M0,128L40,138.7C80,149,160,171,240,160C320,149,400,107,480,96C560,85,640,107,720,133.3C800,160,880,192,960,208C1040,224,1120,224,1200,218.7C1280,213,1360,203,1400,197.3L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
			</svg>
			<div className="landingpage_header_container">
				<h1 className="landingpage_header">Github Stats</h1>
				<p className="landingpage_sub_header">
					a minimal and easy to use dashboard for{" "}
					<a href="https://github.com">Github</a> organisation and
					user statistics
				</p>
				<div className="landingpage_header_button_container">
					<a href="https://github.com/xnacly/github-stats">
						<button>Github</button>
					</a>
					<Link to="orga/fosscord">
						<button className="clean">Example</button>
					</Link>
				</div>
			</div>
			<div className="landingpage_header_container_extra">
				<div className="pie_container_container"></div>
				<div>
					<h1 className="landingpage_header">
						Extensive statistics.
					</h1>
					{/* <p className="landingpage_sub_header big_text">
						Featuring:
					</p> */}
					<span>Organisation:</span>
					<OrgaComp
						landing={true}
						orgaName={"fosscord"}
						totalStats={{
							totalCommits: 6258,
							totalAdditions: 1888663,
							totalDeletions: 1471577,
							totalAdditionsPerCommit: 18378,
						}}></OrgaComp>
					{/* <ul>
						<li>Commits</li>
						<li>Additions</li>
						<li>Deletions</li>
						<li>Additions/Commit</li>
					</ul> */}
					<span>Contributor:</span>
					<User
						landing={true}
						user={{
							name: "xnacly",
							additions: 191576,
							deletions: 4778,
							realAdditions: 186798,
							commits: 87,
							additionsPerCommit: 2202,
						}}></User>
					{/* <ul>
						<li>Commits</li>
						<li>Additions</li>
						<li>Deletions</li>
						<li>Additions/Commit</li>
					</ul> */}
					<span className="smoll_text cursive">
						alongside of various informative charts
					</span>
				</div>

				{/* <div className="landingpage_header_button_container">
					<a href="https://github.com/xnacly/github-stats">
						<button>Github</button>
					</a>
					<Link to="orga/fosscord">
						<button className="clean">Example</button>
					</Link>
				</div> */}
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

export default LandingPage;
