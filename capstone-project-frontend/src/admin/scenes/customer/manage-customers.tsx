import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Customers from "./customers";
import Header from "../../components/Header";
import AdminSidebar from "../global/admin-sidebar";
import AdminHeader from "../global/admin-header";
import "./manage-customers.css";

//modal
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CustomerModal from "./create-customer-modal";

const ManageCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/users/customer");
        setCustomers(res.data.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCustomers();
  }, []);

  return (
    <>
      <Box display="flex">
        <AdminSidebar />
        <Box display="flex" flexDirection="column">
          <AdminHeader />
          <Box m="20px" className="content">
            <div className="manage_customers_top">
              <Header title="Manage Customers" subtitle=""/>
              <div className="customer_add_btn_container">
                <Button
                  onClick={handleOpen}
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "black",
                    "&:hover": {
                      backgroundColor: "#424242",
                    },
                  }}
                  component="label"
                >
                  + Add
                </Button>
              </div>
            </div>
            <div className="manage_customers_component">
              <Customers customers={customers} />
            </div>
          </Box>
          <CustomerModal open={open} onClose={handleClose} />
        </Box>
      </Box>
    </>
  );
};
export default ManageCustomers;
