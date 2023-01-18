import React from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Header = () => {
	return (
		<header className='py-'>
			<nav className='w-full px-5 xl:px-0 max-w-screen-2xl mx-auto items-center flex justify-between'>
				<div className='px-4 bg-red-300'>about</div>
				<div className='px-4 bg-red-300'>our work</div>
				<div className='px-4 bg-red-300'>contact us</div>
				<div className='px-4 bg-red-300'>sign in</div>
				<div className='text'>
					<FontAwesomeIcon
						icon={faUser}
						className='text-xl'
					/>
				</div>
			</nav>
		</header>
	);
};
