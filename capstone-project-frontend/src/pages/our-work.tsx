/** @format */

import React, { useState } from 'react';
import { imgData } from './galleryImg';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import slider from "react-slick";

export const OurWork = () => {
	const slideLeft = () => {
		const slider = document.getElementById('slider');
		slider!.scrollLeft = slider!.scrollLeft - 440;
	};

	const slideRight = () => {
		const slider = document.getElementById('slider');
		slider!.scrollLeft = slider!.scrollLeft + 440;
	};

	const [model, setModel] = useState(false);
	const [tempimgSrc, setTempImg] = useState(imgData[0].imgSrc);

	const getImg = (imgSrc: string) => {
		setTempImg(imgSrc);
		setModel(true);
	};

	return (
		<div>
			<div className='h-screen'>
				<div className='flex items-center flex-col h-full justify-center'>
					<div
						className='w-full h-3/5 flex justify-center items-center mt-20'
						id={model ? 'model open' : 'model'}>
						<img
							className='h-full'
							src={tempimgSrc}
						/>
					</div>
					<div className='h-2/5 flex justify-center m-5 sm:mt-10'>
						<div className='mx-16 space-y-4'>
							{/* <img className="w-full h-[440px] object-cover" src="https://www.linkpicture.com/q/1-1_26.jpg"></img>  */}
							{/*demo img*/}
							<div className='relative flex items-center'>
								<button onClick={slideLeft}>
									<ChevronLeftIcon />
								</button>

								<div
									id='slider'
									className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
									{' '}
									{/* Note: Scrollbar-hide does not apply... */}
									{imgData.map((item, index) => (
										<img
											onClick={() => getImg(item.imgSrc)}
											className='w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300'
											src={item.imgSrc}
											alt='/'
										/>
									))}
								</div>
								<button onClick={slideRight}>
									<ChevronRightIcon />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
