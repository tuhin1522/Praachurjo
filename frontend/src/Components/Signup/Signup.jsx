// import React, { useState, useEffect } from "react";
// import { useNavigate, NavLink } from "react-router-dom";
// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { ToastContainer, toast } from 'react-toastify';
// // import { useCart } from "../Context/CartContext";
// // import { NavLink } from "react-router-dom";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [fname, setfname] = useState("");
//   const [phone, setphone] = useState("");
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");
//   const [address, setaddress] = useState("");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://localhost:5000/users/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ fname, username, phone, email, password })
//     });
//     const data = await response.json();
//     console.log(data);
//     if (data.error) {
//       toast.error(data.error);
//     } else {
//       toast.success("Sign Up successfully", {
//         position: 'top-center',
//       });
//       setTimeout(() => {
//         navigate('/login');
//       }, 1000);
//     }
//   };
//   return (
//     <div className="flex flex-col">
//       <div className="flex items-center justify-between h-[80px] shadow-sm">
//         <NavLink to={"/"}><img
//           className="w-[250px]"
//           src="https://i.ibb.co.com/21wfxvqB/Logo-maker-project-removebg-preview1.png"
//           alt="Jkkniu-Mart"
//         /></NavLink>
//       </div>
//       <div className="flex flex-col items-center justify-center h-[calc(100vh_-_80px)] gap-5">
//         <h2 className="text-3xl text-[#2fa95b] font-bold">Sign up</h2>
//         <form className="flex flex-col gap-5" onSubmit={(e) => handleSubmit(e)}>
//           <input
//             className="text-black border-2 border-[#2fa95b] w-[250px] h-10 pl-2 rounded-xl focus:outline-none focus:border-yellow-600"
//             type="text"
//             placeholder="Full Name"
//             onChange={(e) => setfname(e.target.value)}
//             required
//           />
//           <input
//             className="text-black border-2 border-[#2fa95b] w-[250px] h-10 pl-2 rounded-xl focus:outline-none focus:border-yellow-600"
//             type="email"
//             placeholder="Email"
//             onChange={(e) => setemail(e.target.value)}
//             required
//           />
//           <input
//             className="text-black border-2 border-[#2fa95b] w-[250px] h-10 pl-2 rounded-xl focus:outline-none focus:border-yellow-600"
//             type="password"
//             placeholder="Password"
//             onChange={(e) => setpassword(e.target.value)}
//             required
//           />
//           <input
//             className="text-black border-2 border-[#2fa95b] w-[250px] h-10 pl-2 rounded-xl focus:outline-none focus:border-yellow-600"
//             type="tel"
//             placeholder="Phone Number"
//             pattern="[0-9]*"
//             minlength="11"
//             maxlength="11"
//             title="Must be 11 digits"
//             onChange={(e) => setphone(e.target.value)}
//             required
//           />
//           <select defaultValue="Pick a Country" className="text-black border-2 border-[#2fa95b] w-[250px] h-10 pl-2 rounded-xl focus:outline-none focus:border-yellow-600">
//             <option disabled={true}>Country</option>
//             <option>Bangladesh</option>
//             <option>India</option>
//             <option>Pakistan</option>
//           </select>
//           <input
//             className="text-black border-2 border-[#2fa95b] w-[250px] h-10 pl-2 rounded-xl focus:outline-none focus:border-yellow-600"
//             type="text"
//             placeholder="Address"
//             onChange={(e) => setaddress(e.target.value)}
//             required
//           />
//           <input
//             type="submit"
//             value="Sign up"
//             className=" btn border-0 bg-[#2fa95b] text-white py-2 rounded font-bold cursor-pointer"
//           />
//         </form>
//       </div>
//       <ToastContainer autoClose={1000} />
//     </div>
//   );
// };

// export default Signup;






import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [fname, setfname] = useState("");
  const [username, setusername] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [address, setaddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!fname || !email || !password || !phone) {
      toast.error("Please fill in all required fields", { position: "top-center" });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:5000/customers/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fname, username, email, password, phone, address })
      });
      
      const data = await response.json();
      
      if (data.error) {
        toast.error(data.error, { position: 'top-center' });
      } else {
        toast.success("Account created successfully!", {
          position: 'top-center',
        });
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
    } catch {
      toast.error("Connection error. Please try again.", { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  // Create background stars dynamically
  const [stars, setStars] = useState([]);
  useEffect(() => {
    const newStars = Array.from({ length: 50 }, () => ({
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      size: Math.random() * 4 + 1,
      delay: Math.random() * 5,
    }));
    setStars(newStars);
  }, []);
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900">
      {/* Floating gradient rings */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-30"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-3xl opacity-30"></div>

      {/* Stars animation */}
      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="absolute bg-white rounded-full shadow-lg"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: s.delay,
          }}
        />
      ))}

      {/* Animated card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-3xl shadow-2xl w-[90%] sm:w-[450px] my-8"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-4"
        >
          <NavLink to="/">
            <motion.img
              src="https://i.ibb.co.com/q32M64SH/Praachurjo-Logo-removebg-preview.png"
              alt="Logo"
              className="mx-auto w-32 mb-3"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </NavLink>
          <h1 className="text-3xl font-extrabold text-white tracking-wide">
            Create Account
          </h1>
          <p className="text-purple-200 text-sm mt-1">Join us today and start your journey</p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <label className="text-white font-medium text-xs mb-1 block">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:border-pink-400 focus:bg-white/20 transition-all text-sm"
              placeholder="Enter your full name"
              value={fname}
              onChange={(e) => setfname(e.target.value)}
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <label className="text-white font-medium text-xs mb-1 block">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:border-pink-400 focus:bg-white/20 transition-all text-sm"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="text-white font-medium text-xs mb-1 block">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:border-pink-400 focus:bg-white/20 transition-all text-sm"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
          >
            <label className="text-white font-medium text-xs mb-1 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:border-pink-400 focus:bg-white/20 transition-all text-sm"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-2.5 text-purple-200 hover:text-white transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
          >
            <label className="text-white font-medium text-xs mb-1 block">Phone Number</label>
            <input
              type="tel"
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:border-pink-400 focus:bg-white/20 transition-all text-sm"
              placeholder="Enter 11 digit phone number"
              pattern="[0-9]*"
              minLength="11"
              maxLength="11"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 }}
          >
            <label className="text-white font-medium text-xs mb-1 block">Address</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:border-pink-400 focus:bg-white/20 transition-all text-sm"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0px 10px 30px rgba(236, 72, 153, 0.5)",
              transition: { duration: 0.15 }
            }}
            whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
            transition={{ duration: 0.15 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold uppercase tracking-wider transition-all shadow-lg cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : (
              "SIGN UP"
            )}
          </motion.button>
        </form>

        {/* Login link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-4 text-purple-200 text-sm"
        >
          <span>Already have an account? </span>
          <NavLink to="/login" className="text-pink-400 hover:text-pink-300 font-bold transition">
            Login
          </NavLink>
        </motion.div>
      </motion.div>

      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Signup;
