/** @format */

import React, { useState } from 'react';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { imgData } from './galleryImg';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import { useMe } from '../hooks/useMe';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { SignIn } from './signin';

const container = {
	hidden: { opacity: 1, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.5,
			staggerChildren: 0.5,
		},
	},
};

const item = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
};

const cardVariants: Variants = {
	offscreen: {
		y: 300,
	},
	onscreen: {
		y: 0,
		rotate: 0,
		transition: {
			type: 'spring',
			bounce: 0.4,
			duration: 0.8,
		},
	},
};

const bossHossClients = [
	{
		id: 1,
		img: 'https://bossandhoss.com/wp-content/uploads/2015/09/landcapers.png',
	},
	{
		id: 2,
		img: 'https://bossandhoss.com/wp-content/uploads/2021/05/brookfield-1.jpg',
	},
	{ id: 3, img: 'https://bossandhoss.com/wp-content/uploads/2015/09/hli.png' },
	{
		id: 4,
		img: 'https://bossandhoss.com/wp-content/uploads/2015/09/assiboine.png',
	},
	{
		id: 5,
		img: 'https://bossandhoss.com/wp-content/uploads/2015/09/hendge.png',
	},
	{
		id: 6,
		img: 'https://bossandhoss.com/wp-content/uploads/2015/09/peter.png',
	},
	{
		id: 7,
		img: 'https://bossandhoss.com/wp-content/uploads/2015/09/builders.png',
	},
	{ id: 8, img: 'https://bossandhoss.com/wp-content/uploads/2015/09/1.png' },
	{ id: 9, img: 'https://bossandhoss.com/wp-content/uploads/2015/09/2.png' },
	{ id: 10, img: 'https://bossandhoss.com/wp-content/uploads/2015/09/3.png' },
	{ id: 11, img: 'https://bossandhoss.com/wp-content/uploads/2015/09/4.png' },
	{ id: 12, img: 'https://bossandhoss.com/wp-content/uploads/2015/09/5.png' },
];

//
const box = {
	entry: (isBack: boolean) => ({
		x: isBack ? -200 : 200,
		opacity: 0,
	}),
	center: (isBack: boolean) => ({
		x: 0,
		zIndex: 1,
		opacity: 1,
	}),
	exit: (isBack: boolean) => ({
		x: isBack ? 200 : -200,
		opacity: 0,
		zIndex: 0,
	}),
};

