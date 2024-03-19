import React,{useContext, useState} from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import LoadingPopup from '../Loading/LoadingPopup';





function Header() {

  const {user} = useContext(AuthContext)
  const {firestore} = useContext(FirebaseContext)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); 
   
    const confirmation = window.confirm('Are you sure you want to logout?');
    if (confirmation) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          navigate('/login');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" 
          placeholder='India'
          />
          <Arrow ></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">

          {
            user ? <span >welcome to, <span style={{fontWeight:'bold',marginLeft:'10px'}} > {user.displayName} </span> </span> : 
            <span onClick={()=>{
              navigate('/login')
            }} >Login</span>
          }
          <hr />
        </div>

        {user && <span onClick={handleLogout} style={{cursor:'pointer'}} > Logout </span>} 
        <LoadingPopup isLoading={isLoading} />

        <div className="sellMenu" onClick={()=>{
          { user ? navigate('/sell') : navigate('/login') }
        }} >
          <SellButton></SellButton>
          <div className="sellMenuContent" style={{marginRight:'60px'}} >
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
