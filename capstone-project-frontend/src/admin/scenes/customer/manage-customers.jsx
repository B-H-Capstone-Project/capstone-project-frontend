import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Customers from "./customers";
import { useLocation } from "react-router";
import "./manage-customers.css";

//modal
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CustomerModal from "./create-customer-modal";

const ManageCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const { search } = useLocation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true, console.log('handleOpen'));
  const handleClose = () => setOpen(false);

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
          <Button
          onClick={handleOpen}
										variant='contained'
										size='large'
                    sx={{
                      bgcolor: 'black',
                      '&:hover': {
                        backgroundColor: '#424242',
                      },
                    }}
										component='label'>
										+ Add
									</Button>
          </div>
        </div>
        <div className='manage_customers_component'>
        <Customers customers={customers} />
        </div>
      </div>
      <CustomerModal open={open} onClose={handleClose}/> 
    </>
  );
};
export default ManageCustomers;
