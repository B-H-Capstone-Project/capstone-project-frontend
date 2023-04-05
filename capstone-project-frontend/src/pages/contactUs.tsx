/** @format */

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocationOnIcon from '@mui/icons-material/LocationOn'
const FORM_ENDPOINT = '';

export const ContactUs = () => {
	return (
		<div className='w-full h-screen flex flex-col'>
			<Box
				sx={{
					backgroundImage: 'url(https://www.linkpicture.com/q/2-1_14.jpg)',
					backgroundSize: 'cover',
					flex: 1,
          backgroundPosition: 'center',
				}}></Box>
			<Box sx={{ flex: 1, display: 'flex', width: '100%' }}>
				<Box
					sx={{
						flex: 1,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
            margin: '10vw'
					}}>
					<div>
						<div className='text-3xl mb-5'>
							<h1>CONTACT</h1>
						</div>
						<h2 className='mb-5'>
							<PhoneIcon sx={{ marginRight: '1vw'}}/>
							403-630-1277
						</h2>
						<h2 className='mb-5'>
							<AlternateEmailIcon sx={{ marginRight: '1vw'}} />
							info@bossandhoss.com
						</h2>
						<h3 className='mb-5'>
							<LocationOnIcon sx={{ marginRight: '1vw'}} />
							3420 Temple Road NE, Calgary, AB T1Y 3A9, Canada
						</h3>
					</div>
				</Box>
				<Box sx={{ flex: 1 }}>

				</Box>
			</Box>
		</div>
	);
};
