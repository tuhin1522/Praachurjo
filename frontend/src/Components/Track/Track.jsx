import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { MdPendingActions } from "react-icons/md";
import { FcShipped } from "react-icons/fc";
import { MdCancel } from "react-icons/md";
import { FiStar } from "react-icons/fi";

const Track = () => {
    const [products,setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [pid, setPid] = useState(0);
    const {user} = useParams();
    const navigate = useNavigate();
    console.log(user);
    useEffect(() => {
    fetch(`http://localhost:5000/${user}/track`)
    .then(res => res.json())
    .then(data => setProducts(data));
    },[user]);
    console.log(products);
    const handleLogout = () => {
        // Implement logout functionality here
        console.log("Logging out...");
        fetch("http://localhost:5000/logout",{
        credentials: "include"
        })
        .then(navigate('/login'))
        .catch(error => console.error("Error:", error));
    }

    const handleReviewClick = (product) => {
        console.log("Opening modal for product:", product);
        setSelectedProduct(product);
        setTimeout(() => {
            setIsModalOpen(true);
        }, 0);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
        setReviewText('');
        setRating(0);
        setHoveredRating(0);
    }

    const handleSubmitReview = async () => {
        // Add your review submission logic here
        const productId = selectedProduct?.product_id;
        console.log("Submitting review for product:", productId);
        console.log("Review text:", reviewText);
        console.log("Rating:", rating);
        const today = new Date();
        // Array of month names
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        // Format the date dynamically
        const formattedDate = `${String(today.getDate()).padStart(2, '0')} ${months[today.getMonth()]}, ${today.getFullYear()}`;
        
        try {
            await fetch(`http://localhost:5000/review/${pid}/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    user,
                    star: rating,
                    review: reviewText,
                    date: formattedDate,
                }),
            });
            // After successful submission, close modal
            handleCloseModal();
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    }
    return (
        <div className='min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900'>
            {/* Navbar */}
            <div className="flex items-center justify-between h-[80px] px-6 border-b border-white/10">
                <NavLink to={"/"}>
                    <img
                        className="w-[150px] brightness-0 invert"
                        src="https://i.ibb.co.com/q32M64SH/Praachurjo-Logo-removebg-preview.png"
                        alt="Praachurjo"
                    />
                </NavLink>
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

            {/* Track Content */}
            <div className='max-w-[1400px] mx-auto px-6 py-16'>
                <h2 className='text-4xl font-bold mb-8 text-white text-center'>Your Ordered Products</h2>
                <div className='backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 overflow-x-auto'>
                    <table className='w-full border-separate border-spacing-0'>
                        <thead>
                            <tr className='text-white'>
                                <th className='bg-white/10 backdrop-blur-sm border border-white/20 p-4 text-left font-bold rounded-tl-xl'>Product ID</th>
                                <th className='bg-white/10 backdrop-blur-sm border-t border-b border-white/20 p-4 text-center font-bold'>Quantity</th>
                                <th className='bg-white/10 backdrop-blur-sm border-t border-b border-white/20 p-4 text-center font-bold'>Status</th>
                                <th className='bg-white/10 backdrop-blur-sm border-t border-b border-white/20 p-4 text-center font-bold'>Address</th>
                                <th className='bg-white/10 backdrop-blur-sm border-t border-b border-white/20 p-4 text-center font-bold'>Payment Method</th>
                                <th className='bg-white/10 backdrop-blur-sm border-t border-b border-white/20 p-4 text-center font-bold'>Transaction ID</th>
                                <th className='bg-white/10 backdrop-blur-sm border border-white/20 p-4 text-center font-bold rounded-tr-xl'>Review</th>
                            </tr>
                        </thead>
                        <tbody>
                        {products.length > 0 ? (
                            products.map((cart, index) => (
                                <tr key={cart.id} className='text-white hover:bg-white/5 transition-colors'>
                                    <td className={`border-l border-r border-b border-white/20 p-4 ${index === products.length - 1 ? 'rounded-bl-xl' : ''}`}>{cart.product_id}</td>
                                    <td className='border-b border-white/20 p-4 text-center'>{cart.quantity}</td>
                                    <td className='border-b border-white/20 p-4'>
                                        {cart.status === "Pending" && (
                                            <div className='text-yellow-400 flex items-center justify-center gap-2 font-semibold'>
                                                <MdPendingActions className='text-xl' /> {cart.status}
                                            </div>
                                        )}
                                        {cart.status === "Shipped" && (
                                            <div className='text-blue-400 flex items-center justify-center gap-2 font-semibold'>
                                                <FcShipped className='text-xl' /> {cart.status}
                                            </div>
                                        )}
                                        {cart.status === "Delivered" && (
                                            <div className='text-green-400 text-center font-semibold'>{cart.status}</div>
                                        )}
                                        {cart.status === "Cancelled" && (
                                            <div className='text-red-400 flex items-center justify-center gap-2 font-semibold'>
                                                <MdCancel className='text-xl' />{cart.status}
                                            </div>
                                        )}
                                    </td>
                                    <td className='border-b border-white/20 p-4 text-center'>{cart.Address}</td>
                                    <td className='border-b border-white/20 p-4 text-center'>{cart.payment_method}</td>
                                    <td className={`border-b border-white/20 p-4 text-center`}>{cart.transaction_id}</td>
                                    {cart.status === "Delivered" ? <td className={`border-l border-r border-b border-white/20 p-4 text-center ${index === products.length ? 'rounded-br-xl' : ''}`}>
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleReviewClick(cart);
                                                setPid(cart.product_id);
                                            }}
                                            type="button"
                                            className='px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-150'
                                        >
                                            Leave a Review
                                        </button>
                                    </td> : <td className={`border-l border-r border-b border-white/20 p-4 text-center ${index === products.length ? 'rounded-br-xl' : ''}`}>-</td>}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className='border-l border-r border-b border-white/20 p-12 text-center rounded-b-xl'>
                                    <div className='flex flex-col items-center justify-center'>
                                        <div className="text-6xl mb-4">📦</div>
                                        <p className='text-white/70 text-xl'>No orders found</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Review Modal */}
            {isModalOpen && (
                <div 
                    className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            handleCloseModal();
                        }
                    }}
                >
                    <div 
                        className='backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 max-w-2xl w-full shadow-2xl'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className='text-3xl font-bold text-white mb-6'>Leave a Review</h3>
                        

                        {/* Star Rating */}
                        <div className='mb-6'>
                            <label className='block text-white font-semibold mb-3'>Rating</label>
                            <div className='flex gap-2'>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type='button'
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoveredRating(star)}
                                        onMouseLeave={() => setHoveredRating(0)}
                                        className='transition-all duration-150 hover:scale-110'
                                    >
                                        <FiStar 
                                            className={`text-3xl ${
                                                star <= (hoveredRating || rating) 
                                                    ? 'fill-yellow-400 text-yellow-400' 
                                                    : 'text-white/30'
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className='mb-6'>
                            <label className='block text-white font-semibold mb-3'>Your Review</label>
                            <textarea
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder='Share your experience with this product...'
                                rows='6'
                                className='w-full px-4 py-3 backdrop-blur-sm bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50 transition-all duration-150 resize-none'
                            />
                        </div>

                        <div className='flex gap-4 justify-end'>
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className='px-6 py-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-white font-semibold rounded-xl transition-all duration-150'
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmitReview}
                                disabled={!reviewText.trim() || rating === 0}
                                className='px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Track;