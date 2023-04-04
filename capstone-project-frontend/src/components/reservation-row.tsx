/** @format */

import React from 'react';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Typography from '@mui/material/Typography';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Collapse, TableCell, TableRow } from '@mui/material';

interface IReservationTableRow {
	type: string;
	date?: string;
	description: string;
	is_confirmed: number;
}

export const ReservationTableRow: React.FC<IReservationTableRow> = ({
	type,
	date,
	description,
	is_confirmed,
}) => {
	const [open, setOpen] = React.useState(false);
  console.log(date + "-------------");
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
					{date &&
						date
							.split('T')[0]
							.split('-')
							.map((value, index) => (index !== 2 ? value + ' / ' : value))}
				</TableCell>
        <TableCell>
        {date &&
						date
							.split('T')[1]
							.split(':')
							.map((value, index) => {
								if (index === 0) {
									return +value+6 / 12 > 1 ? "PM "+((+value+6) % 12)+ ' : ' : "AM "+((+value+6) % 12)+ ' : ';
								}
								if (index === 1) {
									return value;
								}
							})}
        </TableCell>
				<TableCell align='left'>{type}</TableCell>
				<TableCell align='left'>
					{is_confirmed === 1 && 'Pending'}
					{is_confirmed === 2 && 'Confirmed'}
					{is_confirmed === 3 && 'Done'}
				</TableCell>
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
								Description
							</Typography>
							<div>{description}</div>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
};
