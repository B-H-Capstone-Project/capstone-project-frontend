import React from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'

export const Header = () => {
	return (
		<header className='py-4'>
			<nav className='w-full px-5 xl:px-0 max-w-screen-2xl mx-auto items-center flex justify-between'>
				<div>
          <Link to={"/"}>
					<FontAwesomeIcon
						icon={faUser}
						className='text-xl'
					/>
          </Link>
				</div>
        <div className='flex justify-between'>
          <div className='py-2 px-14'><HashLink smooth to={"#about"}>about</HashLink></div>
          <div className='py-2 px-14'><HashLink smooth to={"#our-work"}>our work</HashLink></div>
          <div className='py-2 px-14'><HashLink smooth to={"#contact-us"}>contact us</HashLink></div>
          <button className=' bg-black hover:bg-blue-700 py-4 px-10  text-white font-bold rounded'><Link to={"/signIn"}>SIGN IN</Link></button>
        </div>
			</nav>
		</header>
	);
};
