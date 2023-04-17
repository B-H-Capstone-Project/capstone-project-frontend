/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import { useMe } from '../../hooks/useMe';
import { Avatar, Box, Container, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useReservation } from '../../hooks/useReservation';
import { IReservationOutput } from '../../types/reservation.dto';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { ReservationTableRow } from '../../components/reservation-row';
import { Loading } from '../../components/loading';

const steps = ['Pending', 'Confirmed', 'Review your service'];

export const Reservation = () => {
	const { data: userData } = useMe();
	const { loading, data: reservationsData } = useReservation();
	const newReservationStatus =
		reservationsData && reservationsData.length !== 0
			? reservationsData[reservationsData.length - 1].is_confirmed - 1
			: 2;

	const newReservation =
		reservationsData && reservationsData[reservationsData?.length - 1];
	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Container
					maxWidth='md'
					sx={{
						mb: 4,
						height: '100vh',
						marginTop: '5vw',
            marginBottom: '10vh'
					}}>
					<div className='flex w-full h-full flex-col'>
						<div>
							<Typography
								variant='h6'
								color='inherit'
								noWrap>
								Welcome back, {userData?.user.first_name}
							</Typography>
							<Stepper
								sx={{ pt: 3, pb: 5 }}
								activeStep={newReservationStatus}
								alternativeLabel>
								{steps.map((label) => (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
									</Step>
								))}
							</Stepper>
						</div>
						<div className='flex w-full h-1/2 sm:h-2/3 md:flex-col'>
							<Box
								className='w-1/2 flex mr-5 justify-center items-center md:w-full md:h-full'
								component={'div'}
								sx={{
									bgcolor: 'background.paper',
									borderRadius: '5px',
									color: 'text.secondary',
								}}>
								<div className='flex h-1/2 justify-center items-center flex-col w-full'>
									<Avatar
										sx={{ width: 88, height: 88, marginBottom: '2vh' }}
										src={userData?.user.profile}
									/>
									<Typography
										variant='inherit'
										align='center'>
										{userData?.user.first_name + ' ' + userData?.user.last_name}
									</Typography>

									<div className='mt-5 md:mt-2'>
										<Link to='/edit-profile'>
											<button className='btn'>Edit profile</button>
										</Link>
									</div>
								</div>
							</Box>
							{/** No Reservation */}
							{/** all reservation is finished*/}
							{reservationsData?.length === 0 || newReservationStatus === 3 ? (
								<Box
									className='w-1/2 flex mr-5 justify-center items-center md:w-full md:h-full'
									component={'div'}
									sx={{
										bgcolor: 'background.paper',
										borderRadius: '5px',
										color: 'text.secondary',
									}}>
									<div className='w-full h-1/2 flex justify-center items-center flex-col text-xl mt-20'>
										<div className='basis-1/2 flex justify-center flex-col sm:text-sm'>
											<Typography
												variant='h6'
												align='center'>
												No Current Reservation List
											</Typography>
											<Typography
												variant='h6'
												align='center'>
												You can change the paragraph
											</Typography>
										</div>
										<div className='basis-1/2'>
											<Link to='/reservation-form'>
												<button className='btn text-md mt-5 sm:mb-5'>
													+ New
												</button>
											</Link>
										</div>
									</div>
								</Box>
							) : (
								<Box
									className='w-1/2 flex justify-center items-center flex-col md:w-full sm:hidden'
									component={'div'}
									sx={{
										bgcolor: 'background.paper',
										borderRadius: '5px',
									}}>
									<div className='w-full h-full p-5'>
										<div className='flex justify-between'>
											<Typography variant='h6'>
												{newReservation?.type}
											</Typography>{' '}
											<Link to='/reservation-form'>
												<AddCircleIcon />
											</Link>
										</div>
										<div className='w-full'>
											<Typography
												className='mr-10'
												variant='subtitle1'
												sx={{ color: 'text.secondary' }}>
												{newReservation?.date.split('T')[0]}
											</Typography>
											<Typography
												variant='subtitle2'
												sx={{ color: 'text.secondary' }}>
												{newReservation?.description}
											</Typography>
										</div>

										<div>
											<Typography sx={{ color: 'text.secondary' }}>
												{' '}
												{newReservation?.address_line1 +
													' ' +
													newReservation?.address_line2 +
													' , ' +
													newReservation?.city +
													' , ' +
													newReservation?.country +
													' , ' +
													newReservation?.country +
													' , ' +
													newReservation?.postal_code}
											</Typography>
										</div>
										<div className='h-1/3 w-1/2'>
											<img src={newReservation?.files} />
										</div>
									</div>
									<Typography
										variant='subtitle2'
										sx={{ color: 'text.secondary', marginBottom: '10px' }}>
										Your current reservation detail
									</Typography>
								</Box>
							)}
						</div>
						{/**History reservation */}
						<Box className='w-full h-1/2 sm:h-1/3'>
							<div className='mt-4 mb-4'>
								<h1 className='text-xl font-bold mb-2'>History</h1>
							</div>
							{reservationsData?.length === 0 || !reservationsData ? (
								<div>
									<Typography sx={{ color: 'text.secondary' }}>
										Your reservation history is Empty
									</Typography>
								</div>
							) : (
								<TableContainer
									sx={{ maxHeight: 400  }}
									component={Paper}
									className='bg-white rounded-md'>
									<Table
										aria-label='collapsible table'
										size='small'>
										<TableHead>
											<TableRow>
												<TableCell />
												<TableCell>Date</TableCell>
												<TableCell>Time</TableCell>
												<TableCell align='left'>Type</TableCell>
												<TableCell align='left'>Status</TableCell>
											</TableRow>
										</TableHead>
										{reservationsData?.length !== 0 &&
											reservationsData?.map(
												(reservation: IReservationOutput) => (
													<TableBody>
														<ReservationTableRow
															key={reservation.id}
															type={reservation.type}
															date={reservation.date}
															description={reservation.description}
															is_confirmed={reservation.is_confirmed}
															img={reservation.files}
														/>
													</TableBody>
												)
											)}
									</Table>
								</TableContainer>
							)}
						</Box>
					</div>
				</Container>
			)}
		</>
	);
};
