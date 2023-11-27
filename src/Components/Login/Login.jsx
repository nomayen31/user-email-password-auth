import React, { useState } from 'react';
import '../../App.css'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../../Firebase/firebase.config';

const Login = () => {
    
    const handleRegister = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email,password);


        createUserWithEmailAndPassword(auth, email,password)
        .then(result =>{
            console.log(result.user);
        })
        .catch(error=>{
            console.log(error.message);
            
        })

    }
    return (
        <div >
            <div className="mx-auto md:w-1/2">
                <h2 className='text-3xl'>Please Login</h2>
                <form onSubmit={handleRegister} className='mt-5' >
                    <input className='mb-4 w-3/4 py-2 px-4' type="email" name='email' id='' placeholder='Enter your Email' />
                    <br />
                    <input className='mb-4 w-3/4 py-2 px-4' type="password" name='password' id='' placeholder='Enter your Password' />
                    <br />
                    <input className='btn btn-secondary w-3/4 mb-4' type="submit" value="Register" />
                </form>
            </div>
           
        </div>
    );
};

export default Login;