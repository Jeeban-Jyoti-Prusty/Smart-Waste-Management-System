import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-[4%] py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-500  flex gap-2 items-center">
              <FaLeaf />
              EcoWaste
            </h2>

            <p className="text-gray-400 mt-4 leading-7">
              Making cities cleaner and greener through responsible waste
              management.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">

              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all">

                <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                  <FaFacebookF className="text-white" />
                </a>

              </div>

              <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all">

                <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                  <FaInstagram className="text-white" />

                </a>
              </div>

              <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all">

                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <FaLinkedinIn className="text-white" />
                </a>
              </div>

              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all">

                <a href="https://github.com" target="_blank" rel="noreferrer">
                  <FaGithub className="text-white" />
                </a>

              </div>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Quick Links</h3>

            <ul className="space-y-3 text-gray-400">

              <li>
                <Link to="/" className="hover:text-green-500 cursor-pointer transition-colors duration-300">Home</Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-green-500 cursor-pointer transition-colors duration-300">About</Link>
              </li>

              <li>
                <Link to="/how-it-works" className="hover:text-green-500 cursor-pointer transition-colors duration-300">How It Works</Link>
              </li>

              <li>
                <Link to="/register" className="hover:text-green-500 cursor-pointer transition-colors duration-300">Register</Link>
              </li>

            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Services</h3>

            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-green-500 cursor-pointer">Report Waste</li>
              <li className="hover:text-green-500 cursor-pointer">Track Status</li>
              <li className="hover:text-green-500 cursor-pointer">Dashboard</li>
              <li className="hover:text-green-500 cursor-pointer">Community</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Contact</h3>

            <div className="space-y-4 text-gray-400">

              <div className="flex items-center gap-3">
                <MdLocationOn className="text-green-500 text-xl" />
                <span>Bhadrak, Odisha</span>
              </div>

              <div className="flex items-center gap-3">
                <MdEmail className="text-green-500 text-xl" />
                <span className="break-all">
                  support@ecowaste.com
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-green-500 text-lg" />
                <span>+91 9876543210</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center">

          <p className="text-gray-400 text-sm sm:text-base">
            © 2026 EcoWaste. All Rights Reserved.
          </p>

          <p className="text-gray-400 text-sm sm:text-base">
            Made with <span className="text-red-500">❤</span> for Sustainable Cities
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;