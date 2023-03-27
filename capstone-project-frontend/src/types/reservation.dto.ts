export interface IReservation {
  id: number;
  user_id: number;
  type: string;
  date: string;
  description: string;
  is_confirmed: number;
  created_date: string;
}
