import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Navbar.css';
import CartIcon from "../assets/cart-icon.png";
import ProfileIcon from "../assets/user-icon.png";



const Navbar = () => {
  return (
    <nav>
      <Link to='/'><button>Home</button></Link>
      <Link to='/signup'><button>Register</button></Link>
      <Link to='/login'><button>Login</button></Link>

      <Link to='cart'>
      <div className="cart-btn">
        <img src={CartIcon} alt="Cart Icon" />
        <span className="cart-icon-css">0</span>
      </div>
      </Link>

      <Link to='userprofile'>
      <div className="profile-icon">
        <img src={ProfileIcon} alt="Profile Icon" />
       </div>
      </Link>
      
    </nav>
  )
}

export default Navbar
