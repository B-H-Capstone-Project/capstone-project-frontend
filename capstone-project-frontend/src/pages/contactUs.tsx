/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Header } from '../components/header';

const FORM_ENDPOINT = '';

export const ContactUs = () => {
	const [submitted, setSubmitted] = useState(false);
	const handleSubmit = () => {
		setTimeout(() => {
			setSubmitted(true);
		}, 100);
	};

	if (submitted) {
		return (
			<>
				<div className='text-2xl'>Thank you!</div>
				<div className='text-md'>We'll be in touch soon.</div>
			</>
		);
	}
	return (
		<>
			<Header />
			<div>
				<img
					className='inline'
					src='...'
					alt='...'></img>
				<div className='flex justify-center'>
					<h1>CONTACT:</h1>
				</div>
				<div className='py-2 px-14 flex justify-center'>
					<h2>403-630-1277</h2>
				</div>
				<div className='py-2 px-14 flex justify-center'>
					<h2>
						<a href='mailto:info@bossandhoss.com'>info@bossandhoss.com</a>
					</h2>
				</div>
				<div className='py-2 px-14 flex justify-center'>
					<h2>
						<Link to={'/Instagram'}>Boss and Hoss Instagram</Link>
					</h2>
				</div>
				<div className='flex justify-center'>
					<h1>OFFICE:</h1>
				</div>
				<div className='py-2 px-14 flex justify-center'>
					<h3>3420 Temple Road NE</h3>
				</div>
				<div className='py-2 px-14 flex justify-center'>
					<h3>Calgary, AB T1Y 3A9, Canada</h3>
				</div>
			</div>
		</>
	);
};
