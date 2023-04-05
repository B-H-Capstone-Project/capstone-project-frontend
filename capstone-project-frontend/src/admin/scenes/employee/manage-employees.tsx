import { useEffect, useState } from "react";
import axios from "axios";
import Employees from "./employees";
import Title from "../../components/title";
import AdminSidebar from "../../components/admin-sidebar";

//modal
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EmployeeModal from "./create-employee-modal";

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:8080/users/employee");
        setEmployees(res.data.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllEmployees();
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", width: "100%" }}>
        <AdminSidebar />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ margin: "20px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: "30vw",
              }}
            >
              <Title title="Manage Employees" subtitle="" />
              <Box sx={{ display: "flex" }}>
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
              </Box>
            </Box>
            <Box sx={{ width: "1250px" }}>
              <Employees employees={employees} />
            </Box>
          </Box>
          <EmployeeModal open={open} setOpen={setOpen} onClose={handleClose} />
        </Box>
      </Box>
    </>
  );
};

export default ManageEmployees;
