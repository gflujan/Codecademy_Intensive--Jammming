// React
import React from "react";

// Packages
// Context
// Components
// Assets
// Constants

// Utils / Methods
import Spotify from '../../utils/Spotify.js';

// Styles

/* ========================================================================== */
// DEFINING THE `HEADER` COMPONENT
/* ========================================================================== */
const Header = (props) => {
   return (
      <header>
         <h1>Spotify Playlist Maker</h1>
         <button className="spotify-auth-btn" onClick={() => Spotify.login()} type="button">
            log in
         </button>
      </header>
   );
};

export default Header;
