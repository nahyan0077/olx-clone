import React, { useContext, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {AuthContext, FirebaseContext} from './store/FirebaseContext'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Post from './store/PostContext'


import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';



function App() {
  const {user,setUser} = useContext(AuthContext)
  const {firestore} = useContext(FirebaseContext)
  
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (User) => {
      setUser(User)
    });

  }, [])
  

  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={ <Signup/> } />
            <Route path='/login' element={ <Login/> } />
            <Route path='/sell' element={ <Create/> } />
            <Route path='/viewpost' element={ <ViewPost/> } />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
