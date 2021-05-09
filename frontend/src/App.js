import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Orga from "./components/sites/Orga";
import Repo from "./components/sites/Repo";
import LandingPage from "./components/sites/LandingPage";

function App() {
	return (
		<Router>
			<Route path="/" component={LandingPage}></Route>
			<Route path="/orga/:orgaName" component={Orga}></Route>
			<Route path="/repo/:orgaName/:repoName" component={Repo}></Route>
		</Router>
	);
}

export default App;
