import React from "react";
import "./TrackList.css";

/* ---------------------------------------------
// Importing additional/external modules
--------------------------------------------- */
import { Track } from "../Track/Track";

class TrackList extends React.Component {
	/*constructor(props) {
		super(props);

		this.state = {  };
	}*/

	// Create an array of incoming tracks from the SearchResults
	// This array will then feed & populate the track list below

	render() {
		return (
			<div className="TrackList">
				{this.props.tracks.map(track => {
					return (
						<Track
							track={track}
							key={track.id}
							onAdd={this.props.onAdd}
							onRemove={this.props.onRemove}
							isRemoval={this.props.isRemoval}
						/>
					);
				})}
			</div>
		);
	}
}

export { TrackList };
