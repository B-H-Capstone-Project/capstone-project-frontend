/** @format */

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { Avatar, Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { signOut } from '../redux/reducer/authSlice';
import { useAppDispatch } from '../redux/hook';
import { useMe } from '../hooks/useMe';

interface IList {
	name: string;
	path: string;
}

interface IHeaderMenu {
	title: string;
	list: IList[];
}

export const HeaderMenu = ({ title = '', list }: IHeaderMenu) => {
  const { data } = useMe();
	const dispatch = useAppDispatch();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div className='flex'>
			{title === 'user' && (
				<>
					<Box
						aria-controls={open ? 'fade-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
						sx={{
							'&:hover': {
								background: 'none',
							},
						}}>
						<Avatar
							src={data?.user.profile}
							sx={{ width: 48, height: 48 }}
						/>
					</Box>
					<Menu
						id='fade-menu'
						MenuListProps={{
							'aria-labelledby': 'fade-button',
						}}
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						TransitionComponent={Fade}>
						{list.map((i) => (
							<MenuItem onClick={handleClose}>
								<Link to={i.path}>{i.name}</Link>
							</MenuItem>
						))}
						<MenuItem onClick={() => dispatch(signOut())}>Sign Out</MenuItem>
					</Menu>
				</>
			)}
			{title !== 'user' && (
				<>
					<Button
						sx={{ color: 'black' }}
						id='fade-button'
						aria-controls={open ? 'fade-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}>
						{title}
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
						{list.map((i) => (
							<MenuItem onClick={handleClose}>
								<Link to={i.path}>{i.name}</Link>
							</MenuItem>
						))}
					</Menu>
				</>
			)}
		</div>
	);
};
