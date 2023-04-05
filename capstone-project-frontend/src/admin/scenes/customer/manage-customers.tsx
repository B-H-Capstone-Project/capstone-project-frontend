import { useEffect, useState } from "react";
import axios from "axios";
import Customers from "./customers";
import Title from "../../components/title";
import AdminSidebar from "../../components/admin-sidebar";

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
      <Box sx={{ display: "flex", width: "100%"}}>
        <AdminSidebar />
        <Box sx={{ display: "flex", flexDirection: "column"}}>
          <Box sx={{ margin: "20px"}}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: "30vw",
              }}
            >
              <Title title="Manage Customers" subtitle="" />
              <Box sx={{ display: "flex" }}>
                <Button
                  onClick={handleOpen}
                  variant="contained"
                  size="large"
                  sx={{
                    marginRight: "5px",
                    bgcolor: "black",
                    "&:hover": {
                      backgroundColor: "#424242",
                    },
                  }}
                  component="label"
                >
                  + Add
                </Button>
              </Box>
            </Box>
            <Box sx={{ width: "1250px" }}>
              <Customers customers={customers} />
            </Box>
          </Box>
          <CustomerModal open={open} setOpen={setOpen} onClose={handleClose} />
        </Box>
      </Box>
    </>
  );
};
export default ManageCustomers;
