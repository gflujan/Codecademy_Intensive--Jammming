// React
import React from "react";
import PropTypes from "prop-types";

// Packages
// Context

// Components
import Track from "../Track/Track";

// Assets
// Constants
// Utils / Methods

// Styles
import "./TrackList.css";

/* ========================================================================== */
// DEFINING THE `TRACK LIST` COMPONENT
/* ========================================================================== */
const TrackList = (props) => {
   const { isRemoval, onAdd, onRemove, tracks } = props;

   return (
      <div className="TrackList">
         {tracks.length > 0 &&
            tracks.map((track) => {
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

/* ========================================================================== */
/* PROP TYPES DECLARATIONS */
/* ========================================================================== */
TrackList.defaultProps = {
   isRemoval: true,
   onAdd: () => {},
   onRemoval: () => {},
   tracks: [],
};

TrackList.propTypes = {
   isRemoval: PropTypes.bool,
   onAdd: PropTypes.func,
   onRemoval: PropTypes.func,
   tracks: PropTypes.arrayOf(
      PropTypes.shape({
         album: PropTypes.string,
         artist: PropTypes.string,
         id: PropTypes.string,
         name: PropTypes.string,
         uri: PropTypes.string,
      })
   ),
};

export default TrackList;
