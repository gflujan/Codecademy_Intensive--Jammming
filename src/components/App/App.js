import React from "react";
import "./App.css";

/* ---------------------------------------------
// Importing additional/external modules
--------------------------------------------- */
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import { Spotify } from "../../util/Spotify";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchResults: [],
			playlistTracks: [],
			playlistNamePlaceholder: "Playlist name",
			playlistName: ""
		};

		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.clearPlaylistNamePlaceholder = this.clearPlaylistNamePlaceholder.bind(
			this
		);
		this.restorePlaylistNamePlaceholder = this.restorePlaylistNamePlaceholder.bind(
			this
		);
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.search = this.search.bind(this);
	}

	// VERSION 1 - Search Method -- This gives the "TypeError: this.props.tracks.map is not a function"
	search(term) {
		Spotify.search(term).then(searchResults => {
			this.setState({ searchResults: searchResults });
		});
	}

	// VERSION 2 - Search Method -- This gives the same "TypeError: this.props.tracks.map is not a function"
	/*async search(term) {
		let searchResults = await Spotify.search(term);
		console.log(searchResults);
		this.setState({
			searchResults: searchResults,
		});
  }*/

	/*async search(term) {
  let searchResults = await Spotify.search(term);*/

	// Version 1 -- this doesn't work; gives an error of "not a function"

	addTrack(track) {
		if (
			this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)
		) {
			return;
		} else {
			let newPlaylistTracks = this.state.playlistTracks.push(track);
			this.setState({ playlistTracks: newPlaylistTracks });
		}
	}

	// Version #2 -- the problem with this is that I can add multiple copies of the same song, it's not checking to see if the track is already added

	/*addTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks.push(track);

    this.setState({playlistTracks: tracks});
  }*/

	removeTrack(track) {
		let newPlaylistTracks = this.state.playlistTracks.filter(
			savedTrack => savedTrack.id !== track.id
		);
		this.setState({ playlistTracks: newPlaylistTracks });
	}

	// Update state to reflect focusing playlist name field
	clearPlaylistNamePlaceholder() {
		this.setState({
			playlistNamePlaceholder: ""
		});
	}

	// Update state to reflect blurring playlist name field
	restorePlaylistNamePlaceholder() {
		this.setState({
			playlistNamePlaceholder: "Playlist name"
		});
	}

	updatePlaylistName(name) {
		this.setState({ playlistName: name });
	}

	savePlaylist() {
		// Version #1
		/*let trackURIs = [];
		this.state.playlistTracks.forEach(track => trackURIs.push(track.uri));
		return (trackURIs);*/

		// Version #2
		/*let trackURIs = this.state.playlistTracks.map(track => track.uri);
		return (trackURIs);*/

		// Spotify Version
		Spotify.savePlaylist();

		this.setState({
			playlistName: "New Playlist",
			playlistTracks: []
		});
	}

	render() {
		return (
			<div>
				<h1>
					Neo's [Ja<span className="highlight">mmm</span>ing] App
				</h1>
				<div className="App">
					<SearchBar
						onSearch={this.search}
					/>
					<div className="App-playlist">
						<SearchResults
							searchResults={this.state.searchResults}
							onAdd={this.addTrack}
						/>
						<Playlist
							playlistPlaceholder={this.state.playlistNamePlaceholder}
							onFocus={this.clearPlaylistNamePlaceholder}
              onBlur={this.restorePlaylistNamePlaceholder}
							playlistName={this.state.playlistName}
							playlistTracks={this.state.playlistTracks}
							onRemove={this.removeTrack}
							onNameChange={this.updatePlaylistName}
							onSave={this.savePlaylist}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export { App };
