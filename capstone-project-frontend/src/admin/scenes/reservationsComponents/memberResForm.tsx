
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'

interface ICustomer {
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    address_line1: string;
    address_line2?: string;
    postal_code: string;
    city: string;
    province: string;
    country: string;
  }

const MemberResForm = (props: any) => {
    const [customer, setCustomer] = React.useState<ICustomer>();
    const handleChange = (e:SelectChangeEvent<any>) => {
        setCustomer(JSON.parse(e.target.value));
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
        {customer ? 
        <div>
        <p>{customer?.first_name+`, `+customer?.last_name}</p>
        <p>{`Email: `+customer?.email}</p>
        <p>{`Phone Number: `+customer?.phone_number}</p>
        <p>{customer?.address_line1}</p>
        <p>{customer?.address_line2}</p>
        <p>{customer?.postal_code}</p>
        <p>{customer?.city+`, `+customer?.province+`, `+customer?.country}</p>
        </div> : null
      }
    </div>
  )
}
export default MemberResForm