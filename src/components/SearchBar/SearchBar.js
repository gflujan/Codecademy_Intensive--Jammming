import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			term: ""
		};

		this.search = this.search.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
	}

	search(term) {
		this.props.onSearch(this.state.term);
	}

	// Allowing the user to hit "Enter" to trigger the search from the text box
	handleKeyPress(e) {
		if (e.key === "Enter") {
			document.getElementById("search").click();
		}
	}

	handleTermChange(event) {
		this.setState({ term: event.target.value });
	}

	render() {
		return (
			<div className="SearchBar">
				<input
					placeholder="Enter a Song, Album or Artist"
					onChange={this.handleTermChange}
					onKeyPress={this.handleKeyPress}
				/>

				{/* This SEARCH button sends a GET request to the Spotify API */}
				<a id="search" onClick={this.search}>
					SEARCH
				</a>
				{/* The returned results Object then needs to be passed into the TrackList module */}
			</div>
		);
	}
}

export { SearchBar };
