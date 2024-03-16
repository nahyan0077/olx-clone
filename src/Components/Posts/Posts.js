import React,{useEffect, useContext, useState} from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import { PostContext } from '../../store/PostContext';
import {useNavigate} from 'react-router-dom'

function Posts() {

  // const {firestore} = useContext(FirebaseContext)
  var firestore = getFirestore();

  const [products,setProducts] = useState([])
  const {setPostDetails,postDetails} = useContext(PostContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "sell"));
        const allProducts = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        setProducts(allProducts);
        console.log("Fetched products:", allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [firestore]);
  

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

        {
          products.map(product=>{
            return(

            <div
            className="card"
            key={product.id}
            onClick={()=>{
              setPostDetails(product)
              navigate('/viewpost')
            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price} </p>
              <span className="kilometer"> {product.category} </span>
              <p className="name"> {product.name} </p>
            </div>
            <div className="date">
              <span> {product.createdAt} </span>
            </div>
          </div>
            )
          })
        }


        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
