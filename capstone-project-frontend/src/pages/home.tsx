/** @format */

import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/header';
import CheckIcon from '@mui/icons-material/Check';

const container = {
	hidden: { opacity: 1, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2,
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

const bossHossClients = [
	{ id: 1, img: '', url: '' },
	{ id: 2, img: '', url: '' },
	{ id: 3, img: '', url: '' },
	{ id: 4, img: '', url: '' },
	{ id: 5, img: '', url: '' },
	{ id: 6, img: '', url: '' },
	{ id: 7, img: '', url: '' },
	{ id: 8, img: '', url: '' },
	{ id: 9, img: '', url: '' },
	{ id: 10, img: '', url: '' },
	{ id: 11, img: '', url: '' },
	{ id: 12, img: '', url: '' },
];

export const Home = () => {
	return (
		<div>
			<Header />
			<div className='flex w-full px-5 xl:px-0 max-w-screen-2xl mx-auto h-screen'>
				<div className='p-20 basis-1/2 flex items-center flex-1 h-full w-full'>
					<div>
						<div className='mb-3'>
							<h1 className='text-7xl'>BOSS B&H HOSS</h1>
							<h1 className='text-7xl'>Irrigation</h1>
						</div>
						<button className='text-sm py-1.5 px-5 ml-2 bg-lime-300 rounded-xl'>
							Book a reservation -
						</button>
					</div>
				</div>
				<div className='basis-1/2 flex'>
					<div className='flex-1 flex justify-end items-center'>
						<motion.div
							variants={container}
							initial='hidden'
							animate='visible'
							className='bg-black rounded-lg w-3/4 h-1/3 mr-10'></motion.div>
					</div>
					<motion.div
						variants={container}
						initial='hidden'
						animate='visible'
						className='flex-1 flex flex-col justify-center'>
						<motion.div
							key={1}
							variants={item}
							className='bg-black rounded-lg w-3/4 h-1/3 mb-10'></motion.div>
						<motion.div
							key={2}
							variants={item}
							className='bg-yellow-300 rounded-lg w-3/4 h-1/3'></motion.div>
					</motion.div>
				</div>
			</div>
			<div className='h-screen bg-black flex justify-center'>
				<div className='p-20 flex items-center'>
					<div className='basis-1/2 mr-10'>
						<h2 className='text-lime-300 text-4xl font-bold'>
							Quality Work Since 2005
						</h2>
						<p className='text-white mb-10 text-xl'>
							WE TREAT EVERY PROPERTY AS IF IT IS OUR OWN PROPERTY.
						</p>
						<p className='text-white text-xl'>
							Boss & Hoss Irrigation has been installing systems in Calgary for
							16 years. Boss & Hoss Irrigation Calgary has been working with
							many local builders and landscaping companies in and around the
							Calgary area. In addition, we also cater to single-family homes
							and have successfully installed and servicing hundreds of homes…
							Continuing with builders and landscapers we have achieved quality
							workmanship above all others and consistently striving and
							maintaining excellence in all areas of our business ethics. ßWe
							are professionals who focus on Irrigation and Outdoor lighting
							which goes hand in hand. Please feel free to contact us for an
							estimate for your property needs. Click Here to View Our Work
							“Irrigation & Outdoor Lighting”
						</p>
					</div>
					<div className='basis-1/2'>
						<div className='bg-white rounded-lg'>sdfsfdfs</div>
					</div>
				</div>
			</div>
			<div className='flex h-screen w-full bg-zinc-800'>
				<div className='besis-1/2 w-full flex justify-center items-center'>
					<div className='p-20 rounded-xl bg-white shadow-[-30px_30px_0px_0px_rgba(206,250,83)]'></div>
				</div>
				<div className='besis-1/2 flex justify-center items-center flex-col mr-10'>
					<div className='w-full'>
						<h2 className='text-lime-300 text-4xl font-bold'>
							Our <br className='mb-2' /> Services
						</h2>
					</div>
					<div className='grid grid-rows-2 grid-flow-col gap-4'>
						<div className='p-20 bg-red-300'>
							<div>
								<CheckIcon className='bg-lime-300 rounded p-10' />
							</div>
							<h3 className='text-white text-xl font-bold'>Residential</h3>
							<p className='text-white'>sdffdgfdgfdgdfgdfgsdfsdfsdf</p>
						</div>
						<div className='p-20 bg-red-300'>
							<div>
								<CheckIcon className='bg-lime-300 rounded p-10' />
							</div>
							<h3 className='text-white text-xl font-bold'>Residential</h3>
							<p className='text-white'>sdfsdfsdfdgfdgfdgfsdf</p>
						</div>
						<div className='p-20 bg-red-300'>
							<div>
								<CheckIcon className='bg-lime-300 rounded p-10' />
							</div>
							<h3 className='text-white text-xl font-bold'>Residential</h3>
							<p className='text-white'>sdfsdfsdfgdfgfdgfdgfdgdfsdf</p>
						</div>
						<div className='p-20 bg-red-300'>
							<div>
								<CheckIcon className='bg-lime-300 rounded p-10' />
							</div>
							<h3 className='text-white text-xl font-bold'>Residential</h3>
							<p className='text-white'>sdfsdfsdfgfdgfdgdfgdfgdgdfsdf</p>
						</div>
					</div>
				</div>
			</div>
			<div className='h-screen bg-black'>
				<h2 className='text-lime-300 p-20'>Our Clients</h2>
				<div className='grid grid-rows-4 grid-flow-col gap-4 p-20'>
					{bossHossClients.map((client) => (
						<div
							key={client.id}
							className='p-5 bg-red-300 m-1'>
							{client.img}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
