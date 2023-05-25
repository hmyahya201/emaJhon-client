import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/ContextProviders';

const Register = () => {
    const {createUser} = useContext(AuthContext)
    const handleRegisterForm = (event)=>{
        event.preventDefault();
        const form = event.target
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        createUser(email, password)
        .then(result=>{
            const loggedUser = result.user
            console.log(loggedUser)
            form.reset()
        })
        .catch(error=>{
            alert(error.message)
        })
        
    }
    return (
        <div>
            <form onSubmit={handleRegisterForm} className='login-register_form'>
                <h2 className='form_title'>Please Register</h2>
                <div className='form_input-sec'>
                    <label className='form_label' htmlFor="name">Name</label>
                    <input className='form_input'  type="text" id="name" name="name" placeholder='Name'/>
                </div>
                <div className='form_input-sec'>
                    <label className='form_label' htmlFor="email">Email</label>
                    <input className='form_input'  type="email" id="email" name="email" placeholder='Email'/>
                </div>
                <div className='form_input-sec'>
                    <label className='form_label' htmlFor="password">Password</label>
                    <input className='form_input'  type="password" id="password" name="password" placeholder='Password'/>
                </div>
                <div className='form_input-sec'>
                    <label className='form_label' htmlFor="confirmPassword">Confirm Password</label>
                    <input className='form_input'  type="password" id="confirmPassword" name="confirmPassword" placeholder='Confirm Your Password'/>
                </div>
                <p className='form_Link'>Already have an account? please <Link className='form_link-button' to="/login">Login</Link></p>
                <button type='submit' className="login-register-btn">Register</button>
            </form>
        </div>
    );
};

export default Register;