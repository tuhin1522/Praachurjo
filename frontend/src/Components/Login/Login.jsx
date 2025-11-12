// import React, { useState } from "react";
// import { useNavigate, NavLink } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
// import "./Login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const navigate = useNavigate();
//   const validateField = (field) => {
//     const newErrors = {};
//     if (field === 'email' || !field) {
//       if (!email) newErrors.email = 'Email is required';
//       else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
//     }
//     if (field === 'password' || !field) {
//       if (!password) newErrors.password = 'Password is required';
//       else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
//     }
//     setErrors(prev => ({ ...prev, ...newErrors }));
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleBlur = (field) => {
//     setTouched(prev => ({ ...prev, [field]: true }));
//     validateField(field);
//   };

//   const showError = (field) => touched[field] && errors[field];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setTouched({ email: true, password: true });
    
//     if (!validateField()) return;

//     setIsLoading(true);
    
//     try {
//       const response = await fetch('http://localhost:5000/users/login', {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ email, password })
//       });
      
//       const data = await response.json();
      
//       if (data.error === "Invalid email or password") {
//         toast.error(data.error, { position: 'top-center' });
//         setErrors({ email: data.error });
//       } else {
//         toast.success('Login successful!', { position: 'top-center' });
//         setTimeout(() => {
//           navigate("/");
//         }, 1000);
//       }
//     } catch {
//       toast.error('Connection error. Please try again.', { position: 'top-center' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <div className="login-header">
//           <NavLink to="/" className="login-logo-link">
//             <img
//               src="https://i.ibb.co.com/q32M64SH/Praachurjo-Logo-removebg-preview.png"
//               alt="Jkkniu-Mart"
//               className="login-logo"
//             />
//           </NavLink>
//           <h2 className="login-title">Welcome Back</h2>
//           <p className="login-subtitle">Sign in to your account</p>
//         </div>

//           <form className="login-form" onSubmit={handleSubmit} noValidate>
//             {/* Email field */}
//             <div className="input-group">
//               <label htmlFor="email" className="input-label">
//                 Email <span className="required" aria-label="required">*</span>
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 className={`input-field ${showError('email') ? 'error' : ''}`}
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 onBlur={() => handleBlur('email')}
//                 autoComplete="email"
//                 required
//                 aria-required="true"
//                 aria-invalid={!!showError('email')}
//                 aria-describedby={showError('email') ? 'email-error' : undefined}
//               />
//               {showError('email') && (
//                 <span id="email-error" className="error-message" role="alert">
//                   {errors.email}
//                 </span>
//               )}
//             </div>

//             {/* Password field */}
//             <div className="input-group">
//               <label htmlFor="password" className="input-label">
//                 Password <span className="required" aria-label="required">*</span>
//               </label>
//               <div className="input-wrapper">
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   className={`input-field ${showError('password') ? 'error' : ''}`}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   onBlur={() => handleBlur('password')}
//                   autoComplete="current-password"
//                   required
//                   aria-required="true"
//                   aria-invalid={!!showError('password')}
//                   aria-describedby={showError('password') ? 'password-error' : undefined}
//                 />
//                 <button
//                   type="button"
//                   className="password-toggle"
//                   onClick={() => setShowPassword(v => !v)}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                   tabIndex={0}
//                 >
//                   {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
//                 </button>
//               </div>
//               {showError('password') && (
//                 <span id="password-error" className="error-message" role="alert">
//                   {errors.password}
//                 </span>
//               )}
//             </div>

//             {/* Remember me & Forgot password */}
//             <div className="form-options">
//               <div className="checkbox-group">
//                 <input
//                   type="checkbox"
//                   id="remember"
//                   className="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                 />
//                 <label htmlFor="remember" className="checkbox-label">
//                   Remember me
//                 </label>
//               </div>
//               <NavLink to="/forgot-password" className="link forgot-link">
//                 Forgot password?
//               </NavLink>
//             </div>

//             {/* Submit button */}
//             <button
//               type="submit"
//               className="btn-login"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <span className="spinner" aria-hidden="true" />
//                   <span>Logging in...</span>
//                 </>
//               ) : (
//                 'Log In'
//               )}
//             </button>
//           </form>

//         {/* Sign up link */}
//         <div className="signup-prompt">
//           <span className="signup-text">Don't have an account?</span>
//           <NavLink to="/signup" className="link signup-link">
//             Sign Up
//           </NavLink>
//         </div>
//       </div>
      
//       <ToastContainer autoClose={2000} />
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields", { position: "top-center" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/customers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.error) {
        toast.error(data.error, { position: "top-center" });
      } else {
        toast.success("Login successful!", { position: "top-center" });
        
        // Navigate based on role
        setTimeout(() => {
            navigate("/");
        }, 1000);
      }
    } catch {
      toast.error("Connection error. Please try again.", { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    console.log("Seller login not implemented yet.");
  }

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields", { position: "top-center" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      if (data.error) {
        toast.error(data.error, { position: "top-center" });
      } else {
        toast.success("Login successful!", { position: "top-center" });
        
        // Navigate based on role
        setTimeout(() => {
            navigate(`/${data.user}`);
        }, 1000);
      }
    } catch {
      toast.error("Connection error. Please try again.", { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
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
        className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-3xl shadow-2xl w-[90%] sm:w-[450px]"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <NavLink to="/">
            <motion.img
              src="https://i.ibb.co.com/q32M64SH/Praachurjo-Logo-removebg-preview.png"
              alt="Logo"
              className="mx-auto w-40 mb-4"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </NavLink>
          <h1 className="text-4xl font-extrabold text-white tracking-wide">
            Welcome Back
          </h1>
          <p className="text-purple-200 text-sm mt-2">Log in to your universe</p>
        </motion.div>

        {/* Form */}
        <form onSubmit={(e) => { role=="customer" ? handleSubmit(e) : role=="seller" ? handleSubmit1(e) : handleSubmit2(e) }} className="space-y-5">
          {/* Role Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="text-white font-medium text-sm mb-2 block">Login As</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole("customer")}
                className={`py-2.5 px-3 rounded-xl font-semibold transition-all duration-150 ${
                  role === "customer"
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105"
                    : "bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:bg-white/20"
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setRole("seller")}
                className={`py-2.5 px-3 rounded-xl font-semibold transition-all duration-150 ${
                  role === "seller"
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105"
                    : "bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:bg-white/20"
                }`}
              >
                Seller
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`py-2.5 px-3 rounded-xl font-semibold transition-all duration-150 ${
                  role === "admin"
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105"
                    : "bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:bg-white/20"
                }`}
              >
                Admin
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="text-white font-medium text-sm mb-2 block">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:border-pink-400 focus:bg-white/20 transition-all"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="text-white font-medium text-sm mb-2 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:border-pink-400 focus:bg-white/20 transition-all"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-3.5 text-purple-200 hover:text-white transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
              </button>
            </div>
          </motion.div>

          {/* Remember / Forgot */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-between items-center text-sm text-purple-200"
          >
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-pink-500 rounded" />
              <span>Remember me</span>
            </label>
            <NavLink to="/forgot-password" className="text-purple-200 hover:text-white transition">
              Forgot password?
            </NavLink>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0px 10px 30px rgba(236, 72, 153, 0.5)",
              transition: { duration: 0.15 }
            }}
            whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
            transition={{ duration: 0.15 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold uppercase tracking-wider transition-all shadow-lg cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "LOG IN"
            )}
          </motion.button>
        </form>

        {/* Signup */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6 text-purple-200"
        >
          <span>New here? </span>
          <NavLink to="/signup" className="text-pink-400 hover:text-pink-300 font-bold transition">
            Create Account
          </NavLink>
        </motion.div>
      </motion.div>

      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Login;