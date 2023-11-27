import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import auth from "../../Firebase/firebase.config";
import { useState } from "react";
import { Link } from "react-router-dom";



const HeroRegister = () => {
  const [heroError, setHeroError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const handleRegister = (e) => {
    e.preventDefault()
    console.log('form submit');
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(email,name, password, accepted);
    if (password.length < 6) {
      setHeroError('Password should be al least 6 characters or longer')
      return;
    }
    else if (!/[A-Z]/.test(password)) {
      setHeroError('your password should be a one  UpperCase character')
      return;
    }
    else if (!accepted) {
      setHeroError("You must accept the terms and conditions")
      return;
    }
    setHeroError('')
    setSuccess('')

    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log(result);
        setSuccess('user Created successfully')

        updateProfile(result.user,{
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg"

        } )
        .then(()=>{
          console.log('profile updated');
        })
        .catch((error) => {
          console.log(error);
        });

        sendEmailVerification(result.user)
        .then(()=>{
          alert('please check your email and verify')
        })
        .catch(error => {
          console.log(error);
        })

        // const user = result.user;
      })
      .catch(error => {
        console.error(error)
        setHeroError(error.message)
      })
  }
  return (

    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        </div>
        <div className="card shrink-0 w-1/2 max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">name</span>
              </label>
              <input type="name" name='name' placeholder="name" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name='email' placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="mb-4 relative">
                <input
                  type={showPassword ? 'text' : "password"}
                  name='password'
                  placeholder="password"
                  className="input input-bordered w-full"
                  required
                />
                {/* <span  onClick={()=>setShowPassword(!showPassword)}>Show Password</span> */}
                <span className="absolute top-4 right-4" onClick={() => setShowPassword(!showPassword)} >
                  {
                    showPassword ? <FaEyeSlash /> : <FaEye />
                  }
                </span>
              </div>
              <div className="text-center">
              {
                heroError
                &&
                <p className="text-red-600">{heroError}</p>
              }

              {
                success &&
                <p className="text-green-600">{success}</p>
              }
              </div>

              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div>
              <input type="checkbox" name="terms" id="" />
              <label className="mb-2 ml-2" htmlFor="terms">Accept Our Terms And Conditions </label>
            </div>

            <br />
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <p className="text-center">Do you have an account please <Link to='/register'>Login</Link></p>
        </div>

      </div>

    </div>


  );
};

export default HeroRegister;