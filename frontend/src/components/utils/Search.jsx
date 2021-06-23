import { useState } from "react";
import { useHistory } from "react-router-dom";

function Search() {
	const [search, updateSearch] = useState("");
	let history = useHistory();

	return (
		<div className="searchContainer">
			<input
				placeholder="Search"
				className="searchInput"
				onChange={(e) => updateSearch(e.target.value)}
				onKeyPress={(e) => {
					e.key === "Enter" && history.push(`/orga/${search}`);
				}}
			/>
			<button
				className="searchSubmit"
				onClick={(e) => search && history.push(`/orga/${search}`)}>
				Search
			</button>
		</div>
	);
}

export default Search;
