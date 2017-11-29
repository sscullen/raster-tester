import React from 'react';
import ReactDOM from 'react-dom';

// import main container component
import Main from './components/Main'

// style reset (start from same base of default css using normalize.css)
// useful for cross browser support
import 'normalize.css/normalize.css';
// style import
import './styles/styles.scss';

ReactDOM.render(<Main />, document.getElementById('app'));