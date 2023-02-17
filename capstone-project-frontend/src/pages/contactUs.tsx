import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from "react";

const FORM_ENDPOINT = "";

export const ContactUs = () => {
      const [submitted, setSubmitted] = useState(false);
      const handleSubmit = () => {
        setTimeout(() => {
          setSubmitted(true);
        }, 100);
      };
    
      if (submitted) {
        return (
          <>
            <div className="text-2xl">Thank you!</div>
            <div className="text-md">We'll be in touch soon.</div>
          </>
        )
      };
            return (
    <div>
      <img className="inline" src="..." alt="..."></img>
    <div className='flex justify-center'>
          <h1>CONTACT:</h1>
          </div>
          <div className='py-2 px-14 flex justify-center'><h2>403-630-1277</h2></div>
          <div className='py-2 px-14 flex justify-center'><h2><a href="mailto:info@bossandhoss.com">info@bossandhoss.com</a></h2></div>
          <div className='py-2 px-14 flex justify-center'><h2><Link to={"/Instagram"}>Boss and Hoss Instagram</Link></h2></div>
          <div className='flex justify-center'><h1>OFFICE:</h1></div>
          <div className='py-2 px-14 flex justify-center'><h3>3420 Temple Road NE</h3></div>
          <div className='py-2 px-14 flex justify-center'><h3>Calgary, AB T1Y 3A9, Canada</h3></div>
        </div>
    )
      return (
        <form
          action={FORM_ENDPOINT}
          onSubmit={handleSubmit}
          method="POST"
          target="_blank">
          <div className="mb-3 pt-0">
            <input
              type="text"
              placeholder="Your name"
              name="name"
              className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
              required/>
          </div>
          <div className="mb-3 pt-0">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
              required/>
          </div>
          <div className="mb-3 pt-0">
            <textarea
              placeholder="Your message"
              name="message"
              className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
              required/>
          </div>
          <div className="mb-3 pt-0">
            <button
              className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit">
              Send a message
            </button>
          </div>
        </form>
      )
};