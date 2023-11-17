// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthComponent from './Auth';

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = (authenticated) => {
  root.render(
    <React.StrictMode>
      {authenticated ? <App /> : <AuthComponent onSuccess={() => renderApp(true)} />}
    </React.StrictMode>
  );
};

// Initially render the AuthComponent
renderApp(false);


