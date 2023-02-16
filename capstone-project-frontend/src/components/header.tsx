import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'
import { OurWork } from '../pages/our-work';
import { ContactUs } from '../pages/contactUs';
import { NavLink } from 'react-router-dom';

export const Header = () => {
	return (
		<header>
			<nav className='flex justify-between py-2.5'>
				<div className='text-3xl font-bold px-20'>
          <NavLink to={"/"}>
            B&H
          </NavLink>
				</div>
        <div className='flex justify-center items-center px-20'>
          <div className='text-xs mr-10'><NavLink to='/about'>ABOUT</NavLink></div>
          <div className='text-xs mr-10'><NavLink to='/our-work'>OUR WORK</NavLink></div>
          <div className='text-xs mr-10'><NavLink to='/contact-us'>CONTACT US</NavLink></div>
          <NavLink to='signin'><button className=' bg-black hover:bg-blue-700 py-3 px-10  text-white font-bold rounded-lg'>SIGN IN</button></NavLink>
        </div>
			</nav>
		</header>
	);
};
