import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Justforyoucard from '../Justforyoucard/Justforyoucard';
import { NavLink } from 'react-router-dom';

const Search = () => {
    const { srch, user } = useParams();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/search/${srch}`)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [])
    console.log(products);
    console.log(user);
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
        <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900">
            {user ? <div className="flex items-center justify-between h-[80px] px-6 border-b border-white/10">
                <NavLink to={"/"}><img
                    className="w-[150px] brightness-0 invert"
                    src="https://i.ibb.co.com/q32M64SH/Praachurjo-Logo-removebg-preview.png"
                    alt="Praachurjo"
                /></NavLink>
                <div className={`flex items-center gap-8 ${user===undefined ? '' : 'hidden'}`}>
                    <NavLink className="text-white font-bold hover:text-pink-300 transition-colors" to={`/${user}/track`}>Track Order</NavLink>
                    <span className={`text-white font-bold ${user ? '' : 'hidden'}`}>{user}</span>
                    <button className="px-4 py-2 text-white bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl hover:bg-white/30 transition-all font-semibold" onClick={handleLogout}>Log Out</button>
                </div>
            </div> : ''}
            <div className="p-6">
                <h2 className='text-3xl text-white font-bold mb-6'>Search results for: <span className="text-pink-400">"{srch}"</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {
                        products.length > 0 ? products.map((product) => <Justforyoucard key={product.id} product={product} />) : 
                        <div className="col-span-full text-center py-20">
                            <p className="text-white/60 text-xl">No products found</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Search;