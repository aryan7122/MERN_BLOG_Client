import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 ">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    {/* Logo and Description */}
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold mb-2">YourLogo</h2>
                        <p>Your company's tagline or brief description goes here.</p>
                    </div>
                    {/* Navigation Links */}
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
                        <ul>
                            <li><a href=" " className="hover:underline">Home</a></li>
                            <li><a href=" " className="hover:underline">About Us</a></li>
                            <li><a href=" " className="hover:underline">Services</a></li>
                            <li><a href=" " className="hover:underline">Contact</a></li>
                        </ul>
                    </div>
                    {/* Contact Info */}
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
                        <p>1234 Street Name, City, State, 12345</p>
                        <p>Email: info@example.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-6">
                    {/* Social Media Icons */}
                    <div className="flex space-x-4">
                        <a href=" " className="hover:text-gray-400"><FaFacebookF /></a>
                        <a href=" " className="hover:text-gray-400"><FaTwitter /></a>
                        <a href=" " className="hover:text-gray-400"><FaInstagram /></a>
                        <a href=" " className="hover:text-gray-400"><FaLinkedinIn /></a>
                    </div>
                    {/* Copyright */}
                    <p className="text-sm">&copy; 2024 Your Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
