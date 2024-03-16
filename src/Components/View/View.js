import React, { useContext, useState,useEffect } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore/lite'
import { FirebaseContext } from '../../store/FirebaseContext';


function View() {
  const [userDetails,setUserDetails] = useState([])
  const {postDetails} = useContext(PostContext)
  const {firestore} = useContext(FirebaseContext)
  

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { userId } = postDetails;
        const q = query(collection(firestore, "users"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [postDetails, firestore]);
  

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span> {postDetails.name}  </span>
          <p> {postDetails.category} </p>
          <span> {postDetails.createdAt} </span>
        </div>
        <div className="contactDetails">
          <p> Seller Details </p>
          <p> {userDetails.userName} </p>
          <p> {userDetails.phone} </p>
        </div>
      </div>
    </div>
  );
}
export default View;
