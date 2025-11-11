import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="backdrop-blur-xl bg-white/5 border-t border-white/10 mt-16">
            <div className="max-w-[1400px] mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* About Section */}
                    <div>
                        <img
                            className="w-[150px] brightness-0 invert mb-4"
                            src="https://i.ibb.co.com/q32M64SH/Praachurjo-Logo-removebg-preview.png"
                            alt="Praachurjo"
                        />
                        <p className="text-white/70 text-sm mb-4">
                            Your trusted online marketplace for quality products at amazing prices. Shop with confidence and convenience.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-white/70 hover:text-pink-400 transition-colors duration-150">
                                <FiFacebook className="text-xl" />
                            </a>
                            <a href="#" className="text-white/70 hover:text-pink-400 transition-colors duration-150">
                                <FiTwitter className="text-xl" />
                            </a>
                            <a href="#" className="text-white/70 hover:text-pink-400 transition-colors duration-150">
                                <FiInstagram className="text-xl" />
                            </a>
                            <a href="#" className="text-white/70 hover:text-pink-400 transition-colors duration-150">
                                <FiYoutube className="text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <NavLink to="/" className="text-white/70 hover:text-pink-400 transition-colors duration-150">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/products" className="text-white/70 hover:text-pink-400 transition-colors duration-150">
                                    Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/cart" className="text-white/70 hover:text-pink-400 transition-colors duration-150">
                                    Cart
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/track" className="text-white/70 hover:text-pink-400 transition-colors duration-150">
                                    Track Order
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-white/70 hover:text-pink-400 transition-colors duration-150">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/70 hover:text-pink-400 transition-colors duration-150">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/70 hover:text-pink-400 transition-colors duration-150">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/70 hover:text-pink-400 transition-colors duration-150">
                                    Terms & Conditions
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/70 hover:text-pink-400 transition-colors duration-150">
                                    Return Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-white/70">
                                <FiMapPin className="text-xl mt-1 flex-shrink-0" />
                                <span className="text-sm">123 Market Street, Dhaka, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/70">
                                <FiPhone className="text-xl flex-shrink-0" />
                                <span className="text-sm">+880 1234-567890</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/70">
                                <FiMail className="text-xl flex-shrink-0" />
                                <span className="text-sm">support@praachurjo.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white/50 text-sm">
                            © {new Date().getFullYear()} Praachurjo. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-white/50 hover:text-pink-400 text-sm transition-colors duration-150">
                                Privacy
                            </a>
                            <a href="#" className="text-white/50 hover:text-pink-400 text-sm transition-colors duration-150">
                                Terms
                            </a>
                            <a href="#" className="text-white/50 hover:text-pink-400 text-sm transition-colors duration-150">
                                Cookies
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
