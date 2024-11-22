import React from "react";
import { NavLink, useNavigate} from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
  return (
    <nav className="fixed top-0 bg-white  z-[1000] w-full h-[70px] flex justify-between items-center px-[1rem] border-b border-gray-300">
        <img
        onClick={() => {
          navigate("/");
        }}
        src="main-logo.png"
        alt="logo"
        className="h-full aspect-auto p-[.5rem] cursor-pointer"
      />
      <div className="w-[50%] flex items-center justify-evenly">
          <NavLink
            className=" font-[600] text-[.9rem] leading-[1.6rem] p-2"
            to="/users"
          >
            User List
          </NavLink>
          <NavLink
            className=" font-[600] text-[.9rem] leading-[1.6rem] p-2"
            to="/roles"
          >
            Roles
          </NavLink>
        </div>
    </nav>
  );
};

export default NavBar;
