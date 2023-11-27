import { createUserWithEmailAndPassword } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import auth from "../../Firebase/firebase.config";
import { useState } from "react";



const HeroRegister = () => {
  const [heroError, setHeroError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const handleRegister = (e) => {
    e.preventDefault()
    console.log('form submit');
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    if (password.length < 6) {
      setHeroError('Password should be al least 6 characters or longer')
      return;
    }
    else if (!/[A-Z]/.test(password)) {
      setHeroError('your password should be a one  UpperCase character')
      return;
    }
    setHeroError('')
    setSuccess('')

    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log(result);
        setSuccess('user Created successfully')

        // const user = result.user;
      })
      .catch(error => {
        console.error(error)
        setHeroError(error.message)
      })
  }
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleRegister} className="card-body">
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
                <input
                  type={showPassword ? 'text' : "password"}
                  name='password'
                  placeholder="password"
                  className="input input-bordered"
                  required />
                {/* <span  onClick={()=>setShowPassword(!showPassword)}>Show Password</span> */}
                <div className="">
                  {
                  showPassword ? <FaEyeSlash onClick={()=>setShowPassword(!showPassword)} /> :<FaEye  onClick={()=>setShowPassword(!showPassword)}/>
                }
                </div>

                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
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
      </div>
    </div>
  );
};

export default HeroRegister;