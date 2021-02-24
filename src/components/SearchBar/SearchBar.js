// React
import React, { Component } from 'react';

// Packages
// Context
// Components
// Assets
// Constants
// Utils / Methods

// Styles
import './SearchBar.css';

/* ========================================================================== */
// DEFINING THE `SEARCH BAR` COMPONENT
/* ========================================================================== */
class SearchBar extends Component {
   constructor(props) {
      super(props);

      this.state = {
         term: '',
      };

      [
         // prettier-ignore
         'clear',
         'handleTermChange',
         'search',
      ].forEach(m => {
         this[m] = this[m].bind(this);
      });
   }

   search() {
      const { term } = this.state;
      const { onSearch } = this.props;
      onSearch(term);
   }

   // Allowing the user to hit "Enter" to trigger the search from the text box
   handleKeyPress(e) {
      if (e.key === 'Enter') {
         document.getElementById('search').click();
      }
   }

   handleTermChange(event) {
      this.setState({ term: event.target.value });
   }

   clear() {
      const { onClear } = this.props;
      this.setState({ term: '' });
      onClear();
   }

   render() {
      const { term } = this.state;

      return (
         <div className="SearchBar">
            <input
               placeholder="Enter a Song, Album or Artist"
               onChange={this.handleTermChange}
               onKeyPress={this.handleKeyPress}
               value={term}
            />
            <div className="buttons-container">
               {/* This SEARCH button sends a GET request to the Spotify API */}
               <button id="search" onClick={this.search}>
                  SEARCH
               </button>
               <button id="search" onClick={this.clear}>
                  CLEAR
               </button>
            </div>
         </div>
      );
   }
}

export default SearchBar;
