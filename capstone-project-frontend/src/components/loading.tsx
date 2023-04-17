/** @format */
import React from 'react';
import { ClipLoader } from 'react-spinners';
import { Box } from '@mui/material';

export const Loading = () => {
	return (
		<Box
			sx={{
				backgroundColor: '#EDFAD6',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: '100vw',
				height: '100vh',
			}}>
			<ClipLoader
				color={'black'}
				size={150}
			/>
		</Box>
	);
};
