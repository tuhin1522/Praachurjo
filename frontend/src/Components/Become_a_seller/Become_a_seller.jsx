import React from "react";
import { NavLink } from "react-router-dom";

const Become_a_seller = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900">
      {/* Simple Navbar with Logo Only */}
      <div className="flex items-center h-[80px] px-6 border-b border-white/10">
        <NavLink to={"/"}>
          <img
            className="w-[150px] brightness-0 invert"
            src="https://i.ibb.co.com/q32M64SH/Praachurjo-Logo-removebg-preview.png"
            alt="Praachurjo"
          />
        </NavLink>
      </div>
      <div className="max-w-4xl mx-auto p-8">
        {/* Section 1: Sign Up Form */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 mb-6">
          <input type="checkbox" id="section1" className="hidden peer" defaultChecked />
          <label 
            htmlFor="section1" 
            className="flex justify-between items-center cursor-pointer text-white font-bold text-xl mb-4 peer-checked:mb-6"
          >
            <span>1. Create Your Seller Account</span>
            <span className="text-2xl">▼</span>
          </label>
          <div className="hidden peer-checked:block">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white/80 text-sm mb-2 block">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name" 
                  className="w-full backdrop-blur-sm bg-white/20 border border-white/30 focus:border-pink-400 focus:bg-white/30 focus:outline-none text-white placeholder-purple-200 px-4 py-2 rounded-xl transition-all"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full backdrop-blur-sm bg-white/20 border border-white/30 focus:border-pink-400 focus:bg-white/30 focus:outline-none text-white placeholder-purple-200 px-4 py-2 rounded-xl transition-all"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="Enter your phone number" 
                  className="w-full backdrop-blur-sm bg-white/20 border border-white/30 focus:border-pink-400 focus:bg-white/30 focus:outline-none text-white placeholder-purple-200 px-4 py-2 rounded-xl transition-all"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Store Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your store name" 
                  className="w-full backdrop-blur-sm bg-white/20 border border-white/30 focus:border-pink-400 focus:bg-white/30 focus:outline-none text-white placeholder-purple-200 px-4 py-2 rounded-xl transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-white/80 text-sm mb-2 block">Store Address</label>
                <textarea 
                  placeholder="Enter your store address" 
                  rows="3"
                  className="w-full backdrop-blur-sm bg-white/20 border border-white/30 focus:border-pink-400 focus:bg-white/30 focus:outline-none text-white placeholder-purple-200 px-4 py-2 rounded-xl transition-all"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Password</label>
                <input 
                  type="password" 
                  placeholder="Create a password" 
                  className="w-full backdrop-blur-sm bg-white/20 border border-white/30 focus:border-pink-400 focus:bg-white/30 focus:outline-none text-white placeholder-purple-200 px-4 py-2 rounded-xl transition-all"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Confirm Password</label>
                <input 
                  type="password" 
                  placeholder="Confirm your password" 
                  className="w-full backdrop-blur-sm bg-white/20 border border-white/30 focus:border-pink-400 focus:bg-white/30 focus:outline-none text-white placeholder-purple-200 px-4 py-2 rounded-xl transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Verification Documents */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">
          <input type="checkbox" id="section2" className="hidden peer" />
          <label 
            htmlFor="section2" 
            className="flex justify-between items-center cursor-pointer text-white font-bold text-xl mb-4 peer-checked:mb-6"
          >
            <span>2. Verification Documents</span>
            <span className="text-2xl">▼</span>
          </label>
          <div className="hidden peer-checked:block">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-white/80 text-sm mb-2 block">National ID / Passport Number</label>
                <input 
                  type="text" 
                  placeholder="Enter your ID number" 
                  className="w-full backdrop-blur-sm bg-white/20 border border-white/30 focus:border-pink-400 focus:bg-white/30 focus:outline-none text-white placeholder-purple-200 px-4 py-2 rounded-xl transition-all"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Upload ID Document</label>
                <input 
                  type="file" 
                  accept="image/*,.pdf"
                  className="w-full backdrop-blur-sm bg-white/20 border border-white/30 focus:border-pink-400 focus:bg-white/30 focus:outline-none text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-pink-500 file:to-purple-500 file:text-white file:font-semibold file:cursor-pointer hover:file:from-pink-600 hover:file:to-purple-600 px-4 py-2 rounded-xl transition-all"
                />
                <p className="text-white/60 text-xs mt-1">Upload a clear photo of your National ID or Passport</p>
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Business License / Trade License Number</label>
                <input 
                  type="text" 
                  placeholder="Enter your license number" 
                  className="w-full backdrop-blur-sm bg-white/20 border border-white/30 focus:border-pink-400 focus:bg-white/30 focus:outline-none text-white placeholder-purple-200 px-4 py-2 rounded-xl transition-all"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Upload Business License</label>
                <input 
                  type="file" 
                  accept="image/*,.pdf"
                  className="w-full backdrop-blur-sm bg-white/20 border border-white/30 focus:border-pink-400 focus:bg-white/30 focus:outline-none text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-pink-500 file:to-purple-500 file:text-white file:font-semibold file:cursor-pointer hover:file:from-pink-600 hover:file:to-purple-600 px-4 py-2 rounded-xl transition-all"
                />
                <p className="text-white/60 text-xs mt-1">Upload your valid business or trade license</p>
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Bank Account Number</label>
                <input 
                  type="text" 
                  placeholder="Enter your bank account number" 
                  className="w-full backdrop-blur-sm bg-white/20 border border-white/30 focus:border-pink-400 focus:bg-white/30 focus:outline-none text-white placeholder-purple-200 px-4 py-2 rounded-xl transition-all"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Bank Statement or Cheque</label>
                <input 
                  type="file" 
                  accept="image/*,.pdf"
                  className="w-full backdrop-blur-sm bg-white/20 border border-white/30 focus:border-pink-400 focus:bg-white/30 focus:outline-none text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-pink-500 file:to-purple-500 file:text-white file:font-semibold file:cursor-pointer hover:file:from-pink-600 hover:file:to-purple-600 px-4 py-2 rounded-xl transition-all"
                />
                <p className="text-white/60 text-xs mt-1">Upload bank statement or cancelled cheque for verification</p>
              </div>
              <div className="flex items-start gap-3 mt-4">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="mt-1 w-4 h-4 accent-pink-500"
                />
                <label htmlFor="terms" className="text-white/80 text-sm">
                  I agree to the Terms and Conditions and confirm that all information provided is accurate and complete.
                </label>
              </div>
              <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all">
                Submit Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Become_a_seller;
