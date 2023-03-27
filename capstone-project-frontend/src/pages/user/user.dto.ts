/** @format */

export interface meQuery {
  user: meQuery_me;
}
export interface meQuery_me {
<<<<<<< HEAD
	id: string;
  email: string;
  is_active: boolean;
  first_name: string;
  last_name: string;
  password: string;
  role: number;
  phone_number: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  profile: string;
=======
	id: number;
	email: string;
	password: string;
	first_name: string;
	last_name: string;
  city: string;
	phone_number: string;
	address_line1: string;
	address_line2: string;
	postal_code: string;
	province: string;
	country: string;
	profile: string;
	is_active: number;
	role: number;
>>>>>>> 46c8482 (Added User Dashboard)
}
