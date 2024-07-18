import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { getAuth, createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import {  collection, addDoc } from 'firebase/firestore/lite';
import {useNavigate} from 'react-router-dom'
import {signUpValidationSchema} from '../../FormValidationSchema/signupValidation'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import LoadingPopup from '../Loading/LoadingPopup';


export default function Signup() {


  const {firestore} = useContext(FirebaseContext)
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = (values) => {
    setIsLoading(true);

    const { name, email, phone, password } = values;
    
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(auth.currentUser, {
          displayName: name
        });
        await addDoc(collection(firestore, 'users'), {
          userId: userCredential.user.uid,
          userName: name,
          phone: phone
        });
        setTimeout(() => {
          setIsLoading(false);
          navigate('/login');
        }, 2000); 
      })
      .catch((error) => {
        console.error('Error creating user: ', error);
      });
  };

  const initialValues = {
    name : '',
    email : '',
    phone : '',
    password : '',
    cpassword : ''
  }


  return (
    <div>
      <div className="signupParentDiv">
      <h1 style={{textAlign:'center',marginTopTop:'30px'}} >Welcome to</h1>
        <img style={{marginLeft:'60px',marginBottom:'20px'}} width="150px" height="150px" src={Logo}></img>
        <LoadingPopup isLoading={isLoading} />
        <Formik 
          initialValues={initialValues}
          validationSchema={signUpValidationSchema}
          onSubmit={handleSubmit}
        >
            <Form >
              <label htmlFor="fname">Username</label>
              <br />
              <Field type='text'  className='input' name='name'  ></Field>
               <ErrorMessage name="name" component="small" style={{ color: 'red' }} />
              <br />
              <label htmlFor="fname">Email</label>
              <br />
              <Field type='text'  className='input' name='email'  ></Field>
              <ErrorMessage name="email" component="small" style={{ color: 'red' }} />
              <br />
              <label htmlFor="lname">Phone</label>
              <br />

              <Field type='number'  className='input' name='phone' ></Field>
              <ErrorMessage name="phone" component="small" style={{ color: 'red' }} />

              <br />
              <label htmlFor="lname">Password</label>
              <br />

              <Field  type='password'  className='input' name="password" ></Field>
              <ErrorMessage name="password" component="small" style={{ color: 'red' }} />

              <br />
              <label htmlFor="lname">Confirm Password</label>
              <br />
              <Field  type='password'  className='input'  name="cpassword" ></Field>
              <ErrorMessage name="cpassword" component="small" style={{ color: 'red' }} />

              <br />
              <br />
              <button>Signup</button>
            </Form>

        </Formik>
        <a onClick={()=>{
          navigate('/login')
        }} >Login</a>
      </div>
    </div>
  );
}
