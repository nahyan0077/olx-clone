import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom'


function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError,setError] = useState('')

  const {firestore} = useContext(FirebaseContext)

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/')
      })
      .catch((error) => {
        setError(error.message)
        console.log("the error is.....",error);
      });

  }

  return (
    <div>
      <div className="loginParentDiv">
        <h1 style={{textAlign:'center',marginTopTop:'30px'}} >Welcome to</h1>
        <img style={{marginLeft:'60px',marginBottom:'20px'}} width="150px" height="150px" src={Logo}></img>
        <p style={{color:'red'}} > {loginError} </p>
        <form onSubmit={handleLogin} > 
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <br />
        <a style={{fontWeight:'bold'}} onClick={()=>{
          navigate('/signup')
        }} >Signup</a>
      </div>
    </div>
  );
}

export default Login;
