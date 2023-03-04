/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hook";
import { signOut } from "../redux/reducer/authSlice";

export const Header = () => {
  const dispatch = useAppDispatch();
  
  return (
    <header>
      <nav className="flex justify-between py-2.5">
        <div className="text-3xl font-bold px-20">
          <NavLink to={"/"}>B&H</NavLink>
        </div>
        <div className="flex justify-center items-center px-20">
          <div className="text-xs mr-10">
            <NavLink to="/about">ABOUT</NavLink>
          </div>
          <div className="text-xs mr-10">
            <NavLink to="/our-work">OUR WORK</NavLink>
          </div>
          <div className="text-xs mr-10">
            <NavLink to="/contact-us">CONTACT US</NavLink>
          </div>
         
        </div>
      </nav>
    </header>
  );
};
