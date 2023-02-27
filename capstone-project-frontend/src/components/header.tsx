/** @format */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../redux/store';
import AuthService from '../services/auth.service';

export const Header = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector((state: RootState) => state.isLoggedIn);

	const logOutHandler = () => {
    window.location.reload();;
	};

	return (
		<header>
			<nav className='flex justify-between py-2.5'>
				<div className='text-3xl font-bold px-20'>
					<NavLink to={'/'}>B&H</NavLink>
				</div>
				<div className='flex justify-center items-center px-20'>
					<div className='text-xs mr-10'>
						<NavLink to='/about'>ABOUT</NavLink>
					</div>
					<div className='text-xs mr-10'>
						<NavLink to='/our-work'>OUR WORK</NavLink>
					</div>
					<div className='text-xs mr-10'>
						<NavLink to='/contact-us'>CONTACT US</NavLink>
					</div>
					{!isAuth ? (
						<NavLink to='signin'>
							<button className=' bg-black hover:bg-blue-700 py-3 px-10  text-white font-bold rounded-lg'>
								SIGN IN
							</button>
						</NavLink>
					) : (
						<button
							onClick={logOutHandler}
							className=' bg-black hover:bg-blue-700 py-3 px-10  text-white font-bold rounded-lg'>
							SIGN OUT
						</button>
					)}
				</div>
			</nav>
		</header>
	);
};
