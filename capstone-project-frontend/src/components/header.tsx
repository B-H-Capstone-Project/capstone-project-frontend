/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hook";
import { signOut } from "../redux/reducer/authSlice";

export const Header = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector((state: RootState) => state.auth);
  return (
    <header>
      <nav className="flex justify-between py-2.5">
        <div className="text-3xl font-bold px-20">
          <NavLink to={"/"}>B&H</NavLink>
        </div>
        <div className="flex justify-center items-center px-20">
          <div className="text-xs mr-10">
            <NavLink to="/our-work">OUR WORK</NavLink>
          </div>
          <div className="text-xs mr-10">
            <NavLink to="/contact-us">CONTACT US</NavLink>
          </div>
          <div className="text-xs mr-10">
          {!isAuth.isLoggedIn ? (<NavLink to="/signin">RESERVATION</NavLink>):<NavLink to="/reservation">RESERVATION</NavLink>}
          </div>
          {!isAuth.isLoggedIn ? (
            <NavLink to="signin">
              <button className=" bg-black hover:bg-blue-700 py-3 px-10  text-white font-bold rounded-lg">
                SIGN IN
              </button>
            </NavLink>
          ) : (
            <NavLink to="/">
              <button
                onClick={() => dispatch(signOut())}
                className=" bg-black hover:bg-blue-700 py-3 px-10  text-white font-bold rounded-lg"
              >
                SIGN OUT
              </button>
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};
