/** @format */

import React from 'react';
import { Link } from 'react-router-dom';

//Adbul

export const Reservation = () => {
  return (
    <div className='w-full h-screen bg-red-300 flex justify-center items-center'>
    <div className='bg-yellow-300 w-1/2 h-1/2'>
      <h1>Reservation</h1>
      <Link to='form'>
        <button>+ New</button>
      </Link>
      <div>Current List</div>
    </div>
  </div>
  );
};
