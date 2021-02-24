// React
import React from 'react';

// Packages
// Context

// Components
import Track from '../Track/Track';

// Assets
// Constants
// Utils / Methods

// Styles
import './TrackList.css';

/* ========================================================================== */
// DEFINING THE `TRACK LIST` COMPONENT
/* ========================================================================== */
const TrackList = props => {
   const { isRemoval, onAdd, onRemove, tracks } = props;

   return (
      <div className="TrackList">
         {!!tracks.length && tracks.map(track => {
            return (
               <Track
                  isRemoval={isRemoval}
                  key={track.id}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  track={track}
               />
            );
         })}
      </div>
   );
};

export default TrackList;
