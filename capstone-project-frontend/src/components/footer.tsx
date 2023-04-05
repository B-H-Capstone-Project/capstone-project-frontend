/** @format */
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';


export const Footer = () => {
	return (
		<div className='w-full h-40 text-white bg-zinc-900 flex flex-col'>
			<div className='basis-2/3 flex items-end justify-center'>
				<InstagramIcon sx={{ marginRight: '3vw' }} />
				<GoogleIcon />
			</div>
			<footer className='basis-1/2 flex justify-center items-end mb-10 text-sm'>
				<p>@ Boss & Hoss Coporation. All Right Reserved</p>
			</footer>
		</div>
	);
};
