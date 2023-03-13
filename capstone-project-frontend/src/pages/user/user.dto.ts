/** @format */

export interface meQuery {
  user: meQuery_me;
}
export interface meQuery_me {
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
}
