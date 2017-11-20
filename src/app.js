import React from 'react';
import ReactDOM from 'react-dom';

// import main container component
import BoilerPlate from './components/BoilerPlate'

// style reset (start from same base of default css using normalize.css)
// useful for cross browser support
import 'normalize.css/normalize.css';
// style import
import './styles/styles.scss';

ReactDOM.render(<BoilerPlate />, document.getElementById('app'));