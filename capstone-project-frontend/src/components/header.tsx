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
} from '@mui/material';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useAppDispatch } from '../redux/hook';
import { signOut } from '../redux/reducer/authSlice';

//customer routes
const loggedOutNav = [
	{
		path: '/our-work',
		name: 'OUR WORK',
	},
	{
		path: '/contact-us',
		name: 'CONTACT US',
	},
];

//customer routes
const loggedInNav = [
	{
		path: '/our-work',
		name: 'OUR WORK',
	},
	{
		path: '/contact-us',
		name: 'CONTACT US',
	},
	{
		path: '/reservation',
		name: 'RESERVATION',
	},
];

export const Header = () => {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};
	const dispatch = useAppDispatch();
	const isAuth = useSelector((state: RootState) => state.auth);
	const loggedIn = isAuth.isLoggedIn;

	const drawer = (
		<Box
			onClick={handleDrawerToggle}
			sx={{ textAlign: 'center' }}>
			<Divider />
			<List>
				{loggedIn &&
					loggedInNav.map((item) => (
						<ListItem
							key={item.name}
							disablePadding>
							<ListItemButton sx={{ textAlign: 'center' }}>
								<NavLink to={item.path}>{item.name}</NavLink>
							</ListItemButton>
						</ListItem>
					))}
				{loggedOutNav.map((item) => (
					<ListItem
						key={item.name}
						disablePadding>
						<ListItemButton sx={{ textAlign: 'center' }}>
							<NavLink to={item.path}>{item.name}</NavLink>
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
					bgcolor: 'inherit',
				}}
				position='static'
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
							{loggedIn &&
								loggedInNav.map((item) => (
									<div className='text-xs mr-10'>
										<NavLink to={item.path}>{item.name}</NavLink>
									</div>
								))}
							{!loggedIn &&
								loggedOutNav.map((item) => (
									<div className='text-xs mr-10'>
										<NavLink to={item.path}>{item.name}</NavLink>
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
							width: '90%',
						},
					}}>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	);
};

function Row() {
	return;
}
