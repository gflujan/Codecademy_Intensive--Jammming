// React
import React from 'react';

// Packages
// Context
// Components
// Assets
// Constants
// Utils / Methods

// Styles
import './Track.css';

/* ========================================================================== */
// DEFINING THE `TRACK` COMPONENT
/* ========================================================================== */
const Track = props => {
   const { isRemoval, onAdd, onRemove, track } = props;
   const { album, artist, name } = track;

   return (
      <div>
         <div className="Track">
            <div className="Track-information">
               <h3>{name}</h3>
               <p>
                  {artist}
                  {' | '}
                  {album}
               </p>
            </div>
            {isRemoval && (
               <button className="Track-action" onClick={() => onRemove(track)}>
                  -
               </button>
            )}
            {!isRemoval && (
               <button className="Track-action" onClick={() => onAdd(track)}>
                  +
               </button>
            )}
         </div>
      </div>
   );
};

export default Track;
