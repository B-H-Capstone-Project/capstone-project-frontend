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
            <td className="customers_table_td_id">ID</td>
            <td className="customers_table_td_profile">Profile</td>
            <td className="customers_table_td_email">Email</td>
            <td className="customers_table_td_name">Name</td>
            <td className="customers_table_td_phone">Phone</td>
            <td className="customers_table_td_address">Address</td>
            <td className="customers_table_td_city">City</td>
            <td className="customers_table_td_province">Province</td>
            <td className="customers_table_td_postalcode">Postal Code</td>
            <td className="customers_table_td_country">Country</td>
            <td className="customers_table_td_role">Role</td>
            <td className="customers_table_td_active">Active</td>
            <td className="customers_table_td_actions">Actions</td>
          </tr>
        </thead>
      </table>
      <div className="customers_component">
        {customers.map((c) => (
          <Customer key={c.id} customerprop={c} />
        ))}
      </div>
    </>
  );
}
