import Customer from "./customer";

// table
import Box from "@mui/material/Box";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function Customers({customers}:any) {
  return (
    <>
      <Table sx={{width: "1250px", borderBottom: "solid 0.5px rgb(196, 196, 196)"}}>
        <TableHead>
          <TableRow sx={{textAlign: "left"}}>
            <TableCell sx={{width: "20px", margin: "0", padding: "2px", paddingBottom: "0"}}>ID</TableCell>
            <TableCell sx={{width: "60px", margin: "0", padding: "2px", paddingBottom: "0"}}>Profile</TableCell>
            <TableCell sx={{width: "200px"}}>Email</TableCell>
            <TableCell sx={{width: "130px", margin: "0", padding: "2px", paddingBottom: "0"}}>Name</TableCell>
            <TableCell sx={{width: "100px", margin: "0", padding: "2px", paddingBottom: "0"}}>Phone</TableCell>
            <TableCell sx={{width: "200px", margin: "0", padding: "2px", paddingBottom: "0"}}>Address</TableCell>
            <TableCell sx={{width: "80px", margin: "0", padding: "2px", paddingBottom: "0"}}>City</TableCell>
            <TableCell sx={{width: "70px", margin: "0", padding: "2px", paddingBottom: "0"}}>Province</TableCell>
            <TableCell sx={{width: "80px", margin: "0", padding: "2px", paddingBottom: "0"}}>Postal Code</TableCell>
            <TableCell sx={{width: "80px", margin: "0", padding: "2px", paddingBottom: "0"}}>Country</TableCell>
            <TableCell sx={{width: "80px", margin: "0", padding: "2px", paddingBottom: "0"}}>Role</TableCell>
            <TableCell sx={{width: "80px", margin: "0", padding: "2px", paddingBottom: "0"}}>Active</TableCell>
            <TableCell sx={{width: "60px", margin: "0", padding: "2px", paddingBottom: "0"}}>Actions</TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <Box>
        {customers.map((c:any) => (
          <Customer key={c.id} customerprop={c} />
        ))}
      </Box>
    </>
  );
}
