import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Header = () => {
	return (
		<header className='py-30 bg-red-300'>
			<div className='w-full px-5 xl:px-0 max-w-screen-2xl mx-auto  items-center flex justify-between'>
				<span className='text-xs'>
					<FontAwesomeIcon
						icon={faUser}
						className='text-xl'
					/>
				</span>
			</div>
		</header>
	);
};
