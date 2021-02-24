// React
import React from 'react';

// Packages
// Context

// Components
import TrackList from '../TrackList/TrackList';

// Assets
// Constants
// Utils / Methods
// Styles
import './SearchResults.css';

/* ========================================================================== */
// DEFINING THE `SEARCH RESULTS` COMPONENT
/* ========================================================================== */
const SearchResults = props => {
   const { onAdd, searchResults } = props;

   return (
      <div className="SearchResults">
         <h2>Results</h2>
         <TrackList isRemoval={false} onAdd={onAdd} tracks={searchResults} />
      </div>
   );
};

export default SearchResults;
