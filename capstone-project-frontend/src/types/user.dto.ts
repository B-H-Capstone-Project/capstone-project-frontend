/** @format */

export interface meQuery {
  user: meQuery_me;
}
export interface meQuery_me {
	id: number;
  created_date: string;
	email: string;
	password: string;
	first_name: string;
	last_name: string;
	phone_number: string;
	address_line1: string;
	address_line2: string;
	postal_code: string;
	province: string;
	country: string;
	profile: string;
  city: string;
	is_active: number;
	role: number;
  is_verified: number;
}

