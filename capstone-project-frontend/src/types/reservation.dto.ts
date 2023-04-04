export interface IReservation {
  id: number;
  user_id: number;
  type: string;
  date: string;
  description: string;
  is_confirmed: number;
  created_date: string;
  address_line1: string;
	address_line2: string;
	postal_code: string;
	province: string;
	country: string;
  city: string;
}

export interface IReservationInput {
  type: string;
  date?: string;
  description: string;
  address_line1: string;
	address_line2: string;
	postal_code: string;
	province: string;
	country: string;
  city: string;
}