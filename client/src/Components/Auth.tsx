import React, { useEffect, useState, FormEvent } from 'react';
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { loginUser, registerUser } from "../redux/actions/authActions";
import { AppDispatch, RootState } from '../redux/store';
import bg2 from "../assets/bg2.webp";
import Letter from "../assets/letter.png";

interface User {
  email: string;
  password: string;
}

const Auth: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    email: '',
    password: '',
  });

  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isResetPassword, setIsResetPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { signupSuccess, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (signupSuccess) {
      setIsSignUp(false);
    }
  }, [signupSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      console.error(error);
    }
  }, [error]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(registerUser(user));
    } else {
      dispatch(loginUser(user));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handlePasswordReset = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Implement password reset functionality
  };

  return (
    <div
      
    >
    
       {/* <Navbar /> */}
      <section className="min-h-screen flex items-center justify-center bg-[#f5f1e8] p-4 "
      style={{ backgroundImage: `url(${bg2})` , backgroundSize: 'auto' }}
      >
        <div className="paper-container flex rounded-sm shadow-paper-deep max-w-3xl p-8 items-center">

        <div className="md:block hidden w-1/2 pl-8">
            <img 
              className="rounded-sm shadow-paper-deep" 
              src={Letter} 
              alt="Vintage Correspondence" 
            />
          </div>
          <div className="md:w-1/2 px-8">
            <h2 className="font-fairplay text-3xl text-amber-900 text-center mb-6">
              {isResetPassword ? 'Reset Password' : isSignUp ? 'Sign Up' : 'Welcome Back'}
            </h2>

            {error && (
              <div className="mt-4 p-3 bg-red-100/80 border border-red-800/30 text-red-800 rounded-sm">
                {error}
              </div>
            )}

            {isResetPassword ? (
              <form onSubmit={handlePasswordReset} className="flex flex-col gap-4">
                <input
                  className="paper-input mt-4"
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <button
                  type="submit"
                  className="paper-button-primary"
                >
                  Send Reset Instructions
                </button>
                <button
                  type="button"
                  onClick={() => setIsResetPassword(false)}
                  className="text-amber-700/90 text-sm hover:underline"
                >
                  ← Return to Login
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  className="paper-input mt-4"
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <div className="relative">
                  <input
                    className="paper-input w-full"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-amber-700/80"
                  >
                    {showPassword ? <PiEyeSlash /> : <PiEye />}
                  </button>
                </div>
                <button
                  type="submit"
                  className="paper-button-primary text-lg tracking-wide"
                >
                  {isSignUp ? 'Sign Up' : 'Log In'}
                </button>
              </form>
            )}

            <div className="mt-8 grid grid-cols-3 items-center text-amber-700/80">
              <hr className="border-amber-700/20" />
              <p className="text-center text-sm font-crimson">Or Continue With</p>
              <hr className="border-amber-700/20" />
            </div>

            <button className="paper-button-secondary w-full mt-4 py-2 flex justify-center items-center text-sm hover:scale-105 duration-300">
              <FcGoogle className="w-5 h-5 mr-2 " />
              {isSignUp ? 'Enroll via Google' : 'Enter via Google'}
            </button>

            {!isSignUp && !isResetPassword && (
              <div
                className="mt-4 text-sm text-amber-700/80 text-center hover:underline cursor-pointer "
                onClick={() => setIsResetPassword(true)}
              >
                Forgotten your password?
              </div>
            )}

            <div className="mt-6 text-sm text-amber-700/80 flex justify-between items-center">
              <p className=" font-crimson text-sm font-semibold">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              </p>
              <button
                className="paper-button-alternative"
                onClick={() => setIsSignUp((prev) => !prev)}
              >
                {isSignUp ? 'Login' : 'Register'}
              </button>
            </div>
          </div>
          {/* <div className="md:block hidden w-1/2 pl-8">
            <img 
              className="rounded-sm shadow-paper-deep" 
              src={Letter} 
              alt="Vintage Correspondence" 
            />
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Auth;
