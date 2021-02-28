// React
import React from 'react';
import ReactDOM from 'react-dom';

// Packages
// Context

// Components
import App from './components/App/App.js';

// Assets
// Constants

// Utils / Methods
import registerServiceWorker from './registerServiceWorker';

// Styles
import './index.css';

/* ========================================================================== */
// DEFINING THE `MAIN APP` RENDER OUTPUT
/* ========================================================================== */
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
