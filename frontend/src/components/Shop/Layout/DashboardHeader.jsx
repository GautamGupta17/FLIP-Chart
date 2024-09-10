import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineGift } from 'react-icons/ai';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { backend_url } from '../../../server';
import logo from '../../../static/fkheaderlogo_exploreplus-44005d.svg';

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);

  return (
    <nav className="bg-white py-2 px-4 lg:px-16 sticky top-0 left-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex-shrink-0">
            <img src={logo} alt="Flipkart Logo" className="h-6 md:h-8" />
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-full py-2 px-4 rounded-l-sm focus:outline-none text-sm"
            />
            <button className="bg-white p-2 rounded-r-sm">
              <BsSearch className="text-[#2874f0]" />
            </button>
          </div>

          {/* Right Side Menu */}
          <div className="flex items-center space-x-4">
            <Link to="/dashboard/cupouns" className="text-black hover:text-yellow-200 transition-colors duration-200">
              <AiOutlineGift size={24} />
            </Link>
            <Link to="/dashboard-events" className="text-black hover:text-yellow-200 transition-colors duration-200">
              <MdOutlineLocalOffer size={24} />
            </Link>
            <Link to="/dashboard-products" className="text-black hover:text-yellow-200 transition-colors duration-200">
              <FiShoppingBag size={24} />
            </Link>
            <Link to="/dashboard-orders" className="text-black hover:text-yellow-200 transition-colors duration-200">
              <FiPackage size={24} />
            </Link>
            <Link to="/dashboard-messages" className="text-black hover:text-yellow-200 transition-colors duration-200">
              <BiMessageSquareDetail size={24} />
            </Link>
            <Link to={`/shop/${seller._id}`} className="flex items-center">
              <img
                src={`${backend_url}${seller.avatar}`}
                alt="Seller Avatar"
                className="w-8 h-8 rounded-full object-cover border-2 border-white"
              />
              <span className="ml-2 text-white text-sm font-medium hidden md:inline">
                {seller.name}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardHeader;