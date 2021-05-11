import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import Orga from "./components/sites/Orga";
// import Repo from "./components/sites/Repo";
import LandingPage from "./components/sites/LandingPage";
import Navbar from "./components/utils/Navbar";

function App() {
	return (
		<Router>
			<Navbar></Navbar>
			<Route path="/" component={LandingPage}></Route>
			<Route path="/orga/:orgaName" component={Orga}></Route>
			{/* <Route path="/repo/:orgaName/:repoName" component={Repo}></Route> */}
		</Router>
	);
}

export default App;
