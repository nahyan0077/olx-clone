import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext, AuthContext} from '../../store/FirebaseContext'
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite'
import { useNavigate } from 'react-router-dom';

const Create = () => {


  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState(null)

  const {user} = useContext(AuthContext)
  // const {firestore} = useContext(FirebaseContext)
 
  const firestore = getFirestore();
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `/images/${image.name}`);
    
      const snapshot = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(snapshot.ref);
      
      const date = new Date();
      addDoc(collection(firestore, "sell"), {
        name: name,
        category: category,
        price: price,
        url: url,
        userId: user.uid,
        createdAt: date.toDateString()
      });
      navigate('/')
      console.log('Document successfully written!');
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };
  


  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
            id="fname" name="Price" />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""} ></img>
          
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
