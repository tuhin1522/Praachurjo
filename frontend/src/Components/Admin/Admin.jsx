import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';

const Admin = () => {
    const { admin } =useParams();
    const [carts, setCarts] = React.useState([]);
    const [sellers, setSellers] = React.useState([]);
    const [activeView, setActiveView] = React.useState("orders"); // "orders" or "sellers"
    const [status, setStatus] = React.useState("");
    const handleStatusChange = async(e,id) => {
        console.log(status,id);
        const response = await fetch("http://localhost:5000/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ status, id })
        });
        const data = await response.json();
        console.log(data);
    }
    
    const handleDeleteSeller = async(sellerId) => {
        if(window.confirm("Are you sure you want to delete this seller?")) {
            try {
                const response = await fetch(`http://localhost:5000/sellers/${sellerId}`, {
                    method: "DELETE",
                    credentials: "include"
                });
                const data = await response.json();
                console.log(data);
                // Refresh sellers list
                fetchSellers();
            } catch (error) {
                console.error("Error deleting seller:", error);
            }
        }
    }

    const fetchSellers = () => {
        fetch("http://localhost:5000/sellers")
            .then(response => response.json())
            .then(data => setSellers(data))
            .catch(error => console.error("Error fetching sellers:", error));
    }

    React.useEffect(() => {
        fetch("http://localhost:5000/carts")
            .then(response => response.json())
            .then(data => setCarts(data))
            .catch(error => console.error("Error fetching carts:", error));
        
        fetchSellers();
    }, []);
    console.log(carts);
    const navigate = useNavigate();
    const handleLogout = () => {
        // Implement logout functionality here
        console.log("Logging out...");
        fetch("http://localhost:5000/logout",{
        credentials: "include"
        })
        .then(navigate('/login'))
        .catch(error => console.error("Error:", error));
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900">
            <div className="flex items-center justify-between h-[80px] px-6 border-b border-white/10">
                <img
                    className="w-[150px] brightness-0 invert"
                    src="https://i.ibb.co.com/q32M64SH/Praachurjo-Logo-removebg-preview.png"
                    alt="Praachurjo"
                />
                <div className="flex items-center gap-8">
                    <button 
                        onClick={() => setActiveView("orders")}
                        className={`font-bold transition-colors ${activeView === "orders" ? "text-pink-400" : "text-white hover:text-pink-300"}`}
                    >
                        Manage Products
                    </button>
                    <button 
                        onClick={() => setActiveView("sellers")}
                        className={`font-bold transition-colors ${activeView === "sellers" ? "text-pink-400" : "text-white hover:text-pink-300"}`}
                    >
                        Manage Sellers
                    </button>
                </div>
                <div className={`flex items-center gap-8 ${admin ? '' : 'hidden'}`}>
                    <span className={`text-white font-bold ${admin ? '' : 'hidden'}`}>{admin}</span>
                    <button className="px-4 py-2 text-white bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl hover:bg-white/30 transition-all font-semibold" onClick={handleLogout}>Log Out</button>
                </div>
            </div>
            
            {/* Orders View */}
            {activeView === "orders" && (
            <div className='min-h-[calc(100vh_-_90px)] mt-10 my-5 p-5'>
                <h2 className='text-3xl font-bold mb-6 text-white text-center'>Ordered Products</h2>
                <div className="overflow-x-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl">
                    <table className='w-full'>
                        <thead className='text-white bg-white/5'>
                            <tr className='border-b border-white/20'>
                                <th className='border-r border-white/20 p-3'>Product ID</th>
                                <th className='border-r border-white/20 p-3'>Customer Username</th>
                                <th className='border-r border-white/20 p-3'>Quantity</th>
                                <th className='border-r border-white/20 p-3'>Status</th>
                                <th className='border-r border-white/20 p-3'>Update Status</th>
                                <th className='border-r border-white/20 p-3'>Address</th>
                                <th className='border-r border-white/20 p-3'>Payment Method</th>
                                <th className='border-r border-white/20 p-3'>Sender Number</th>
                                <th className='border-r border-white/20 p-3'>Transaction ID</th>
                                <th className='p-3'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-white'>
                        {
                            carts.map((cart) => (
                                <tr key={cart.id} className='border-b border-white/10 hover:bg-white/5 transition-all'>
                                    <td className='border-r border-white/10 p-3 text-center'>{cart.product_id}</td>
                                    <td className='border-r border-white/10 p-3 text-center'>{cart.username}</td>
                                    <td className='border-r border-white/10 p-3 text-center'>{cart.quantity}</td>
                                    <td className='border-r border-white/10 p-3 text-center'>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            cart.status === 'Delivered' ? 'bg-green-500/20 text-green-300' :
                                            cart.status === 'Shipped' ? 'bg-blue-500/20 text-blue-300' :
                                            cart.status === 'Cancelled' ? 'bg-red-500/20 text-red-300' :
                                            'bg-yellow-500/20 text-yellow-300'
                                        }`}>
                                            {cart.status}
                                        </span>
                                    </td>
                                    <td className='border-r border-white/10 p-3 text-center'>
                                        <select 
                                            defaultValue={cart.status} 
                                            className="backdrop-blur-sm bg-white/20 border border-white/30 focus:border-pink-400 focus:bg-white/30 focus:outline-none text-white px-3 py-2 rounded-xl transition-all" 
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option className="bg-indigo-900" disabled={true}>{cart.status}</option>
                                            <option className="bg-indigo-900">Pending</option>
                                            <option className="bg-indigo-900">Shipped</option>
                                            <option className="bg-indigo-900">Delivered</option>
                                            <option className="bg-indigo-900">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className='border-r border-white/10 p-3'>{cart.Address}</td>
                                    <td className='border-r border-white/10 p-3 text-center'>{cart.payment_method}</td>
                                    <td className='border-r border-white/10 p-3 text-center'>{cart.sender_number}</td>
                                    <td className='border-r border-white/10 p-3 text-center'>{cart.transaction_id}</td>
                                    <td className='p-3 text-center'>
                                        <button 
                                            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all"  
                                            onClick={(e) => handleStatusChange(e,cart.id)}
                                        >
                                            Submit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            )}

            {/* Sellers View */}
            {activeView === "sellers" && (
            <div className='min-h-[calc(100vh_-_90px)] mt-10 my-5 p-5'>
                <h2 className='text-3xl font-bold mb-6 text-white text-center'>Manage Sellers</h2>
                <div className="overflow-x-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl">
                    <table className='w-full'>
                        <thead className='text-white bg-white/5'>
                            <tr className='border-b border-white/20'>
                                <th className='border-r border-white/20 p-3'>Seller Name</th>
                                <th className='border-r border-white/20 p-3'>Store Name</th>
                                <th className='border-r border-white/20 p-3'>Email</th>
                                <th className='border-r border-white/20 p-3'>Phone Number</th>
                                <th className='p-3'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-white'>
                        {
                            sellers.map((seller) => (
                                <tr key={seller.id} className='border-b border-white/10 hover:bg-white/5 transition-all'>
                                    <td className='border-r border-white/10 p-3 text-center'>{seller.name || seller.seller_name}</td>
                                    <td className='border-r border-white/10 p-3 text-center'>{seller.store_name}</td>
                                    <td className='border-r border-white/10 p-3 text-center'>{seller.email}</td>
                                    <td className='border-r border-white/10 p-3 text-center'>{seller.phone || seller.phone_number}</td>
                                    <td className='p-3 text-center'>
                                        <button 
                                            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all"  
                                            onClick={() => handleDeleteSeller(seller.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            )}
        </div>
    );
};

export default Admin;