import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Header = () => {
	return (
		<header className='py-50 bg-red-500'>
        <nav>
          <div className='text-xs'><FontAwesomeIcon icon={faUser} className='text-xl' /></div>
          <div>about</div>
          <div>our work</div>
          <div>contact us</div>
          <div>sign in</div>
        </nav>
		</header>
	);
};
