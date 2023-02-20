import React, { useState, Component } from "react";
import { imgData } from './galleryImg';
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { Header } from '../components/header';
// import slider from "react-slick";

export const OurWork = () => {

  const slideLeft = () => {
    const slider = document.getElementById('slider')
    slider!.scrollLeft = slider!.scrollLeft - 440
  }

  const slideRight = () => {

    const slider = document.getElementById('slider')
    slider!.scrollLeft = slider!.scrollLeft + 440
  }

  const [model, setModel] = useState(false);
  const [tempimgSrc, setTempImg] = useState('');

  const getImg = (imgSrc: string) => {
    setTempImg(imgSrc);
    setModel(true);
  }


  return (
    <>
      <Header></Header>
      <div className="p-8 mx-auto  space-y-4 ">


        {/* <img className="w-full h-[440px] object-cover" src="https://www.linkpicture.com/q/1-1_26.jpg"></img>  */}
        {/*demo img*/}
        <div className='relative flex items-center  '>
          <button onClick={slideLeft}><MdChevronLeft size={50} /></button>

          <div id='slider' className='w-full h-full object-cover overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide ' > {/* Note: Scrollbar-hide does not apply... */}
            {imgData.map((item, index) => (
              <img onClick={() => getImg(item.imgSrc)}
                className='w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300 '
                src={item.imgSrc}
                alt='/' />
            )
            )}
          </div>
          <button onClick={slideRight}><MdChevronRight size={50} /></button>
        </div>
        <div 
          id={model ? "model open" : "model"}>
          <img src={tempimgSrc} className='' />

        </div>
      </div>



    </>
  );
};

export default OurWork;

