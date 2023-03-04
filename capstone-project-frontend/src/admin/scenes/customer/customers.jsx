import React from "react";
import Customer from "./customer";
import "./customers.css";
import PropTypes from 'prop-types';

// interface ICustomerForm {
//   id: string,
//   profile: string,
// 	first_name: string,
// 	last_name: string,
// 	phone_number: string,
// 	email: string,
// 	password: string,
// 	confirm_password: string,
// 	address_line1: string,
// 	address_line2: string,
// 	postal_code: string,
// 	city: string,
// 	province: string,
// 	country: string,
//   role: number,
//   is_active: boolean,
// }

// interface ICustomersProps {
//   customers: ICustomerForm[];
// }

// Customers.propTypes = {
//   customers: PropTypes.arrayOf(PropTypes.shape(any))
// }

export default function Customers({customers}) {
  return (
    <>
      <table className="customers_table">
        <thead>
          <tr className="customers_table_td">
            <td className="customers_table_td">| ID</td>
            <td className="customers_table_td">| Profile</td>
            <td className="customers_table_td">| Email</td>
            <td className="customers_table_td">| Name</td>
            <td className="customers_table_td">| Phone</td>
            <td className="customers_table_td">| Address</td>
            <td className="customers_table_td">| City</td>
            <td className="customers_table_td">| Province</td>
            <td className="customers_table_td">| Postal Code</td>
            <td className="customers_table_td">| Country</td>
            <td className="customers_table_td">| Role</td>
            <td className="customers_table_td">| Active</td>
            <td className="customers_table_td">| Actions</td>
          </tr>
        </thead>
      </table>
      <div className="customers">
        {customers.map((c) => (
          <Customer key={c.id} customerprop={c} />
        ))}
      </div>
    </>
  );
}
