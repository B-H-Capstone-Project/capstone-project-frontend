interface ICustomer {
  id: number;
  first_name: string;
  last_name: string;
  profile: string;
  phone_number: string;
  email: string;
  address_line1: string;
  address_line2?: string;
  postal_code: string;
  city: string;
  province: string;
  country: string;
}

export default ICustomer;