export const Home = () => {
	const token = useSelector((state: RootState) => state.auth.userToken);
	const [visible, setVisible] = useState(1);
	const [back, setBack] = useState(false);
	console.log(token);
	const nextPlease = () => {
		setBack(false);
		setVisible((prev) => (prev === 10 ? 10 : prev + 1));
	};
	const prevPlease = () => {
		setBack(true);
		setVisible((prev) => (prev === 1 ? 1 : prev - 1));
	};
	return (
		<div>
			<div className='flex w-full px-5 xl:px-0 max-w-screen-2xl mx-auto h-screen md:flex-col'>
				<div className='p-20 basis-1/3 flex items-center flex-1 h-full w-full md:items-end md:justify-start md:px-0'>
					<div className='md:-mb-20 md:p-5'>
						<div className='mb-3 flex flex-col font-bold text-7xl sm:text-4xl md:mb-10'>
							<div className='flex'>
								<h1 className='mr-3'>BOSS</h1>
								<h1 className='mr-3'>B&H</h1>
								<h1 className=''>HOSS</h1>
							</div>
							<div>
								<h1>Irrigation</h1>
							</div>
						</div>
						{!token && (
							<Link to='/signIn'>
								<button className='py-1.5 px-5 bg-lime-300 rounded-xl text-xl sm:text-sm'>
									Book a reservation
									<ArrowForwardIcon
										sx={{ fontSize: 20, marginRight: -1, marginLeft: 1 }}
									/>
								</button>
							</Link>
						)}
						{token && (
							<Link to='/reservation'>
								<button className='py-1.5 px-5 bg-lime-300 rounded-xl text-xl sm:text-sm'>
									Book a reservation
									<ArrowForwardIcon
										sx={{ fontSize: 20, marginRight: -1, marginLeft: 1 }}
									/>
								</button>
							</Link>
						)}
					</div>
				</div>
				<div className='basis-2/3 flex'>
					<div className='flex-1 flex justify-end items-center md:w-full'>
						<motion.div
							variants={container}
							initial='hidden'
							animate='visible'
							style={{
								backgroundImage: `url(${imgData[0].imgSrc})`,
							}}
							className='bg-center bg-cover rounded-xl w-3/4 h-1/3 mr-10 md:w-2/3 md:h-3/5 md:mr-5'></motion.div>
					</div>
					<motion.div
						variants={container}
						initial='hidden'
						animate='visible'
						className='flex-1 flex flex-col justify-center md:w-full'>
						<motion.div
							key={1}
							variants={item}
							style={{
								backgroundImage: `url(${imgData[1].imgSrc})`,
							}}
							className='bg-center bg-cover rounded-xl w-3/4 h-1/3 mb-10 md:w-2/3 md:mb-3'></motion.div>
						<motion.div
							key={2}
							variants={item}
							style={{
								backgroundImage: `url(${imgData[2].imgSrc})`,
							}}
							className='bg-center bg-cover rounded-xl w-3/4 h-1/3 md:w-2/3'></motion.div>
					</motion.div>
				</div>
			</div>
			<div className='h-screen bg-zinc-900 flex md:flex-col'>
				<div className='flex-1 flex items-center p-20 md:p-10'>
					<div>
						<h2 className='text-lime-300 text-5xl font-bold sm:text-2xl'>
							Quality Work Since 2005
						</h2>
						<p className='text-white mb-10 text-xl sm:text-sm'>
							WE TREAT EVERY PROPERTY AS IF IT IS OUR OWN PROPERTY.
						</p>
						<p className='text-white text-xl sm:text-sm'>
							Boss & Hoss Irrigation has been installing systems in Calgary for
							16 years. Boss & Hoss Irrigation Calgary has been working with
							many local builders and landscaping companies in and around the
							Calgary area. In addition, we also cater to single-family homes
							and have successfully installed and servicing hundreds of homes
						</p>
					</div>
				</div>
				<motion.div
					className='flex-1 w-64 flex justify-center items-center md:w-full md:p-10'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.8 }}>
					<motion.div
						className='bg-center bg-cover rounded-lg w-3/5 h-3/5 md:-mt-5 md:h-full sm:w-full'
						style={{
							backgroundImage: `url(${imgData[5].imgSrc})`,
						}}
						variants={container}></motion.div>
				</motion.div>
			</div>
			<div className='flex h-screen bg-zinc-800 md:flex-col md:items-center md:justify-center md:px-5 md:py-2'>
				<motion.div
					className='flex-1 w-64 flex justify-center items-center md:order-2 md:w-full md:h-full md:p-10'
					initial='offscreen'
					whileInView='onscreen'
					viewport={{ once: true, amount: 0.8 }}>
					<motion.div
						style={{
							backgroundImage: `url(${imgData[6].imgSrc})`,
						}}
						className='bg-center bg-cover w-3/5 h-4/6 rounded-xl md:h-full shadow-[-40px_40px_0px_0px_rgba(206,250,83)] -mt-8 md:w-2/3 sm:shadow-[-15px_15px_0px_0px_rgba(206,250,83)]'
						variants={cardVariants}></motion.div>
				</motion.div>
				<div className='flex-1 w-64 flex justify-center flex-col mr-10 items-center md:order-1 md:w-full md:m-0 md:px-1'>
					<div className='mb-5 w-full md:mb-2'>
						<h2 className='text-lime-300 text-5xl font-bold py-5 sm:text-2xl md:mt-10 md:text-center'>
							Our Services
						</h2>
					</div>
					<div className='grid grid-rows-2 grid-flow-col gap-4 md:m-3 w-full'>
						<div className='m-1'>
							<div className='mb-2'>
								<CheckIcon className='bg-lime-300 rounded p-1' />
							</div>
							<div>
								<h3 className='text-white text-xl font-bold mb-2 sm:text-sm'>
									Residential
								</h3>
								<p className='text-white sm:text-xs'>
									workmanship above all others and consistently striving and
								</p>
							</div>
						</div>
						<div className='m-1'>
							<div className='mb-2'>
								<CheckIcon className='bg-lime-300 rounded p-1' />
							</div>
							<div>
								<h3 className='text-white text-xl font-bold mb-2 sm:text-sm'>
									Residential
								</h3>
								<p className='text-white sm:text-xs'>
									workmanship above all others and consistently striving and
								</p>
							</div>
						</div>
						<div className='m-1'>
							<div className='mb-2'>
								<CheckIcon className='bg-lime-300 rounded p-1' />
							</div>
							<div>
								<h3 className='text-white text-xl font-bold mb-2 sm:text-sm'>
									Residential
								</h3>
								<p className='text-white sm:text-xs'>
									workmanship above all others and consistently striving and
								</p>
							</div>
						</div>
						<div className='m-1'>
							<div className='mb-2'>
								<CheckIcon className='bg-lime-300 rounded p-1' />
							</div>
							<div>
								<h3 className='text-white text-xl font-bold mb-2 sm:text-sm'>
									Residential
								</h3>
								<p className='text-white sm:text-xs'>
									workmanship above all others and consistently striving and
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='h-1/2 bg-zinc-900 flex justify-center flex-col items-center'>
				<div className='p-20'>
					<h2 className='text-lime-300 text-center m-5 text-5xl font-bold sm:text-2xl'>
						Our Clients
					</h2>
					<div className='grid grid-rows-4 grid-flow-col'>
						{bossHossClients.map((client) => (
							<div key={client.id}>
								<img src={`${client.img}`} />
							</div>
						))}
					</div>
				</div>
			</div>
			<div className='h-screen w-full'>
				<div className='h-1/2 flex justify-center items-center flex-col sm:h-full sm:m-5'>
					<div className='flex justify-center items-center w-full'>
						<ArrowBackIosIcon
							onClick={prevPlease}
							sx={{
								padding: '10px',
								fontSize: '5vw',
								position: 'absolute',
								cursor: 'pointer',
								zIndex: 2,
								left: '10px',
							}}
						/>
						<AnimatePresence>
							{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) =>
								i === visible ? (
									<motion.div
										className='flex justify-center items-center w-1/2 absolute bg-lime-300 rounded-md p-8 md:w-2/3 sm:flex-col'
										custom={false}
										key={visible}
										variants={box}
										initial='entry'
										animate='center'
										exit='exit'
										transition={{
											x: { type: 'spring', stiffness: 300, damping: 30 },
											opacity: { duration: 0.2 },
										}}>
										<div className='basis-2/3 mr-10 sm:order-last sm:mt-10 sm:mr-5'>
											<h3 className='text-3xl font-bold text-center sm:text-md'>
												“
											</h3>
											<p className='mb-10 sm:text-sm'>
												We hired Boss & Hoss for our first home and was
												extremely happy with the results and how quickly they
												finished. In total now we have installed over 3
												properties and we’re extremely happy with the quality
												workmanship and continued service. Happy customers for
												over 10 years now
											</p>
											<p className='font-bold mb-3'>June & Ken.</p>
											<p>Customer</p>
										</div>
										<img
											className='basis-1/3 rounded-full'
											src='https://bossandhoss.com/wp-content/uploads/2015/09/jandk-150x150.jpg'
										/>
									</motion.div>
								) : null
							)}
						</AnimatePresence>
						<ArrowForwardIosIcon
							onClick={nextPlease}
							sx={{
								padding: '10px',
								fontSize: '5vw',
								position: 'absolute',
								cursor: 'pointer',
								zIndex: 2,
								right: '10px',
							}}
						/>
					</div>
				</div>
				<div className='h-screen bg-zinc-800 flex justify-center items-center flex-col'>
					<div className='text-white p-20 w-1/2 md:w-full sm:p-0'>
						<h3 className='text-3xl font-bold text-center mb-10 sm:text-md'>
							“
						</h3>
						<p className='mb-10 text-3xl text-center sm:text-lg'>
							Best irrigation company we have worked with, gets the job done
							right on budget and has fantastic service.
						</p>
						<p className='mb-3 text-center'>CIDEX.</p>
					</div>
					<div className='text-white p-20 w-1/2 md:w-full sm:p-0'>
						<h3 className='text-3xl font-bold text-center mb-10 sm:text-md'>
							“
						</h3>
						<p className='mb-10 text-3xl text-center sm:text-lg'>
							Boss & Hoss has installed 10+ zone for our high rise condos and
							has been servicing our buildings and we are extremely happy with
							the quality of work and professionalism they bring.
						</p>
						<p className='mb-3 text-center'>SK Consulting.</p>
					</div>
				</div>
				<div className='w-full text-white h-1/2 bg-zinc-900 flex flex-col items-center justify-between sm:h-20'>
					<div className='h-1/2 flex items-end'>
						<InstagramIcon sx={{ marginRight: '2vw' }} />
						<GoogleIcon />
					</div>
					<footer className='flex justify-center items-center mb-10 sm:mb-1 sm:text-sm'>
						<p>@ Boss & Hoss Coporation. All Right Reserved</p>
					</footer>
				</div>
			</div>
		</div>
	);
};
