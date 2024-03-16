import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {FirebaseContext} from './store/FirebaseContext'
import {firestore} from './firebase/config'
import {Context} from './store/FirebaseContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{firestore}} >
      <Context>
        <App />
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>
);


