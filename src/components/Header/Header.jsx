import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/ContextProviders';

const Header = () => {
    const {logOutUser , user} = useContext(AuthContext);
    const handleSgnOut = ()=>{
        logOutUser()
        .then(result=>{
        })
        .catch(error=>{
            alert(error.message)
        })
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                {
                    user?<div style={{display:"inline", color: "#fff", marginLeft:"10px"}}><span>{user.email}</span><button onClick={handleSgnOut} style={{marginLeft:"10px"}}>Sign Out</button></div>:<Link to="/login">Login</Link>
                }
    
            </div>
        </nav>
    );
};

export default Header;