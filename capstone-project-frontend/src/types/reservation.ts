export interface IReservationForm {
  user_id: number;
  address_line1: string;
  address_line2: string;
  postal_code: string;
  city: string;
  province: string;
  country: string;
  type: string;
  date: string;
  description: string;
}

export default IReservationForm;
