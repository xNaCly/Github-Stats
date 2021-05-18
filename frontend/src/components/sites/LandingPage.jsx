// import Error from "../utils/Error";
import { Link } from "react-router-dom";

function LandingPage() {
	return (
		<div className="landingpage">
			<Link to="/orga/fosscord">Fosscord</Link>
			{/* <div style={{ margin: "3rem" }}>
				<Error type="" text="alert"></Error>
				<Error type="warning" text="alert.warning"></Error>
				<Error type="danger" text="alert.danger"></Error>
				<Error type="success" text="alert.success"></Error>
			</div>
			<div style={{ margin: "3rem" }}>
				<button>button</button>
				<button className="warning">button.warning</button>
				<button className="danger">button.danger</button>
				<button className="success">button.success</button>
			</div> */}
		</div>
	);
}

export default LandingPage;
