import React, { useEffect, useState } from 'react';
import Slider from '../Slider/Slider';
import Categories from '../Categories/Categories';
import Justforyou from '../Justforyou/Justforyou';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const Root = () => {
    const [user, setUser] = useState(null); 
    const [carts, setCarts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/", { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setUser(data.user);
                setCarts(data.carts);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);  
    return (
        <div className="bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 min-h-screen">
            <Navbar user={user} carts={carts} setCarts={setCarts} />
            <Slider />
            <Categories />
            <Justforyou />
            <Footer />
        </div>
    );
};

export default Root;