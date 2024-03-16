import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {  collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore/lite';
import {useNavigate} from 'react-router-dom'


export default function Signup() {
  const [userName,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')

  const {firestore} = useContext(FirebaseContext)

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await addDoc(collection(firestore, 'users'), {
          userId: userCredential.user.uid,
          userName: userName,
          phone: phone
        });
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error creating user: ', error);
      });
  };



  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo' ></img>
        <form onSubmit={handleSubmit} >
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
            name="name"
            defaultValue="John"
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
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
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
