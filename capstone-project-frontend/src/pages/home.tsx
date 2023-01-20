/** @format */

import React from 'react';
import { motion } from 'framer-motion';

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

export const Home = () => {
	return (
		<div className='flex w-full px-5 xl:px-0 max-w-screen-2xl mx-auto h-screen'>
			<div className='p-10 basis-1/2 flex items-center'>
				<div>
					<div className='mb-3'>
						<h1 className='text-7xl'>BOSS B&H HOSS</h1>
						<h1 className='text-7xl'>Irrigation</h1>
					</div>
					<button className='text-sm py-1.5 px-5 ml-2 bg-green-400 rounded-xl'>
						Book a reservation -
					</button>
				</div>
			</div>
			<div className='basis-1/2 flex justify-center'>
				<div className='flex items-center basis-1/2 justify-end'>
					<motion.div
						variants={container}
						initial='hidden'
						animate='visible'
						className='bg-black p-20 m-2 rounded'></motion.div>
				</div>
				<div className='flex items-center basis-1/2'>
					<motion.div
						className='flex flex-col justify-center'
						variants={container}
						initial='hidden'
						animate='visible'>
						<motion.div
							key={2}
							variants={item}
							className='bg-black p-10 m-2 rounded'></motion.div>
						<motion.div
							key={3}
							variants={item}
							className='bg-yellow-300 m-2 p-10 rounded'></motion.div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};
