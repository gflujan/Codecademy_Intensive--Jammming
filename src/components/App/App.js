// React
import React, { Component } from 'react';

// Packages
// Context

// Components
import Playlist from '../Playlist/Playlist.js';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';

// Assets
// Constants

// Utils / Methods
import Spotify from '../../util/Spotify.js';

// Styles
import './App.css';

class App extends Component {
   constructor(props) {
      super(props);

      this.state = {
         playlistName: '',
         playlistNamePlaceholder: 'Playlist name',
         playlistTracks: [],
         searchResults: [],
      };

      [
         // prettier-ignore
         'addTrack',
         'clear',
         'clearPlaylistNamePlaceholder',
         'removeTrack',
         'restorePlaylistNamePlaceholder',
         'savePlaylist',
         'search',
         'updatePlaylistName',
      ].forEach(m => {
         this[m] = this[m].bind(this);
      });
   }

   // VERSION 1 - Search Method -- This gives the "TypeError: this.props.tracks.map is not a function"
   search(term) {
      Spotify.search(term).then(searchResults => {
         this.setState({ searchResults });
      });
   }

   clear() {
      this.setState({
         playlistName: '',
         playlistNamePlaceholder: 'Playlist name',
         playlistTracks: [],
         searchResults: [],
      });
   }

   addTrack(track) {
      const { playlistTracks } = this.state;
      const foundTrackID = playlistTracks.find(
         savedTrack => savedTrack.id === track.id,
      );

      // Prevents the user from adding duplicates (i.e. the same song) to the playlist
      if (foundTrackID) {
         return;
      } else {
         playlistTracks.push(track);
         this.setState({ playlistTracks });
      }
   }

   removeTrack(track) {
      const newPlaylistTracks = this.state.playlistTracks.filter(
         savedTrack => savedTrack.id !== track.id,
      );

      this.setState({ playlistTracks: newPlaylistTracks });
   }

   // Update state to reflect focusing playlist name field
   clearPlaylistNamePlaceholder() {
      this.setState({
         playlistNamePlaceholder: '',
      });
   }

   // Update state to reflect blurring playlist name field
   restorePlaylistNamePlaceholder() {
      this.setState({
         playlistNamePlaceholder: 'Playlist name',
      });
   }

   updatePlaylistName(name) {
      this.setState({ playlistName: name });
   }

   savePlaylist() {
      Spotify.savePlaylist();

      this.setState({
         playlistName: '',
         playlistTracks: [],
      });
   }

   render() {
      return (
         <div>
            <h1>
               Neo's [Ja<span className="highlight">mmm</span>ing] App
            </h1>
            <div className="App">
               <SearchBar onClear={this.clear} onSearch={this.search} />
               <div className="App-playlist">
                  <SearchResults
                     onAdd={this.addTrack}
                     searchResults={this.state.searchResults}
                  />
                  <Playlist
                     onBlur={this.restorePlaylistNamePlaceholder}
                     onFocus={this.clearPlaylistNamePlaceholder}
                     onNameChange={this.updatePlaylistName}
                     onRemove={this.removeTrack}
                     onSave={this.savePlaylist}
                     playlistName={this.state.playlistName}
                     playlistPlaceholder={this.state.playlistNamePlaceholder}
                     playlistTracks={this.state.playlistTracks}
                  />
               </div>
            </div>
         </div>
      );
   }
}

export default App;
