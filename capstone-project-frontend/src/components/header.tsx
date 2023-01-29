import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'

export const Header = () => {
	return (
		<header>
			<nav className='flex justify-between px-10 sm:px-4 py-2.5'>
				<div className='text-3xl font-bold'>
          <Link to={"/"}>
            B&H
          </Link>
				</div>
        <div className='flex justify-between'>
          <div className='py-2 px-14'><HashLink smooth to={"#about"}>about</HashLink></div>
          <div className='py-2 px-14'><HashLink smooth to={"#our-work"}>our work</HashLink></div>
          <div className='py-2 px-14'><HashLink smooth to={"#contact-us"}>contact us</HashLink></div>
          <button className=' bg-black hover:bg-blue-700 py-4 px-10  text-white font-bold rounded-lg'><Link to={"/signIn"}>SIGN IN</Link></button>
        </div>
			</nav>
		</header>
	);
};
