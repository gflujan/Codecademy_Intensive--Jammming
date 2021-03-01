import React from 'react';
import PropTypes from 'prop-types';
import './Playlist.css';

/* ---------------------------------------------
// Importing additional/external modules
--------------------------------------------- */
import TrackList from '../TrackList/TrackList';

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
               onBlur={this.props.onBlur}
               onChange={this.handleNameChange}
               onFocus={this.props.onFocus}
               placeholder={this.props.playlistPlaceholder}
               type="text"
               value={this.props.playlistName}
            />
            <TrackList
               isRemoval={true}
               onRemove={this.props.onRemove}
               tracks={this.props.playlistTracks}
            />
            <button className="Playlist-save" onClick={this.props.onSave}>
               SAVE TO SPOTIFY
            </button>
            {/* This SAVE button triggers a POST request to the Spotify API */}
            {/* It needs to grab an Object from the TrackList module to send to Spotify */}
         </div>
      );
   }
}

Playlist.propTypes = {
   onFocus: PropTypes.func.isRequired,
   onBlur: PropTypes.func.isRequired,
};

export default Playlist;
