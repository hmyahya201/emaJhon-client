import React, { useContext } from 'react';
import { AuthContext } from '../../providers/ContextProviders';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css'
const Login = () => {
    const {loginUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";
    console.log(from)
    const handleLoginForm = (event)=>{
        event.preventDefault();
        const form = event.target
        const email = form.email.value;
        const password = form.password.value;
        loginUser(email, password)
        .then(result=>{
            form.reset()
            navigate(from, {replace: true})
        })
        .then(error=>{
            alert(error.message)
        })
    }
    return (
        <div>
            <form onSubmit={handleLoginForm} className='login-register_form'>
                <h2 className='form_title'>Please Login</h2>
                <div className='form_input-sec'>
                    <label className='form_label' htmlFor="email">Email</label>
                    <input className='form_input'  type="email" id="email" name="email" placeholder='Email'/>
                </div>
                <div className='form_input-sec'>
                    <label className='form_label' htmlFor="password">Password</label>
                    <input className='form_input'  type="password" id="password" name="password" placeholder='Password'/>
                </div>
                <p className='form_Link'>New in this website? please <Link className='form_link-button' to="/register">Register</Link></p>
                <button type='submit' className="login-register-btn">Login</button>
            </form>
        </div>
    );
};

export default Login;