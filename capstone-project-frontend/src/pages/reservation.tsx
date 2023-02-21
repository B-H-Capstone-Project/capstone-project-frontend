import React from 'react';
import { Link } from 'react-router-dom';

//Adbul

export const Reservation = () => {
  return (
    <>
    <h1>Reservation</h1>
    <Link to='form'><button>+ New</button></Link>
    <div>Current List</div>
    <div>History</div>
    </>
  );
};