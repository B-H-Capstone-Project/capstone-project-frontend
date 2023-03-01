
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'

interface ICustomer {
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
    confirm_password: string;
    address_line: string;
    unit_number?: string;
    postal_code: string;
    city: string;
    province: string;
    country: string;
  }

const MemberResForm = (props: any) => {
    const [customer, setCustomer] = React.useState<ICustomer>();
    const handleChange = (e:SelectChangeEvent<any>) => {
        setCustomer(JSON.parse(e.target.value));
        // setCustomer(customer);
        console.log(customer?.first_name);
      };
  return (
    <div>
        <InputLabel id="demo-simple-select-standard-label">Customer List</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={props.customer}
        //   (event: SelectChangeEvent<any>, child: ReactNode) => void
          onChange={handleChange}
          label="Age"
        >
          {props.customers.map((customer:ICustomer) => (
            <MenuItem key={customer.id} value={JSON.stringify(customer)}>{customer.first_name} {customer.last_name}</MenuItem>
            ))}
        </Select>
        <p>{customer?.first_name},{customer?.last_name}</p>
    </div>
  )
}

export default MemberResForm