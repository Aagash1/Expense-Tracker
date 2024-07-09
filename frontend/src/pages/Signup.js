import React, { useEffect, useState, useRef } from 'react';
import { axiosClient } from '../utils/axiosClient';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

function Signup() {
  document.title = 'SignUp';
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("User")) {
      navigate("/");
    }
  }, [navigate]);

  const submitForm = async (e) => {
    e.preventDefault();
    
    if (!username || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      ref.current.staticStart();
      const response = await axiosClient.post('/auth/signup', {
        username,
        email,
        password
      });
      if (response.data.statusCode === 409) {
        toast.error("Email already registered");
      } else {
        toast.success("Registered Successfully!!");
        ref.current.complete();
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Registration failed!");
      ref.current.complete();
    }
  };

  return (
    <div className='bg-gray-900 w-screen h-screen flex flex-row'>
      <LoadingBar color='orange' ref={ref}></LoadingBar>      
      <div className='flex justify-center items-center w-3/5 h-screen'>
        <div className='flex flex-col gap-7 w-3/5 h-2/3 pt-20 items-center'>
          <h1 className='text-4xl text-yellow-400 font-bold -top-10 relative'>SignUp</h1>
          <input
            placeholder='UserName'
            onChange={(e) => setUsername(e.target.value)}
            className='w-96 h-12 pl-6 rounded-2xl transition-all outline-none focus:outline-2 focus:outline-white focus:outline-offset-4 bg-gray-800 text-white'
          />
          <input
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            className='w-96 h-12 pl-6 rounded-2xl transition-all outline-none focus:outline-2 focus:outline-white focus:outline-offset-4 bg-gray-800 text-white'
          />
          <input
            placeholder='Password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            className='w-96 h-12 pl-6 rounded-2xl outline-none transition-all focus:outline-2 focus:outline-white focus:outline-offset-4 bg-gray-800 text-white'
          />
          <button
            onClick={submitForm}
            className='w-96 h-12 justify-center text-lg rounded-2xl bg-yellow-600 text-center flex items-center font-bold hover:bg-yellow-700'
          >
            Submit
          </button>
          <p className='text-white text-lg -mt-4'>
            Already Registered? <a href='/login' className='underline text-yellow-400'>Login</a>
          </p>
        </div>
      </div>
      <hr className='w-0.5 h-3/4 mt-24 bg-white'></hr>
      <div className='left w-2/5 h-screen'>
        <h1 className='text-yellow-400 font-thin w-3/4 pl-10 text-7xl leading-tight relative top-1/4 left-10 whitespace-pre-wrap'>
          <span className='font-medium text-yellow-500'>Expense</span>
          <br />Tracker App!!
        </h1>
      </div>
    </div>
  );
}

export default Signup;
