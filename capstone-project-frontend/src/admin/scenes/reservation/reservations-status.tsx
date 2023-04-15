// table
import Box from "@mui/material/Box";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import axios from "../../../api/axios";
import { useEffect, useState } from "react";
import PendingReservation from "./reservation-status";
import { IReservationWithUser } from "./reservations";



export default function ReservationsStatus(props:any) {

  const [reservations, setReservations] = useState<IReservationWithUser[]>([]);
  

  useEffect(() => {
    const fetchAllReservations = async () => {
      try {
        const res = await axios.get("/reservationsUsers");
        setReservations(res.data.reservations);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllReservations();
  }, []);

  return (
  <>
      <Table sx={{width: "1160px", borderBottom: "solid 0.5px rgb(196, 196, 196)"}}>
        <TableHead>
          <TableRow sx={{textAlign: "left"}}>
            <TableCell sx={{width: "25px", margin: "0", padding: "2px", paddingBottom: "0"}}>ID</TableCell>
            <TableCell sx={{width: "60px", margin: "0", padding: "2px", paddingBottom: "0"}}>Profile</TableCell>
            <TableCell sx={{width: "225px"}}>Email</TableCell>
            <TableCell sx={{width: "130px", margin: "0", padding: "2px", paddingBottom: "0"}}>Name</TableCell>
            <TableCell sx={{width: "100px", margin: "0", padding: "2px", paddingBottom: "0"}}>Phone</TableCell>
            <TableCell sx={{width: "270px", margin: "0", padding: "2px", paddingBottom: "0"}}>Address</TableCell>
            <TableCell sx={{width: "100px", margin: "0", padding: "2px", paddingBottom: "0"}}>Date</TableCell>
            <TableCell sx={{width: "100px", margin: "0", padding: "2px", paddingBottom: "0"}}>Type</TableCell>
            <TableCell sx={{width: "150px", margin: "0", padding: "2px", paddingBottom: "0"}}>Status</TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <Box>
        {reservations.map((r:IReservationWithUser) => (
          <PendingReservation key={r.id} reservation={r} />
        ))}
      </Box>
    </>
  );
}