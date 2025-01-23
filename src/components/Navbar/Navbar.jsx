import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-3">
      <h1 className="text-2xl text-slate-100 ml-8 font-medium">WEATHER</h1>

      <nav className="mr-24">
        <a
          href="/"
          className="font-medium px-3 py-2 text-lg text-slate-100 rounded-lg  hover:text-slate-200"
        >
          Home
        </a>
        <a
          href="/weather"
          className="font-medium px-3 py-2 text-lg text-slate-100 rounded-lg  hover:text-slate-200"
        >
          Weather
        </a>
      </nav>
      
    </div>
  );
};

export default Navbar;
