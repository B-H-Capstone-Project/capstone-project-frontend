import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Customers from "./customers";
import { useLocation } from "react-router";
import "./manage-customers.css";

const ManageCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/users/customer" 
        );
        setCustomers(res.data.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCustomers();
  }, []);

  return (
    <>
      <div className="manage_customers">
        <div className="manage_customers_top">
          <h1 className="manage_customers_h1">Manage Customers</h1>
          <div className="customer_add_btn_container">
            <Link className="link" to="/admin/managecustomer/addcustomer">
              <button>+ Add Customer</button>
            </Link>
          </div>
        </div>
        <Customers customers={customers} />
      </div>
    </>
  );
};
export default ManageCustomers;
