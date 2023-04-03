/** @format */

export interface meQuery {
  user: meQuery_me;
}
export interface meQuery_me {
	id: number;
	email: string;
	password: string;
	first_name: string;
	last_name: string;
	phone_number: number;
	address_line1: string;
	address_line2: string;
	postal_code: string;
	province: string;
	city: string;
	country: string;
	profile: string;
	is_active: number;
	role: number;
}
