import React,{useEffect, useContext, useState} from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import { PostContext } from '../../store/PostContext';
import {useNavigate} from 'react-router-dom'
import LoadingPopup from '../Loading/LoadingPopup';

function Posts() {

  // const {firestore} = useContext(FirebaseContext)
  var firestore = getFirestore();

  const [products,setProducts] = useState([])
  const {setPostDetails,postDetails} = useContext(PostContext)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
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
      <LoadingPopup isLoading={isLoading} />
      <div className="moreView">
          <h2>Fresh recomentations</h2>
        <div className="heading">
          {/* <span>View more</span> */}
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
            <div className="date">
              <span> {product.createdAt} </span>
            </div>
            </div>
          </div>
            )
          })
        }


        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <h1>Fresh recommendations</h1>
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
            <div className="date">
              <span>10/5/2021</span>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
