import React from 'react';
import { imgData } from './galleryImg';
import { MdChevronLeft, MdChevronRight} from 'react-icons/md';

export const OurWork = () => {

  // const slideLeft = () => {
  //   let slider = document.getElementById('slider')
  //   slider.scrollLeft = slider.scrollLeft - 500
  // }

  // const slideRight = () => {
    
  //   let slider = document.getElementById('slider')
  //   slider.scrollLeft = slider.scrollLeft + 500
  // }
  
  

  return (


    <>
      <div className='relative flex items-center'>
        <MdChevronLeft  size={40}/>
        <div id='slider' className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth' >
          {imgData.map((item) => (
            <img
            className='w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300 scroll-smooth' 
            src={item.img} 
            alt='/' />
          )
          )}         
        </div>
        <MdChevronRight size={40}/>

      </div>
    </>
  );
};

