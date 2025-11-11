import { NavLink, useParams } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { ToastContainer, toast } from 'react-toastify';

const Cart = () => {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  console.log(address, paymentMethod);
  const { user } = useParams();
  const { cart } = useCart();
  const [cartCounts, setCartCounts] = useState(cart.map(() => 0));
  const handleCount = (index, operation) => {
    setCartCounts((prev) => {
      const newCounts = [...prev];
      if (operation === "increment") newCounts[index]++;
      if (operation === "decrement" && newCounts[index] > 0) newCounts[index]--;
      return newCounts;
    });
  };
  const handlecheckout = async () => {
    console.log(cartCounts);
    const response = await fetch("http://localhost:5000/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        user,
        cart,
        cartCounts,
        address,
        paymentMethod,
        senderNumber,
        transactionId,
      }),
    });
    const data = await response.json();
    console.log(data)
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Ordered Placed Successfully", {
        position: 'top-center',
      });
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    // Implement logout functionality here
    console.log("Logging out...");
    fetch("http://localhost:5000/logout", {
      credentials: "include",
    })
      .then(navigate("/"))
      .catch((error) => console.error("Error:", error));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900">
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
          <span className="text-white font-semibold">{user}</span>
          <button
            className="px-6 py-2 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-white font-semibold rounded-xl transition-all duration-150"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Cart Section */}
      <div className={`min-h-[calc(100vh_-_80px)] flex flex-col items-center justify-center gap-8 py-16 px-6 ${cart.length === 0 ? 'invisible' : ''}`}>
        <h2 className="text-4xl font-bold text-white mb-4">Your Cart</h2>

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 w-full max-w-6xl overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr className="text-white">
                <th className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-tl-xl">Image</th>
                <th className="bg-white/10 backdrop-blur-sm border-t border-b border-white/20 p-4 text-left">Product</th>
                <th className="bg-white/10 backdrop-blur-sm border-t border-b border-white/20 p-4 text-center">Price</th>
                <th className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 text-center rounded-tr-xl">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="text-white hover:bg-white/5 transition-colors">
                  <td className={`border-l border-r border-b border-white/20 p-4 text-center ${index === cart.length - 1 ? 'rounded-bl-xl' : ''}`}>
                    <img
                      className="w-[60px] h-[60px] object-cover rounded-lg mx-auto"
                      src={item.image}
                      alt={item.title}
                    />
                  </td>
                  <td className="border-b border-white/20 p-4">{item.title}</td>
                  <td className="border-b border-white/20 p-4 text-center font-semibold">৳{item.price}</td>
                  <td className={`border-l border-r border-b border-white/20 p-4 ${index === cart.length - 1 ? 'rounded-br-xl' : ''}`}>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        className="w-10 h-10 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/30 hover:border-pink-400 text-white font-bold rounded-lg transition-all duration-150 hover:scale-105"
                        onClick={() => handleCount(index, "decrement")}
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold min-w-[30px] text-center">{cartCounts[index]}</span>
                      <button
                        className="w-10 h-10 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/30 hover:border-pink-400 text-white font-bold rounded-lg transition-all duration-150 hover:scale-105"
                        onClick={() => handleCount(index, "increment")}
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Address */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 w-full max-w-2xl">
          <label className="block text-white font-semibold mb-3">
            Delivery Address
          </label>
          <textarea
            className="w-full px-4 py-3 backdrop-blur-sm bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50 transition-all duration-150 resize-none"
            placeholder="Enter Your Delivery Address"
            rows="3"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        {/* Payment Method */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 w-full max-w-2xl">
          <label className="block text-white font-semibold mb-3">
            Payment Method
          </label>
          <select
            className="w-full px-4 py-3 backdrop-blur-sm bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50 transition-all duration-150"
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="" disabled selected className="bg-purple-900 text-white">
              Pick a Payment Method
            </option>
            <option value="Bkash" className="bg-purple-900 text-white">Bkash</option>
            <option value="Nagad" className="bg-purple-900 text-white">Nagad</option>
            <option value="Rocket" className="bg-purple-900 text-white">Rocket</option>
            <option value="Cash on Delivery" className="bg-purple-900 text-white">Cash on Delivery</option>
          </select>
        </div>

        {/* Show sender number + transaction only for mobile payments */}
        <div
          className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 w-full max-w-2xl ${["Bkash", "Nagad", "Rocket"].includes(paymentMethod)
              ? ""
              : "hidden"
            }`}
        >
          <div className="text-center mb-6">
            <span className="text-white font-semibold text-lg">
              Payment Method: {paymentMethod}
            </span>
            <p className="text-white/70 mt-2">Send money to: <span className="text-pink-400 font-bold">0188051928</span></p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-3">
                Sender's Number
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 backdrop-blur-sm bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50 transition-all duration-150"
                placeholder="Enter Sender's Number"
                onChange={(e) => setSenderNumber(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-white font-semibold mb-3">
                Transaction ID
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 backdrop-blur-sm bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50 transition-all duration-150"
                placeholder="Enter Transaction ID"
                onChange={(e) => setTransactionId(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-150"
          onClick={handlecheckout}
        >
          Checkout
        </button>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default Cart;
