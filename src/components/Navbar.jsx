import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({
      type: 'LOGOUT_USER'
    });
    navigate('/login');
  };
  return (
    <nav className="h-[15vh] bg-[#F4F1EA] flex justify-between items-center shadow-md">
      <div>
        <Link to="/">
          <img src={logo} alt="Logo" className="h-24 text-black w-50" />
        </Link>
      </div>

      <div className="flex items-end p-6 space-x-4 text-xl text-black">
        {/* <Link to="/profile">
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/ios-filled/50/000/user-male-circle.png"
            alt="user-male-circle"
          />
        </Link> */}
        <button onClick={handleLogout} className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-700">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
