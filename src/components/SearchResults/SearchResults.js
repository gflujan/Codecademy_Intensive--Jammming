import React from "react";
import "./SearchResults.css";

/* ---------------------------------------------
// Importing additional/external modules
--------------------------------------------- */
import { TrackList } from "../TrackList/TrackList";

class SearchResults extends React.Component {
	/*constructor(props) {
		super(props);

		this.state = {  };
	}*/

	renderSearchResults() {
		/*return (
			Object.forEach(

			);
		);*/
	}

	render() {
		return (
			<div className="SearchResults">
				<h2>Results</h2>
				<TrackList
					tracks={this.props.searchResults}
					onAdd={this.props.onAdd}
					isRemoval={false}
				/>
			</div>
		);
	}
}

export { SearchResults };
