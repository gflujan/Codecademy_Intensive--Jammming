// React
import React, { Component } from "react";

// Packages
// import chalk from 'chalk';

// Context

// Components
import Header from "./Header.js";
import Playlist from "../Playlist/Playlist.js";
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";

// Assets
// Constants

// Utils / Methods
import Spotify from "../../utils/Spotify.js";

// Styles
import "./App.css";

class App extends Component {
   constructor(props) {
      super(props);

      this.state = {
         isSpotifyCallbackPresent: false,
         playlistName: "",
         playlistNamePlaceholder: "Enter a name...",
         playlistTracks: [],
         searchResults: [],
      };

      [
         // prettier-ignore
         'addTrack',
         "clear",
         "clearPlaylistNamePlaceholder",
         "removeTrack",
         "restorePlaylistNamePlaceholder",
         "savePlaylist",
         "search",
         "updatePlaylistName",
      ].forEach((m) => {
         this[m] = this[m].bind(this);
      });
   }

   render() {
      this.listenForSpotifyCallback();
      const { isSpotifyCallbackPresent } = this.state;

      if (isSpotifyCallbackPresent) {
         Spotify.processCallback();
      }

      return (
         <div>
            <div className="App">
               <Header />
               <SearchBar onClear={this.clear} onSearch={this.search} />
               <div className="App-playlist">
                  <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
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

   /* ========================================================================== */
   // CUSTOM COMPONENT UTILS
   /* ========================================================================== */
   addTrack(track) {
      const { playlistTracks } = this.state;
      const foundTrackID = playlistTracks.find((savedTrack) => savedTrack.id === track.id);

      // Prevents the user from adding duplicates (i.e. the same song) to the playlist
      if (foundTrackID) {
         return;
      } else {
         playlistTracks.push(track);
         this.setState({ playlistTracks });
      }
   }

   clear() {
      this.setState({
         playlistName: "",
         playlistNamePlaceholder: "Enter a name...",
         playlistTracks: [],
         searchResults: [],
      });
   }

   // Update state to reflect focusing playlist name field
   clearPlaylistNamePlaceholder() {
      this.setState({
         playlistNamePlaceholder: "",
      });
   }

   // listen for the Spotify call & response and check for our callback
   listenForSpotifyCallback() {
      // TODO **[G]** :: REMOVE ME!!! -- Create a helper or a switch to determine the proper base URL for the current NODE_ENV
      // console.log(process.env);
      const base = "http://localhost:8888";

      window.addEventListener("load", (event) => {
         const { origin, pathname } = window.location;
         const isSpotifyCallbackPresent = `${origin}${pathname}` === `${base}/callback`;
         this.setState({ isSpotifyCallbackPresent });
      });
   }

   removeTrack(track) {
      const newPlaylistTracks = this.state.playlistTracks.filter(
         (savedTrack) => savedTrack.id !== track.id
      );

      this.setState({ playlistTracks: newPlaylistTracks });
   }

   // Update state to reflect blurring playlist name field
   restorePlaylistNamePlaceholder() {
      this.setState({
         playlistNamePlaceholder: "Playlist name",
      });
   }

   savePlaylist() {
      Spotify.savePlaylist();

      this.setState({
         playlistName: "",
         playlistTracks: [],
      });
   }

   // VERSION 1 - Search Method -- This gives the "TypeError: this.props.tracks.map is not a function"
   search(term) {
      Spotify.search(term).then((searchResults) => {
         this.setState({ searchResults });
      });
   }

   updatePlaylistName(name) {
      this.setState({ playlistName: name });
   }
}

export default App;
