/** @format */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useReservation } from '../hooks/useReservation';
import { IReservation } from '../types/reservation.dto';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { ReservationTableRow } from '../components/reservation-row';

export const Reservation = () => {
<<<<<<< HEAD
  return (
    <>
    <h1>Reservation</h1>
    <Link to='form'><button>+ New</button></Link>
    <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">No Current Reservation</h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">Date&Time: 02/21/2023 Type: Outdoor Lighting Description:</p>
</a>
    <h2>History</h2>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Date & Time
                </th>
                <th scope="col" className="px-6 py-3">
                    Type
                </th>
                <th scope="col" className="px-6 py-3">
                    Address
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                
                </th>
                <td className="px-6 py-4">
                
                </td>
                <td className="px-6 py-4">
                
                </td>
                <td> <button id="dropdownMenuIconHorizontalButton" data-dropdown-toggle="dropdownDotsHorizontal" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
  <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
</button>
<div id="dropdownDotsHorizontal" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
<label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
</div>
                </td>
            </tr>
            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                
                </th>
                <td className="px-6 py-4">
                
                </td>
                <td className="px-6 py-4">
                
                </td>
                <td> <button id="dropdownMenuIconHorizontalButton" data-dropdown-toggle="dropdownDotsHorizontal" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
  <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
</button>
<div id="dropdownDotsHorizontal" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
<label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
</div>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                
                </th>
                <td className="px-6 py-4">
                
                </td>
                <td className="px-6 py-4">
                
                </td>
                <td> <button id="dropdownMenuIconHorizontalButton" data-dropdown-toggle="dropdownDotsHorizontal" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
  <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
</button>
<div id="dropdownDotsHorizontal" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
<label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
</div>
                </td>
            </tr>
            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                
                </th>
                <td className="px-6 py-4">
                
                </td>
                <td className="px-6 py-4">
                
                </td>
                <td> <button id="dropdownMenuIconHorizontalButton" data-dropdown-toggle="dropdownDotsHorizontal" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
  <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
</button>
<div id="dropdownDotsHorizontal" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
<label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
</div>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                
                </th>
                <td className="px-6 py-4">
                
                </td>
                <td className="px-6 py-4">
                
                </td>
                <td> <button id="dropdownMenuIconHorizontalButton" data-dropdown-toggle="dropdownDotsHorizontal" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
  <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
</button>
<div id="dropdownDotsHorizontal" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
<label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                /> 
</div>
                </td>
            </tr>
            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                
                </th>
                <td className="px-6 py-4">
                
                </td>
                <td className="px-6 py-4">
                
                </td>
                <td> <button id="dropdownMenuIconHorizontalButton" data-dropdown-toggle="dropdownDotsHorizontal" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
  <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
</button>
<div id="dropdownDotsHorizontal" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
<label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />    
</div>
                </td>
            </tr>
            <tr>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                
                </th>
                <td className="px-6 py-4">
                
                </td>
                <td className="px-6 py-4">
                
                </td>
                <td> <button id="dropdownMenuIconHorizontalButton" data-dropdown-toggle="dropdownDotsHorizontal" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
  <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
</button>
<div id="dropdownDotsHorizontal" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
<label className="block mb-2 text-sm font-medium text-black-100 dark:text-black">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  className="bg-white-50 border border-white-300 text-black-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 bg-white-700 border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
</div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
    </>
  );
=======
	const [open, setOpen] = useState(false);
	const { data: userData } = useMe();
	const { loading, data: reservationsData } = useReservation();

	return (
		<div className='h-screen'>
			{loading && <div className='text-3xl'>......loading</div>}
			{!loading && (
				<>
					<div className='h-full flex justify-end items-end'>
						<Container
							maxWidth='md'
							className='h-full flex justify-center items-center flex-col'>
							<Box className='mt-20'>
								<Typography
									variant='h3'
									gutterBottom>
									Welcome Back, {userData?.user.first_name}
								</Typography>
							</Box>
							<Grid
								container
								spacing={1}
								sx={{
									marginBottom: 2,
								}}>
								<Grid
									item
									xs={12}
									sm={4}>
									<Box
										sx={{
											bgcolor: 'background.paper',
											color: 'secondary.contrastText',
											borderRadius: '5px',
											p: 4,
										}}>
										primary.main
									</Box>
								</Grid>
								<Grid
									item
									xs={12}
									sm={4}>
									<Box
										sx={{
											bgcolor: 'background.paper',
											color: 'secondary.contrastText',
											borderRadius: '5px',
											p: 4,
										}}>
										secondary.main
									</Box>
								</Grid>
								<Grid
									item
									xs={12}
									sm={4}>
									<Box
										sx={{
											bgcolor: 'background.paper',
											color: 'secondary.contrastText',
											borderRadius: '5px',
											p: 4,
										}}>
										error.main
									</Box>
								</Grid>
							</Grid>
							{/** pending reservation */}
							{!reservationsData && (
								<Box
									className='w-full h-1/3 flex justify-center items-center'
									component={'div'}
									sx={{
										bgcolor: 'background.paper',
										borderRadius: '5px',
									}}>
									<div className='h-full w-full'>
										<div className='flex justify-between w-full'>
											<h1 className='text-xl font-bold'>Reservation</h1>
											<Link to='/reservation-form'>
												<button className='btn'>+ New</button>
											</Link>
										</div>
										<div className='w-full h-2/3 flex justify-center items-center flex-col text-xl'>
											<span>No Current Reservation List</span>
											<span>You can change the paragraph</span>
										</div>
									</div>
								</Box>
							)}
							{reservationsData && (
								<Box
									className='w-full flex justify-center items-center'
									component={'div'}>
									<div className='h-full w-full'>
										<div className='flex justify-between w-full mb-2'>
											<h1 className='text-xl font-bold'>Peinding</h1>
											<Link to='/reservation-form'>
												<button className='btn'>+ New</button>
											</Link>
										</div>
										<div className='w-full h-2/3 flex justify-center items-center flex-col text-xl'>
											<TableContainer
												component={Paper}
												className='h-full bg-white rounded-lg'>
												<Table aria-label='collapsible table'>
													<TableHead>
														<TableRow>
															<TableCell />
															<TableCell>Date</TableCell>
															<TableCell>Time</TableCell>
															<TableCell align='left'>Type</TableCell>
															<TableCell align='left'>Address</TableCell>
															<TableCell align='left'>Status</TableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{reservationsData
															.filter(
																(reservation: IReservation) =>
																	reservation.is_confirmed === 1
															)
															.map((reservation: IReservation) => (
																<ReservationTableRow
																	key={reservation.id}
																	type={reservation.type}
																	date={reservation.date}
																	description={reservation.description}
																	is_confirmed={reservation.is_confirmed}
																/>
															))}
													</TableBody>
												</Table>
											</TableContainer>
										</div>
									</div>
								</Box>
							)}
							{/**History reservation */}
							<Box className='w-full mb-20'>
								<div className='mt-4 mb-4'>
									<h1 className='text-xl font-bold mb-2'>History</h1>
								</div>
								<TableContainer
									component={Paper}
									className='h-full bg-white rounded-md'>
									<Table aria-label='collapsible table'>
										<TableHead>
											<TableRow>
												<TableCell />
												<TableCell>Date</TableCell>
												<TableCell>Time</TableCell>
												<TableCell align='left'>Type</TableCell>
												<TableCell align='left'>Address</TableCell>
												<TableCell align='left'>Status</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{reservationsData?.map((reservation: IReservation) => (
												<ReservationTableRow
													key={reservation.id}
													type={reservation.type}
													date={reservation.date}
													description={reservation.description}
													is_confirmed={reservation.is_confirmed}
												/>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</Box>
						</Container>
					</div>
				</>
			)}
		</div>
	);
>>>>>>> 20041a8f8b49363b6849a72b2820e70f328bf403
};
