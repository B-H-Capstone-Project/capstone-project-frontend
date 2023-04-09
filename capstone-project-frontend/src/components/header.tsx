/** @format */

import React, { useState } from 'react';
import {
	CssBaseline,
	AppBar,
	Toolbar,
	IconButton,
	Button,
	Drawer,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Collapse,
} from '@mui/material';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { RootState } from '../redux/store';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { HeaderMenu } from './headerMenu';
import { useMe } from '../hooks/useMe';

//customer routes
const loggedOutNav = [
	{
		path: '/contact-us',
		name: 'CONTACT US',
	},
];

export const Header = () => {
	const { data } = useMe();
	const [openMobieMenu, setOpenMobileMenu] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};
	const handleClickOurWork = () => {
		setOpenMobileMenu(!openMobieMenu);
	};

	const isAuth = useSelector((state: RootState) => state.auth);
	const loggedIn = isAuth.isLoggedIn;

	const drawer = (
		<Box>
			<Divider />
			<List component='nav'>
				<ListItem
					key='CONTACT US'
					disablePadding
					sx={{
						display: 'flex',
						flexDirection: 'column',
					}}>
					<ListItemButton sx={{ width: '100%', textAlign: 'left' }}>
						<NavLink to='/contact-us'>CONTACT US</NavLink>
					</ListItemButton>
					<ListItemButton
						onClick={handleClickOurWork}
						sx={{ width: '100%', textAlign: 'left' }}>
						<ListItemText primary='OUR WORK' />
						{openMobieMenu ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse
						in={openMobieMenu}
						timeout='auto'>
						<List
							component='ul'
							disablePadding>
							<ListItemButton>
								<Link to='/our-work/residential-irrigation'>
									<ListItemText primary='Residential Irrigation' />
								</Link>
							</ListItemButton>
							<ListItemButton>
								<Link to='/our-work/commercial-irrigation'>
									<ListItemText primary='Commercial Irrigation' />
								</Link>
							</ListItemButton>
							<ListItemButton>
								<Link to='/our-work/outdoor-irrigation'>
									<ListItemText primary='Outdoor Irrigation' />
								</Link>
							</ListItemButton>
						</List>
					</Collapse>
				</ListItem>
			</List>
		</Box>
	);

	return (
		<Box>
			<CssBaseline />
			<AppBar
				sx={{
					bgcolor: 'inherit',
				}}
				position='static'
				component='nav'
				color='transparent'
				elevation={0}>
				<Toolbar>
					<Box
						sx={{
							display: {
								sm: 'none',
								xs: 'flex',
								width: '100%',
							},
						}}>
						<div className='text-3xl font-bold mt-2 mr-2'>
							<Link to={'/'}>B&H</Link>
						</div>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							edge='start'
							onClick={handleDrawerToggle}>
							<MenuIcon fontSize='large' />
						</IconButton>
					</Box>
					<Box
						sx={{
							width: '100%',
							display: { xs: 'none', sm: 'flex' },
						}}>
						<div className='text-3xl font-bold mr-10'>
							<Link to={'/'}>B&H</Link>
						</div>
						<div className='flex justify-center items-center'>
							<HeaderMenu
								title='OUR WORK'
								list={[
									{
										name: 'Residential Irrigation',
										path: '/our-work/residential-irrigation',
									},
									{
										name: 'Commercial Irrigation',
										path: '/our-work/commercial-irrigation',
									},
									{
										name: 'Outdoor Irrigation',
										path: '/our-work/outdoor-irrigation',
									},
								]}
							/>
							{loggedOutNav.map((item) => (
								<div className='text-xs mr-5'>
									<Button sx={{ color: 'black' }}>
										<Link to={item.path}>{item.name}</Link>
									</Button>
								</div>
							))}
						</div>
					</Box>
					{!isAuth.isLoggedIn ? (
						<Link to='signin'>
              <button className='btn'> 
								SIGNIN
							</button>
						</Link>
					) : (
						<>
							<HeaderMenu
								title='user'
								list={[
									{
										name: 'Edit Profile',
										path: '/edit-profile',
									},
									{
										name: 'Dashboard',
										path: '/reservation',
									},
                  {
										name: 'Reservation',
										path: '/reservation-form',
									},
								]}
							/>
						</>
					)}
				</Toolbar>
			</AppBar>
			<Box component='nav'>
				<Drawer
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					PaperProps={{
						sx: {
							backgroundColor: '#000',
							opacity: '0.8',
							color: '#fff',
							display: { xs: 'block', sm: 'none' },
							'& .MuiDrawer-paper': {
								boxSizing: 'border-box',
								width: '60%',
							},
						},
					}}>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	);
};
