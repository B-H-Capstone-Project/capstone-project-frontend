/** @format */

import { useEffect } from 'react';
import { useState } from 'react';
import axios from '../../api/axios';

const Customers = () => {
	const [customers, setCustomers] = useState([]);

	useEffect(() => {
		const fecthAllCustomers = async () => {
			try {
				const res = await axios.get('/users/customer');
				setCustomers(res.data.users);

				console.log('-------frontend customer.tsx-------');
				console.log(res.data.users);
			} catch (err) {
				console.log(err);
			}
		};
		fecthAllCustomers();
	}, []);

	return (
		<>
			<div>
				<h1>Customers</h1>
				<br />
				{customers.map((customer) => (
					<div
						className='customer'
						key={customer.id}>
						<h2>
							Name: {customer.first_name} {customer.last_name}
						</h2>
						<h2>Phone Number: {customer.phone_number}</h2>
						<h2>Address: {customer.address_id}</h2>
						<h2>Role: {customer.role}</h2>
						<h2>Active: {customer.is_active}</h2>
						<br></br>
					</div>
				))}
			</div>
		</>
	);
};
export default Customers;
