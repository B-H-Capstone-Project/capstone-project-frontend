import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataTeam } from "../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../components/Header";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fecthAllEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:8080/users/employee");
        setEmployees(res.data.users);
        // useState의 setBooks를 이용하여 나의 book data를 업데이트할 수 있음
        // res.data가 업데이트 됨
        console.log('-------frontend employees.tsx-------')
        console.log(res.data.users);
      } catch (err) {
        console.log(err);
      }
    };
    fecthAllEmployees();
  }, []);

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete("http://localhost:8080/users/" + id);
  //     window.location.reload();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  // const columns = [
  //   {
  //     field: "name",
  //     headerName: "Name",
  //     flex: 1,
  //   },
  //   {
  //     field: "email",
  //     headerName: "Email",
  //     flex: 1,
  //   },
  //   {
  //     field: "phone",
  //     headerName: "Phone Number",
  //     flex: 1,
  //   },
  //   {
  //     field: "address",
  //     headerName: "Address",
  //     flex: 1,
  //   },
    // {
    //   field: "accessLevel",
    //   headerName: "Access Level",
    //   flex: 1,
    //   renderCell: ({ row: { access } }) => {
    //     return (
    //       <Box
    //         width="60%"
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={
    //           access === "admin"
    //             ? colors.greenAccent[600]
    //             : access === "manager"
    //             ? colors.greenAccent[700]
    //             : colors.greenAccent[700]
    //         }
    //         borderRadius="4px"
    //       >
    //         {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
    //         {access === "manager" && <SecurityOutlinedIcon />}
    //         {access === "user" && <LockOpenOutlinedIcon />}
    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {access}
    //         </Typography>
    // </Box>
    // );
    // },
    // },
  // ];

  return (
    <>
      {/* <Box m="20px"> */}
        {/* <Header title="Employees" subtitle="Managing the Employees" /> */}
        <div>
          <h1>Employees</h1>
          <br/>
          {employees.map((employee) => (
            <div className="employee" key={employee.id}>
              <h2>Name: {employee.first_name} {employee.last_name}</h2>
              <h2>Phone Number: {employee.phone_number}</h2>
              <h2>Address: {employee.address_id}</h2>
              <h2>Role: {employee.role}</h2>
              <h2>Active: {employee.is_active}</h2>
              <br></br>
            </div>
          ))}
        </div>
        {/* <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          {/* <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} /> */}
          {/* <DataGrid checkboxSelection rows={mockDataTeam}  /> */}
        {/* </Box> */}
      {/* </Box> */} 
    </>
  );
};

export default Employees;
