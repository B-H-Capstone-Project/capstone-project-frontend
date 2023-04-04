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
import { NavLink } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useAppDispatch } from '../redux/hook';
import { signOut } from '../redux/reducer/authSlice';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

//customer routes
const loggedOutNav = [
	{
		path: '/contact-us',
		name: 'CONTACT US',
	},
];

//customer routes
const loggedInNav = [
	{
		path: '/reservation',
		name: 'RESERVATION',
	},
];

export const Header = () => {
	const [openMobieMenu, setOpenMobileMenu] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const [mobileOpen, setMobileOpen] = useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};
	const handleClickOurWork = () => {
		setOpenMobileMenu(!openMobieMenu);
	};
	const dispatch = useAppDispatch();
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
					<ListItemButton sx={{ textAlign: 'center' }}>
						<NavLink to='/contact-us'>CONTACT US</NavLink>
					</ListItemButton>
					<ListItemButton onClick={handleClickOurWork}>
						<ListItemText primary='OUR WORK' />
						{openMobieMenu ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse
						in={openMobieMenu}
						timeout='auto'>
						<List
							component='div'
							disablePadding>
							<ListItemButton>
								<ListItemText primary='Residential Irrigation' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Commercial Irrigation' />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary='Outdoor Irrigation' />
							</ListItemButton>
						</List>
					</Collapse>
					{loggedIn &&
						loggedInNav.map((item) => (
							<ListItemButton>
								<NavLink to={item.path}>{item.name}</NavLink>
							</ListItemButton>
						))}
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
								justifyContent: 'space-between',
							},
						}}>
						<div className='text-3xl font-bold mt-2'>
							<NavLink to={'/'}>B&H</NavLink>
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
							justifyContent: 'space-between',
						}}>
						<div className='text-3xl font-bold'>
							<NavLink to={'/'}>B&H</NavLink>
						</div>
						<div className='flex justify-center items-center'>
							<div className='text-xs mr-10'>
								<Button
									sx={{ color: 'black' }}
									id='fade-button'
									aria-controls={open ? 'fade-menu' : undefined}
									aria-haspopup='true'
									aria-expanded={open ? 'true' : undefined}
									onClick={handleClick}>
									OUR WORK
								</Button>
								<Menu
									id='fade-menu'
									MenuListProps={{
										'aria-labelledby': 'fade-button',
									}}
									anchorEl={anchorEl}
									open={open}
									onClose={handleClose}
									TransitionComponent={Fade}>
									<MenuItem onClick={handleClose}>
										<NavLink to='/our-work'>Residential Irrigation</NavLink>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<NavLink to='/our-work'>Commercial Irrigation</NavLink>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<NavLink to='/our-work'>Outdoor Irrigation</NavLink>
									</MenuItem>
								</Menu>
							</div>
							{loggedIn &&
								loggedInNav.map((item) => (
									<div className='text-xs mr-10'>
										<Button>
											<NavLink to={item.path}>{item.name}</NavLink>
										</Button>
									</div>
								))}
							{loggedOutNav.map((item) => (
								<div className='text-xs mr-10'>
									<Button sx={{ color: 'black' }}>
										<NavLink to={item.path}>{item.name}</NavLink>
									</Button>
								</div>
							))}
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
                      color: 'white'
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
											color: 'white',
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
							width: '90%',
						},
					}}>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	);
};
