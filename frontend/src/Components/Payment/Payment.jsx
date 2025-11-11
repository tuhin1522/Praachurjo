import { useParams } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";

const Payment = () => {
    const navigate = useNavigate();
    const { user } =useParams();
    const handleLogout = () => {
        // Implement logout functionality here
        console.log("Logging out...");
        fetch("http://localhost:5000/logout",{
        credentials: "include"
        })
        .then(navigate('/'))
        .catch(error => console.error("Error:", error));
    }
    return (
        <div>
            <div className="flex items-center justify-between h-[80px] shadow-sm">
                <NavLink to={"/"}><img
                    className="w-[250px]"
                    src="https://i.ibb.co.com/21wfxvqB/Logo-maker-project-removebg-preview1.png"
                    alt="Jkkniu-Mart"
                /></NavLink>
                <div className={`flex items-center gap-10 mr-20 ${user ? '' : 'hidden'}`}>
                    <span className={`text-[#2fa95b] font-bold ${user ? '' : 'hidden'}`}>{user}</span>
                    <button className={`btn text-black bg-white border-0 shadow-none ${user ? '' : 'hidden'}`} onClick={handleLogout}>Log Out</button>
                </div>
            </div>
            <div className="flex flex-col gap-5 items-center justify-center h-[calc(100vh_-_80px)]">
                <input className="text-black border-2 border-[#2fa95b] w-[250px] h-10 pl-2 rounded-xl focus:outline-none focus:border-yellow-600 m-5" type="text" placeholder="Address" required />
                <div className='flex'>
                    
                </div>
            </div>
        </div>
    );
};

export default Payment;