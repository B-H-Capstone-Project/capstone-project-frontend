import Customer from "./customer";
import "./customers.css";

export default function Customers({customers}:any) {
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
        {customers.map((c:any) => (
          <Customer key={c.id} customerprop={c} />
        ))}
      </div>
    </>
  );
}
