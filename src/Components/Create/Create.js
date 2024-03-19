import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/FirebaseContext'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, ErrorMessage, Field } from 'formik'
import { sellFormValidationSchema } from '../../FormValidationSchema/sellFormValidation'
import LoadingPopup from '../Loading/LoadingPopup';



const Create = () => {

  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext)
  // const {firestore} = useContext(FirebaseContext)

  const firestore = getFirestore();
  const navigate = useNavigate()


  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const { name, category, price } = values;
      console.log(values);
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
      setTimeout(() => {
        setIsLoading(false);
        navigate('/');
        console.log('Document successfully written!');
      }, 2000); 
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };

  const initialValues = {
    name: '',
    category: '',
    price: '',
  }


  return (
    <Fragment>
      <LoadingPopup isLoading={isLoading} />
      <Header />
      <card>
        <div className="centerDiv">
          <h2>Post Your AD</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={sellFormValidationSchema}
            onSubmit={handleSubmit}

          >
            <Form>
              <label htmlFor="fname">Name</label>
              <br />
              <Field className="input" type="text" name="name" ></Field>
              <ErrorMessage name="name" component="div" className="error" style={{ color: 'red' }} />
              <br />
              <label htmlFor="fname">Category</label>
              <br />
              <Field className="input" type="text" name="category" ></Field>
              <ErrorMessage name="category" component="div" className="error" style={{ color: 'red' }} />
              <br />
              <label htmlFor="fname">Price</label>
              <br />
              <Field className="input" type="number" name="price" ></Field>
              <ErrorMessage name="price" component="div" className="error" style={{ color: 'red' }} />
              <br />
              <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""} ></img>
              <br />
              <input onChange={(e) => {
                setImage(e.target.files[0])
              }} type="file" />
              <br />
              <button type="submit" className="uploadBtn">upload and Submit</button>
              <br />
            </Form>
          </Formik>


        </div>
      </card>
    </Fragment>
  );
};

export default Create;
