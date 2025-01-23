import React from "react";
import {useNavigate} from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h2 className="text-center mt-40 mr-10 ml-10 font-semibold text-4xl text-slate-100">WELCOME TO THE WEATHER APP</h2>
      <p className="text-center mt-8 mr-8 ml-8 text-slate-200">
        It is a long established fact that a reader will be distracted by the
        readable content of a page <br/> when looking at its layout. The point of
        using Lorem Ipsum is that it has a <br/> more-or-less normal distribution of
        letters as opposed to using 'Content here.
      </p>

      <div className="flex justify-center items-center">
        <button onClick={() => navigate("/sign-in")} type="button" className="mt-8 mr-4 font-semibold text-white text-xl bg-blue-700 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md py-2 px-5" >Sign In</button>
        <button onClick={() => navigate("/sign-up")} type="button" className="mt-8 ml-2 font-semibold text-white text-xl bg-blue-700 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md py-2 px-5">Sign Up</button>
      </div>
    </div>
  );
};

export default Hero;
