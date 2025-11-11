import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Justforyoucard from '../Justforyoucard/Justforyoucard';
import { NavLink } from "react-router-dom";

const Categorywiseproduct = () => {
    const navigate = useNavigate();
    const { id } =useParams();
    console.log(id);
    const [products, setProducts] = useState([]);
      useEffect(() => {
        fetch(`http://localhost:5000/products/category/${id}`)
          .then((response) => response.json())
          .then((data) => {
            if (Array.isArray(data)) {
                setProducts(data); 
            } else {
                setProducts([]); 
                console.error("Server error:", data.error);
            }
          })
          .catch((err) => {
            console.error("Fetch error:", err);
            setProducts([]); // fallback to avoid crash
            });
      }, [id]);
      console.log(products);
      const handleLogout = () => {
        // Implement logout functionality here
        console.log("Logging out...");
        fetch("http://localhost:5000/logout",{
        credentials: "include"
        })
        .then(navigate('/'))
        .catch(error => console.error("Error:", error));
    }
    const [user, setUser] = React.useState(null);
    useEffect(() => {
        fetch("http://localhost:5000/", { credentials: 'include' })
            .then(response => response.json())
            .then(data => setUser(data.user))
            .catch(error => console.error("Error fetching data:", error));
    }, []);
    return (
        <div className='min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900'>
            {/* Navbar */}
            <div className="flex items-center justify-between h-[80px] px-6 border-b border-white/10">
                <NavLink to={"/"}><img
                    className="w-[150px] brightness-0 invert"
                    src="https://i.ibb.co.com/q32M64SH/Praachurjo-Logo-removebg-preview.png"
                    alt="Praachurjo"
                /></NavLink>
                <div className={`flex items-center gap-6 ${user ? '' : 'hidden'}`}>
                    <span className={`text-white font-semibold ${user ? '' : 'hidden'}`}>{user}</span>
                    <button 
                        className={`px-6 py-2 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-white font-semibold rounded-xl transition-all duration-150 ${user ? '' : 'hidden'}`} 
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </div>
            </div>
            
            {/* Products Grid */}
            <div className="max-w-[1440px] mx-auto px-20 py-16">
                <div className={`${!(products.length===0) ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "flex items-center justify-center min-h-[calc(100vh_-_200px)]"}`}>
                    {
                        products.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 px-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl">
                                <div className="text-6xl mb-6">📦</div>
                                <h2 className='text-3xl font-bold text-white text-center mb-3'>No products found in this category</h2>
                                <p className="text-white/70 text-center mb-6">Try browsing other categories or check back later.</p>
                                <NavLink to="/">
                                    <button className="px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-150">
                                        Back to Home
                                    </button>
                                </NavLink>
                            </div>
                        ) : products.map((product) => <Justforyoucard key={product.id} product={product} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Categorywiseproduct;