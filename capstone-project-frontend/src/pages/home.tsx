/** @format */

import React from 'react';
import { Services } from '../components/services';
import { Table } from '../components/clientTable';
import { Variants, motion } from 'framer-motion';
import CheckIcon from '@mui/icons-material/Check';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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

export const Home = () => {
	return (
		<div>
			<div className='flex w-full px-5 xl:px-0 max-w-screen-2xl mx-auto h-screen md:flex-col'>
				<div className='p-20 basis-1/3 flex items-center flex-1 h-full w-full md:items-end md:justify-start md:px-0'>
					<div className='md:-mb-20'>
						<div className='mb-3 flex flex-col font-bold text-7xl sm:text-4xl md:m-3 md:mb-10'>
							<div className='flex'>
								<h1 className='mr-3'>BOSS</h1>
								<h1 className='mr-3'>B&H</h1>
								<h1 className=''>HOSS</h1>
							</div>
							<div>
								<h1>Irrigation</h1>
							</div>
						</div>
						<Link to="/reservation">
							<button className='text-sm py-1.5 px-5 ml-2 bg-lime-300 rounded-xl md:text-xl md:py-3'>
								Book a reservation
								<HorizontalRuleIcon
									sx={{ fontSize: 10, marginRight: -1, marginLeft: 1 }}
								/>
								<HorizontalRuleIcon sx={{ fontSize: 10, marginRight: -1 }} />
								<HorizontalRuleIcon sx={{ fontSize: 10, marginRight: -1 }} />
								<HorizontalRuleIcon sx={{ fontSize: 10, marginRight: -1 }} />
								<HorizontalRuleIcon sx={{ fontSize: 10, marginRight: -1 }} />
								<HorizontalRuleIcon sx={{ fontSize: 10, marginRight: -1 }} />
								<HorizontalRuleIcon sx={{ fontSize: 10, marginRight: -1 }} />
								<HorizontalRuleIcon sx={{ fontSize: 10, marginRight: -1 }} />
								<HorizontalRuleIcon sx={{ fontSize: 10, marginRight: -1 }} />
								<HorizontalRuleIcon sx={{ fontSize: 10, marginRight: -1 }} />
								<HorizontalRuleIcon sx={{ fontSize: 10, marginRight: -1 }} />
								<HorizontalRuleIcon sx={{ fontSize: 10, marginRight: -1 }} />
								<HorizontalRuleIcon sx={{ fontSize: 10, marginRight: -1 }} />
								<HorizontalRuleIcon sx={{ fontSize: 10, marginRight: -1 }} />
								<HorizontalRuleIcon sx={{ fontSize: 10, marginRight: -1 }} />
								<HorizontalRuleIcon sx={{ fontSize: 10, marginRight: -1 }} />
								<HorizontalRuleIcon sx={{ fontSize: 10, marginRight: -1 }} />
								<HorizontalRuleIcon sx={{ fontSize: 10, marginRight: -1 }} />
								<HorizontalRuleIcon sx={{ fontSize: 10, marginRight: -1 }} />
								<HorizontalRuleIcon sx={{ fontSize: 10 }} />
							</button>
						</Link>
					</div>
				</div>
				<div className='basis-1/2 flex'>
					<div className='flex-1 flex justify-end items-center'>
						<motion.div
							variants={container}
							initial='hidden'
							animate='visible'
							className='bg-black rounded-xl w-3/4 h-1/3 mr-10 md:w-3/5 md:h-3/5 md:m-3'></motion.div>
					</div>
					<motion.div
						variants={container}
						initial='hidden'
						animate='visible'
						className='flex-1 flex flex-col justify-center'>
						<motion.div
							key={1}
							variants={item}
							className='bg-black rounded-xl w-3/4 h-1/3 mb-10 md:w-2/5 md:mb-3'></motion.div>
						<motion.div
							key={2}
							variants={item}
							className='bg-yellow-300 rounded-xl w-3/4 h-1/3 md:w-2/5'></motion.div>
					</motion.div>
				</div>
			</div>
			<div className='h-screen bg-black flex md:flex-col'>
				<div className='flex-1 flex items-center'>
					<div className='p-20'>
						<h2 className='text-lime-300 text-4xl font-bold sm:text-3xl'>
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
					className='flex-1 w-64 flex justify-center items-center w-full'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.8 }}>
					<motion.div
						className='bg-white rounded-lg w-3/5 h-3/5'
						variants={container}></motion.div>
				</motion.div>
			</div>
			<div className='flex h-screen bg-zinc-800 md:flex-col'>
				<motion.div
					className='flex-1 w-64 flex justify-center items-center md:order-2 md:w-full'
					initial='offscreen'
					whileInView='onscreen'
					viewport={{ once: true, amount: 0.8 }}>
					<motion.div
						className='w-3/5 h-4/6 rounded-xl bg-white shadow-[-40px_40px_0px_0px_rgba(206,250,83)] -mt-8'
						variants={cardVariants}></motion.div>
				</motion.div>
				<div className='flex-1 w-64 flex justify-center flex-col mr-10 md:w-full items-center md:order-1'>
					<div className='mb-5'>
						<h2 className='text-lime-300 text-7xl font-bold py-5 sm:text-2xl md:mt-10'>
							Our Services
						</h2>
					</div>
					<div className='grid grid-rows-2 grid-flow-col gap-4 md:m-3'>
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
			<div className='h-1/2 bg-black flex justify-center flex-col items-center'>
				<h2 className='text-lime-300 text-5xl font-bold p-20 sm:text-2xl'>
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
	);
};
