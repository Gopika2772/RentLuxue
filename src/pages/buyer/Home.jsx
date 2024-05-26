import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="hidden md:flex items-center justify-center h-screen bg-gray-50 md:bg-[#EEEEEE]">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-black">Welcome to RentLuxue</h1>

          <div className="flex justify-center space-x-4">

            <Link to="/sellerlogin">
              <button
                className="px-6 py-3 text-white bg-blue-500 rounded-full focus:outline-none"
              >
                Seller Login
              </button>
            </Link>

            <Link to="/buyerLogin">
              <button
                className="px-6 py-3 text-white bg-[#FF3754] rounded-full hover:bg-[#FF3754]-900 focus:outline-none"
              >
                Buyer Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
