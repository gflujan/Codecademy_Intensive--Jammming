import React from "react";
import PropTypes from "prop-types";
import "./Playlist.css";

/* ---------------------------------------------
// Importing additional/external modules
--------------------------------------------- */
import { TrackList } from "../TrackList/TrackList";

class Playlist extends React.Component {
	constructor(props) {
		super(props);

		this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleNameChange(event) {
		this.props.onNameChange(event.target.value);
	}

	render() {
		return (
			<div className="Playlist">
				<input
					type="text"
					defaultValue={this.props.playlistName}
					placeholder={this.props.playlistPlaceholder}
					onChange={this.handleNameChange}
					onFocus={this.props.onFocus}
					onBlur={this.props.onBlur}
				/>
				<TrackList
					tracks={this.props.playlistTracks}
					onRemove={this.props.onRemove}
					isRemoval={true}
				/>
				<a className="Playlist-save" onClick={this.props.onSave}>
					SAVE TO SPOTIFY
				</a>
				{/* This SAVE button sends a POST request to the Spotify API */}
				{/* It needs to grab an Object from the TrackList module to send to Spotify */}
			</div>
		);
	}
}

Playlist.propTypes = {
	onFocus: PropTypes.func.isRequired,
	onBlur: PropTypes.func.isRequired
};

export { Playlist };
