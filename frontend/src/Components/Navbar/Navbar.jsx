import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

const Navbar = ({ user }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  //console.log(search);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/${user}/search/${search}`);
  }
  const handleLogout = () => {
    // Implement logout functionality here
    console.log("Logging out...");
    fetch("http://localhost:5000/logout", {
      credentials: "include"
    })
      .then(window.location.reload(true))
      .catch(error => console.error("Error:", error));
  }
  return (
    <div className="flex items-center h-[80px] px-6 border-b border-white/10 relative">
      <NavLink to={"/"}><img
        className="w-[150px] brightness-0 invert"
        src="https://i.ibb.co.com/q32M64SH/Praachurjo-Logo-removebg-preview.png"
        alt="Jkkniu-Mart"
      /></NavLink>
      <div className="flex items-center absolute left-1/2 transform -translate-x-1/2">
        <input 
          type="text" 
          name="search" 
          id="search" 
          placeholder="Search..." 
          className="backdrop-blur-sm bg-white/20 border border-white/30 focus:border-pink-400 focus:bg-white/30 focus:outline-none text-white placeholder-purple-200 px-4 py-2 w-64 rounded-l-xl transition-all" 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <button className="h-10 px-4 bg-gradient-to-r from-pink-500 to-purple-500 border-0 rounded-r-xl hover:from-pink-600 hover:to-purple-600 transition-all" onClick={(e) => handleSearchSubmit(e)}>
          <CiSearch className="text-white text-xl" />
        </button>
      </div>
      <div className="flex items-center gap-6 ml-auto">
        <NavLink to={`/${user ? `${user}/cart` : 'login'}`}>
          <button className="p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl hover:bg-white/30 transition-all">
            <IoCartOutline className="text-white text-2xl" />
          </button>
        </NavLink>
        <div className={`flex items-center gap-6 ${user ? 'hidden' : ''}`}>
          <NavLink className="text-white font-bold hover:text-pink-300 transition-colors" to="/login">
            Log In
          </NavLink>
          <NavLink className="text-white font-bold hover:text-pink-300 transition-colors" to="/signup">
            Sign Up
          </NavLink>
          <NavLink 
            className="px-4 py-2 text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all font-bold whitespace-nowrap"
            to="/becomeaseller"
          >
            Become a Seller
          </NavLink>
        </div>
        <div className={`flex items-center gap-6 ${user ? '' : 'hidden'}`}>
          <NavLink className="text-white font-bold hover:text-pink-300 transition-colors" to={`/${user}/track`}>Track Order</NavLink>
          <span className={`text-white font-bold ${user ? '' : 'hidden'}`}>{user}</span>
          <button className="px-4 py-2 text-white bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl hover:bg-white/30 transition-all font-semibold" onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;