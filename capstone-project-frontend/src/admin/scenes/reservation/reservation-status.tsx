import { useState } from "react";
import axios from "../../../api/axios";
import { makeStyles } from "@mui/styles";

// modal
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { FormControl, SelectChangeEvent } from "@mui/material";

// update
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";


const useStyles = makeStyles({
  img: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "50%",
    margin: "0",
    padding: "3px",
    alignItem: "center",
    justifyContent: "center",
  },
  icon_edit: {
    color: "black",
    cursor: "pointer",
    "&:icon_edit": {
      color: "#757575",
    },
  },
  icon_delete: {
    paddingLeft: "10px",
    color: "black",
    cursor: "pointer",
    "&:icon_delete": {
      color: "#757575",
    },
  },
});

const renderSwitch = (param:number) => {
    switch(param) {
      case 1: return 'Pending';
      case 2: return 'Confirmed';
      case 3: return 'Completed';
      default:
        return 'foo';
    }
  }

export default function ReservationStatus(props: any) {

  const classes = useStyles();
  const queryClient = useQueryClient();
  const reservationId = props.reservation.id;

  const [is_confirmed, setIsConfirmed] = useState(props.reservation.is_confirmed);

  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  const { isLoading, mutate } = useMutation(
    async (updateRes) => {
      return (
        await axios.put(
          `/confirmreservation/${reservationId}`,
          updateRes
        )
      ).data;
    },
    {
      onSuccess: (data) => {
        const message = `reservation status has changed to ${renderSwitch(is_confirmed)}`;
        alert(message);
        window.location.reload();
      },
      onError: () => {
        alert("there was an error");
      },
      onSettled: () => {
        queryClient.invalidateQueries("create");
      },
    }
  );

  const onSubmit = (data: any) => {
    const updateRes: any = {
      ...data
    };
    console.log('updateRes: ', updateRes);
    mutate(updateRes);
  };

  const handleChange = (e: SelectChangeEvent<any>) => {
    const updatedData = { ...getValues(), is_confirmed: e.target.value };
    setIsConfirmed(e.target.value);
    handleSubmit((data) => onSubmit(updatedData))();
  };

  const convertTime = (time: any) => {
    const date = new Date(time);
    const mountainTime = new Date(date.toLocaleString("en-US", { timeZone: "America/Denver" })).toISOString().slice(0,-8);
    const formatedTime = mountainTime.replace('T', ' ');
    return formatedTime;
  }

  return (
    <>
      <Table
        sx={{ borderBottom: "solid 0.5px rgb(196, 196, 196)", width: "1160px" }}
      >
        <TableBody>
          <TableRow sx={{ textAlign: "left" }}>
            <TableCell
              sx={{
                width: "25px",
                margin: "0",
                padding: "2px",
                border: "none",
              }}
            >
              <Box sx={{ width: "14px", border: "none" }}>
                {props.reservation.id}
              </Box>
            </TableCell>
            <TableCell
              sx={{
                width: "60px",
                display: "flex",
                padding: "0",
                margin: "0",
                border: "none",
              }}
            >
                <img
                  className={classes.img}
                  src={props.reservation.profile}
                  alt={props.reservation.first_name}
                />
            </TableCell>
            <TableCell sx={{ 
                width: "225px", 
                margin: "0",
                padding: "2px",
                border: "none", 
                paddingRight: "0"}}>
              {props.reservation.email}
            </TableCell>
            <TableCell
              sx={{
                width: "130px",
                margin: "0",
                padding: "2px",
                border: "none",
                
              }}
            >
              {props.reservation.first_name} {props.reservation.last_name}
            </TableCell>
            <TableCell
              sx={{
                width: "100px",
                margin: "0",
                padding: "2px",
                border: "none",
              }}
            >
              {props.reservation.phone_number}
            </TableCell>
            <TableCell
              sx={{
                width: "300px",
                margin: "0",
                padding: "2px",
                border: "none",
              }}
            >
                {`${props.reservation.address_line1} ${props.reservation.address_line2}, `}<br/>{`${props.reservation.city}, ${props.reservation.province}, ${props.reservation.postal_code}, ${props.reservation.country}`}
            </TableCell>
            <TableCell
              sx={{
                width: "100px",
                margin: "0",
                padding: "2px",
                border: "none",
              }}
            >
              
              {String(convertTime(props.reservation.date))} 
            </TableCell>
            <TableCell
              sx={{
                width: "100px",
                margin: "0",
                padding: "2px",
                border: "none",
              }}
            >
              {props.reservation.type}
            </TableCell>
            <TableCell
              sx={{
                width: "150px",
                margin: "0",
                padding: "2px",
                border: "none",
              }}
            >
            <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          {...register('is_confirmed')}
          value={is_confirmed}
          onChange={handleChange}
          displayEmpty
          placeholder={props.reservation.is_confirmed}
        >
          <MenuItem value={1}>Pending</MenuItem>
          <MenuItem value={2}>Confirmed</MenuItem>
          <MenuItem value={3}>Completed</MenuItem>
        </Select>
      </FormControl>
      </form>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
