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
};
