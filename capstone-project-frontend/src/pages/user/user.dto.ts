/** @format */

export interface meQuery {
  user: meQuery_me;
}
export interface meQuery_me {
	address_id: string;
	email: string;
	first_name: string;
	id: number;
	is_active: number;
	last_name: string;
	password: string;
	phone_number: number;
	role: number;
}
