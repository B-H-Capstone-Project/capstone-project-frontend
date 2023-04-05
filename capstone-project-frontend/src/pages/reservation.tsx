/** @format */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import { Avatar, Box, Container, Typography } from '@mui/material';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import { useReservation } from '../hooks/useReservation';
import { IReservation } from '../types/reservation.dto';
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
import { ReservationTableRow } from '../components/reservation-row';

const steps = ['Pending', 'Confirmed', 'Review your service'];

export const Reservation = () => {
	const [open, setOpen] = useState(false);
	const { data: userData } = useMe();
	const { loading, data: reservationsData } = useReservation();
	const newReservationStatus = reservationsData?.length !== 0 && reservationsData
		? reservationsData[reservationsData?.length].is_confirmed - 1
		: 0;
	const newReservation =
		reservationsData && reservationsData[reservationsData?.length - 1];
	return (
		<Container
			maxWidth='md'
			sx={{
				mb: 4,
				height: '100vh',
				marginTop: '5vw',
			}}>
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
			<div className='flex w-full h-1/3 sm:flex-col'>
				<Box
					className='w-1/2 h-full flex mr-5 justify-center items-center'
					component={'div'}
					sx={{
						bgcolor: 'background.paper',
						borderRadius: '5px',
						color: 'text.secondary',
					}}>
					<div className='h-2/3 flex justify-center items-center flex-col w-full'>
						<div className='basis-2/3 flex justify-center flex-col'>
							<Avatar
								sx={{ width: 88, height: 88, marginBottom: '2vh' }}
								src={userData?.user.profile}
							/>
							<Typography
								variant='inherit'
								align='center'>
								{userData?.user.first_name + ' ' + userData?.user.last_name}
							</Typography>
						</div>
						<div className='basis-1/3'>
							<Link to='/edit-profile'>
								<button className='btn'>Edit profile</button>
							</Link>
						</div>
					</div>
				</Box>

				{/** No Reservation */}
				{reservationsData?.length === 0 && (
					<Box
						className='w-1/2 h-full flex mr-5 justify-center items-center'
						component={'div'}
						sx={{
							bgcolor: 'background.paper',
							borderRadius: '5px',
						}}>
						<div className='w-full h-2/3 flex justify-center items-center flex-col text-xl'>
							<div className='basis-2/3 flex justify-center flex-col'>
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
							<div className='basis-1/3'>
								<Link to='/reservation-form'>
									<button className='btn'>+ New</button>
								</Link>
							</div>
						</div>
					</Box>
				)}
				{/** all reservation is finished*/}
				{newReservationStatus === 3 && (
					<Box
						className='w-1/2 h-full flex mr-5 justify-center items-center'
						component={'div'}
						sx={{
							bgcolor: 'background.paper',
							borderRadius: '5px',
						}}>
						<div className='w-full h-2/3 flex justify-center items-center flex-col text-xl'>
							<div className='basis-2/3 flex justify-center flex-col'>
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
							<div className='basis-1/3'>
								<Link to='/reservation-form'>
									<button className='btn'>+ New</button>
								</Link>
							</div>
						</div>
					</Box>
				)}
				{/** there is a processing of reservation*/}
				{newReservationStatus !== 2 && (
					<Box
						className='w-1/2 flex justify-center items-center flex-col'
						component={'div'}
						sx={{
							bgcolor: 'background.paper',
							borderRadius: '5px',
						}}>
						<div className='w-full h-full p-5 '>
							<div>
								<div className='flex w-full justify-between '>
									<Typography variant='h6'>{newReservation?.type}</Typography>
									<Typography
										className='mr-10'
										variant='subtitle1'
										sx={{
											color: 'text.secondary',
										}}>
										{newReservationStatus === 0 ? 'Pending' : 'Confirmed'}
									</Typography>
								</div>
								<Typography
									className='mr-10'
									variant='subtitle1'
									sx={{ color: 'text.secondary' }}>
									<DateRangeOutlinedIcon sx={{ marginRight: '10px' }} />
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
									<AssignmentIndOutlinedIcon sx={{ marginRight: '10px' }} />
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
						</div>
						<Typography
							variant='subtitle2'
							sx={{ color: 'text.secondary' }}>
							Your current reservation detail
						</Typography>
					</Box>
				)}
			</div>
			{/**History reservation */}
			<Box className='w-full'>
				<div className='mt-4 mb-4'>
					<h1 className='text-xl font-bold mb-2'>History</h1>
				</div>
				{reservationsData?.length === 0 && (
					<div>
						<Typography>Your reservation history is Empty</Typography>
					</div>
				)}
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
								<TableCell align='left'>Status</TableCell>
							</TableRow>
						</TableHead>
						{reservationsData?.length !== 0 &&
							reservationsData?.map((reservation: IReservation) => (
								<TableBody>
									<ReservationTableRow
										key={reservation.id}
										type={reservation.type}
										date={reservation.date}
										description={reservation.description}
										is_confirmed={reservation.is_confirmed}
									/>
								</TableBody>
							))}
					</Table>
				</TableContainer>
			</Box>
		</Container>
	);
};
