/** @format */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Typography from '@mui/material/Typography';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
	Box,
	Collapse,
	Container,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { useReservation } from '../hooks/useReservation';
import { IReservation } from '../types/reservation.dto';

export const Reservation = () => {
	const [open, setOpen] = useState(false);
	const { data: userData } = useMe();
	const { loading, data: reservationsData } = useReservation();

	return (
		<div className='w-full h-screen flex justify-center items-center'>
			<Container
				maxWidth='md'
				className='h-4/5 flex justify-center items-center flex-col bg-red-300'>
				<Box
					height={100}
					width={800}
					display='flex'
					justifyContent='left'
					alignItems='center'
					bgcolor='papayawhip'
					color='black'
					fontSize={24}
					component={'div'}>
					<h1>
						Welcome Back,{' '}
						{userData?.user.first_name ? userData?.user.first_name : ''}
					</h1>
				</Box>
				{/** pending reservation */}
				<Box
					className='w-full h-1/4 '
					component={'div'}>
					{!reservationsData && (
						<Link to='form'>
							<button className='btn'>+ New</button>
						</Link>
					)}
				</Box>
				{reservationsData && (
					<Box>
						<div className='flex justify-between'>
							<h1 className='text-xl'>Reservation</h1>
							<button className='btn'>+New</button>
						</div>
						<div>
							{reservationsData
								.filter(
									(reservation: IReservation) => reservation.is_confirmed === 0
								)
								.map((reservation: IReservation) => (
									<div>{reservation.description}</div>
								))}
						</div>
					</Box>
				)}

				{/**History reservation */}
				<Box className='bg-yellow-300 w-full h-1/2'>
					<h1 className='text-xl'>History</h1>
					<TableContainer component={Paper}>
						<Table aria-label='collapsible table'>
							<TableHead>
								<TableRow>
									<TableCell />
									<TableCell>Date & Time</TableCell>
									<TableCell align='left'>Type</TableCell>
									<TableCell align='left'>Address</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{reservationsData?.map((reservation: IReservation) => (
									<Row
										key={reservation.id}
										reservationInfo={reservation}
									/>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Container>
		</div>
	);
};

function Row(props: { reservationInfo: IReservation }) {
	const { reservationInfo } = props;
	const [open, setOpen] = React.useState(false);

	return (
		<React.Fragment>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell>
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell
					component='th'
					scope='row'>
					{reservationInfo.date}
				</TableCell>
				<TableCell align='left'>{reservationInfo.type}</TableCell>
				<TableCell align='left'>{reservationInfo.description}</TableCell>
			</TableRow>
			{/** open detail  */}
			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={6}>
					<Collapse
						in={open}
						timeout='auto'
						unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography
								variant='h6'
								gutterBottom
								component='div'>
								Detail
							</Typography>
							<Table
								size='small'
								aria-label='purchases'>
								<TableHead>
									<TableRow>
										<TableCell>Date</TableCell>
										<TableCell>Customer</TableCell>
										<TableCell align='right'>Amount</TableCell>
										<TableCell align='right'>Total price ($)</TableCell>
									</TableRow>
								</TableHead>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}
