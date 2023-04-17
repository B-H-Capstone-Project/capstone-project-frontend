/** @format */

import React, { useState } from 'react';
import { Variants, motion } from 'framer-motion';
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { imgData } from './galleryImg';

import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

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

const reviewCardVariants: Variants = {
	offscreen: {
		y: 200,
	},
	onscreen: {
		y: 50,
		transition: {
			type: 'spring',
			bounce: 0.4,
			duration: 1,
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

interface IReview {
	name: string;
	img: string;
	review: string;
}
//reviewers
const reviews: IReview[] = [
	{
		name: 'June & Ken. Single family home',
		img: 'https://bossandhoss.com/wp-content/uploads/2015/09/jandk-150x150.jpg',
		review:
			'We hired Boss & Hoss for our first home and was extremely happy with the results and how quickly they finished. In total now we have installed over 3 properties and we’re extremely happy with the quality workmanship and continued service. Happy customers for over 10 years now ',
	},
	{
		name: 'Johnny Merhi. Single family home',
		img: 'https://bossandhoss.com/wp-content/uploads/2015/09/johnny-150x150.jpg',
		review:
			'This is noew our 4th year of doing business with Boss & Hoss. The owner is extremly pleasant to work with and provides fantastic service. Out grass is always green on our side thanks to boss & hoss! Thanks Hussein!',
	},
	{
		name: 'Alex Rusinek. Single family home',
		img: 'https://bossandhoss.com/wp-content/uploads/2015/09/alex-150x150.jpg',
		review:
			'After searching for many weeks, we have found the perfect match. Hussein was couteous and informative and the pricing was more than fare. The job was done as promised and on schedule. We have been with Boss & Hoss for 2 years now and planning to install another home soon.',
	},
];

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

	return (
		<div>
			<div className='w-full flex px-5 xl:px-0 mx-auto h-screen md:flex-col'>
				<div className='p-20 basis-1/3 flex items-center flex-1 h-full w-full md:items-end md:justify-start md:px-0'>
					<div className='md:-mb-20 md:p-5'>
						<div className='mb-3 flex flex-col font-bold text-7xl md:text-5xl sm:text-4xl md:mb-10'>
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
								<button className='py-1.5 px-5 bg-lime-600 rounded-xl text-xl sm:text-sm'>
									Book a reservation
									<ArrowForwardIcon
										sx={{ fontSize: 20, marginRight: -1, marginLeft: 1 }}
									/>
								</button>
							</Link>
						)}
						{token && (
							<Link to='/reservation'>
								<button className='py-1.5 px-5 bg-lime-600  rounded-xl text-xl sm:text-sm'>
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
						<h2 className='text-lime-600 text-5xl font-bold sm:text-2xl'>
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
						className='bg-center bg-cover w-3/5 h-4/6 rounded-xl md:h-full shadow-[-40px_40px_0px_0px_rgba(101,163,13)] -mt-8 md:w-2/3 sm:shadow-[-15px_15px_0px_0px_rgba(206,250,83)]'
						variants={cardVariants}></motion.div>
				</motion.div>
				<div className='flex-1 w-64 flex justify-center flex-col mr-10 items-center md:order-1 md:w-full md:m-0 md:px-1'>
					<div className='mb-5 w-full md:mb-2'>
						<h2 className='text-lime-600 text-5xl font-bold py-5 sm:text-2xl md:mt-10 md:text-center'>
							Our Services
						</h2>
					</div>
					<div className='grid grid-rows-2 grid-flow-col gap-4 md:m-3 w-full'>
						<div className='m-1'>
							<div className='mb-2'>
								<CheckIcon className='bg-lime-600 rounded p-1' />
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
								<CheckIcon className='bg-lime-600 rounded p-1' />
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
								<CheckIcon className='bg-lime-600 rounded p-1' />
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
								<CheckIcon className='bg-lime-600 rounded p-1' />
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
			<div className='h-1/2 p-20 md:p-0 sm:p-0 bg-zinc-900 flex justify-center flex-col items-center'>
				<h2 className='text-lime-600 text-center m-5 text-5xl font-bold sm:text-2xl'>
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
			<div className='h-screen bg-zinc-800 flex justify-center items-center flex-col sm:h-2/3'>
				<div className='text-white p-20 w-1/2 md:w-full sm:p-0'>
					<h3 className='font-bold text-center mb-10  text-3xl md:text-md sm:text-sm'>
						“
					</h3>
					<p className='mb-10 text-center sm:m-2  text-2xl md:text-md sm:text-sm'>
						Best irrigation company we have worked with, gets the job done right
						on budget and has fantastic service.
					</p>
					<p className='mb-3 text-center  text-2xl md:text-md sm:text-sm'>
						CIDEX.
					</p>
				</div>
				<div className='text-white p-20 w-1/2 md:w-full sm:p-0'>
					<h3 className='font-bold text-center mb-10  text-3xl md:text-md sm:text-sm'>
						“
					</h3>
					<p className='mb-10 text-center sm:m-2  text-2xl md:text-md sm:text-sm'>
						Boss & Hoss has installed 10+ zone for our high rise condos and has
						been servicing our buildings and we are extremely happy with the
						quality of work and professionalism they bring.
					</p>
					<p className='mb-3 text-center  text-2xl md:text-md sm:text-sm'>
						SK Consulting.
					</p>
				</div>
			</div>
			<div className='h-screen p-5'>
				{reviews.map((i) => (
					<div className='w-full h-1/3'>
						<motion.div
							className='flex flex-col justify-center items-center sm:text-xs sm:m-2'
							initial='offscreen'
							whileInView='onscreen'
							viewport={{ once: true, amount: 0.8 }}>
							<motion.div
								className='bg-lime-600 rounded-md max-w-lg sm:w-full'
								variants={reviewCardVariants}>
								<h3 className='text-2xl font-bold text-center mt-2 sm:mt-0'>
									“
								</h3>
								<p className='m-2'>{i.review}</p>
								<div className='flex justify-center items-end mb-5 sm:mb-2'>
									<img
										className='w-10 rounded-full mr-5'
										src={i.img}
									/>
									<p>{i.name}</p>
								</div>
							</motion.div>
						</motion.div>
					</div>
				))}
			</div>
		</div>
	);
};
