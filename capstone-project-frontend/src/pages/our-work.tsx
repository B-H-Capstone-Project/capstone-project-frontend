import React, { useState } from "react";
import { imgData } from './galleryImg';
import { MdChevronRight, MdChevronLeft } from "react-icons/md";


export const OurWork = () => {

  const slideLeft = () => {
    const slider = document.getElementById('slider')
    slider!.scrollLeft = slider!.scrollLeft - 440
  }

  const slideRight = () => {

    let slider = document.getElementById('slider')
    slider!.scrollLeft = slider!.scrollLeft + 440
  }



  return (
    <>

      <div className="p-4 mx-16 space-y-4">
        {/* <img className="object-scale-down "src="https://www.linkpicture.com/q/1-1_26.jpg"></img> */}
        <div className='relative flex items-center'>
        <button onClick={slideLeft}><MdChevronLeft size={50} /></button>
        <div>
          <div id='slider' className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide ' >
            {imgData.map((item) => (
              <img onClick={(slideLeft)}
                className='w-[220px] inline-block p-2 cursor-pointer hover:scale-115 ease-in-out duration-300 scroll-smooth'
                src={item.img}
                alt='/' />
            )
            )}
          </div>
        </div>
        <button onClick={slideRight}><MdChevronRight size={50} /></button>
      </div>
      </div>


    </>
  );
};

