import * as React from 'react';
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

export const Services = () => {
    return (
        <div className='flex w- full px-5 xl:px-0 max-w-screen-2xl mx-auto h-screen'>
            
            <div className='flex items-center basis-1/4 static justify-start bg-lime-400  rounded'>
						<motion.div
							variants={container}
							initial='hidden'
							animate='visible'
							></motion.div>

            </div>
            <div className='p-10 basis-1/2 flex items-center float-right'>
               <div>
                   <div className='mb-4'>
                      <div className='text-lime-500 text-right font-bold'>
                          <h1 className='text-4xl'>Our Services</h1>
                      </div>
                      <div className='text-white-100 text-right clear:both float-right'>
                          <h2 className='text-base'>Comercial</h2>
                          <h2 className='text-base'>Servicing</h2>
                      </div>
                      <div className='text-white-100 text-right clear:both float-left'>
                          <h2 className='text-base'>Residential</h2>
                          <h2 className='text-base'>Outdoor</h2>
                      </div>
                    </div>
               </div> 
            </div>
        </div>
    )
}