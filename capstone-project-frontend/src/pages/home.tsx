/** @format */

import React from 'react';
import { Services } from '../components/services';
import { Table } from '../components/clientTable';
import { Variants, motion } from 'framer-motion';
import CheckIcon from '@mui/icons-material/Check';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

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
			<div className='flex w-full px-5 xl:px-0 max-w-screen-2xl mx-auto h-screen'>
				<div className='p-20 basis-1/2 flex items-center flex-1 h-full w-full'>
					<div>
						<div className='mb-3'>
							<h1 className='text-7xl'>BOSS B&H HOSS</h1>
							<h1 className='text-7xl'>Irrigation</h1>
						</div>
						<button className='text-sm py-1.5 px-5 ml-2 bg-lime-300 rounded-xl'>
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
					</div>
				</div>
				<div className='basis-1/2 flex'>
					<div className='flex-1 flex justify-end items-center'>
						<motion.div
							variants={container}
							initial='hidden'
							animate='visible'
							className='bg-black rounded-xl w-3/4 h-1/3 mr-10'></motion.div>
					</div>
					<motion.div
						variants={container}
						initial='hidden'
						animate='visible'
						className='flex-1 flex flex-col justify-center'>
						<motion.div
							key={1}
							variants={item}
							className='bg-black rounded-xl w-3/4 h-1/3 mb-10'></motion.div>
						<motion.div
							key={2}
							variants={item}
							className='bg-yellow-300 rounded-xl w-3/4 h-1/3'></motion.div>
					</motion.div>
				</div>
			</div>
			<div className='h-screen bg-black flex'>
				<div className='flex-1 w-64 flex justify-center items-center p-20'>
					<div>
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
				</div>
				<motion.div
					className='flex-1 w-64 flex justify-center items-center'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.8 }}>
					<motion.div
						className='bg-white rounded-lg w-3/5 h-3/5 '
						variants={container}></motion.div>
				</motion.div>
			</div>
			<div className='flex h-screen bg-zinc-800'>
				<motion.div
					className='flex-1 w-64 flex justify-center items-center'
					initial='offscreen'
					whileInView='onscreen'
					viewport={{ once: true, amount: 0.8 }}>
					<motion.div
						className='w-3/5 h-4/6 rounded-xl bg-white shadow-[-40px_40px_0px_0px_rgba(206,250,83)] -mt-8'
						variants={cardVariants}></motion.div>
				</motion.div>
				<div className='flex-1 w-64 flex justify-center flex-col mr-10'>
					<div className='w-full mb-3'>
						<h2 className='text-lime-300 text-7xl font-bold py-5'>
							Our <br className='mb-2' /> Services
						</h2>
					</div>
					<div className='grid grid-rows-2 grid-flow-col gap-4'>
						<div className='m-1'>
							<div className='mb-2'>
								<CheckIcon className='bg-lime-300 rounded p-1' />
							</div>
							<div>
								<h3 className='text-white text-xl font-bold mb-2'>
									Residential
								</h3>
								<p className='text-white'>
									workmanship above all others and consistently striving and
									maintaining excellence in all areas of our business ethics.
									ßWe are professionals who focus on Irrigation and Outdoor
									lighting which goes hand in hand.
								</p>
							</div>
						</div>
						<div className='m-1'>
							<div className='mb-2'>
								<CheckIcon className='bg-lime-300 rounded p-1' />
							</div>
							<div>
								<h3 className='text-white text-xl font-bold mb-2'>
									Residential
								</h3>
								<p className='text-white'>
									workmanship above all others and consistently striving and
									maintaining excellence in all areas of our business ethics.
									ßWe are professionals who focus on Irrigation and Outdoor
									lighting which goes hand in hand.
								</p>
							</div>
						</div>
						<div className='m-1'>
							<div className='mb-2'>
								<CheckIcon className='bg-lime-300 rounded p-1' />
							</div>
							<div>
								<h3 className='text-white text-xl font-bold mb-2'>
									Residential
								</h3>
								<p className='text-white'>
									workmanship above all others and consistently striving and
									maintaining excellence in all areas of our business ethics.
									ßWe are professionals who focus on Irrigation and Outdoor
									lighting which goes hand in hand.
								</p>
							</div>
						</div>
						<div className='m-1'>
							<div className='mb-2'>
								<CheckIcon className='bg-lime-300 rounded p-1' />
							</div>
							<div>
								<h3 className='text-white text-xl font-bold mb-2'>
									Residential
								</h3>
								<p className='text-white'>
									workmanship above all others and consistently striving and
									maintaining excellence in all areas of our business ethics.
									ßWe are professionals who focus on Irrigation and Outdoor
									lighting which goes hand in hand.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='h-screen bg-black flex justify-center flex-col items-center'>
				<h2 className='text-lime-300 text-5xl font-bold p-20 '>Our Clients</h2>
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
