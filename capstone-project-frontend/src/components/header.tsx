/** @format */

import React from 'react';
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
} from '@mui/material';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useAppDispatch } from '../redux/hook';
import { signOut } from '../redux/reducer/authSlice';

export const Header = () => {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};
	const dispatch = useAppDispatch();
	const isAuth = useSelector((state: RootState) => state.auth);
	const navItems = ['About', 'Rewards', 'Contact'];
	const drawer = (
		<Box
			onClick={handleDrawerToggle}
			sx={{ textAlign: 'center' }}>
			<Divider />
			<List>
				{navItems.map((item) => (
					<ListItem
						key={item}
						disablePadding>
						<ListItemButton sx={{ textAlign: 'center' }}>
							<ListItemText primary={item} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<Box>
			<CssBaseline />
			<AppBar
				sx={{
					bgcolor: 'white',
				}}
				component='nav'
				color='transparent'
				elevation={0}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{
							mr: 2,
							display: {
								sm: 'none',
								xs: 'flex',
								width: '100%',
								justifyContent: 'space-between',
							},
						}}>
						<div className='text-3xl font-bold'>
							<NavLink to={'/'}>B&H</NavLink>
						</div>
						<MenuIcon fontSize='large' />
					</IconButton>

					<Box
						sx={{
							width: '100%',
							display: { xs: 'none', sm: 'flex' },
							justifyContent: 'space-between',
						}}>
						<div className='text-3xl font-bold'>
							<NavLink to={'/'}>B&H</NavLink>
						</div>
						<div className='flex justify-center items-center'>
							<div className='text-xs mr-10'>
								<NavLink to='/about'>ABOUT</NavLink>
							</div>
							<div className='text-xs mr-10'>
								<NavLink to='/our-work'>OUR WORK</NavLink>
							</div>
							<div className='text-xs mr-10'>
								<NavLink to='/contact-us'>CONTACT US</NavLink>
							</div>

							{!isAuth.isLoggedIn ? (
								<NavLink to='signin'>
									<Button
										variant='contained'
										size='large'
                    sx={{
                      bgcolor: 'black',
                      '&:hover': {
                        backgroundColor: '#424242',
                      },
                    }}
										component='label'>
										SIGN IN
									</Button>
								</NavLink>
							) : (
								<NavLink to='/'>
									<Button
										onClick={() => dispatch(signOut())}
										variant='contained'
										size='large'
										component='label'
										sx={{
											fontWeight: '800',
											fontSize: '0.9rem',
                      bgcolor: 'black',
                      '&:hover': {
                        backgroundColor: '#424242',
                      },
										}}>
										SIGN OUT
									</Button>
								</NavLink>
							)}
						</div>
					</Box>
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
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: '80%',
						},
					}}>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	);
};
