import { useState } from "react";
// icon
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import Swal from "sweetalert2";
import "./customer.css";

//modal
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useForm } from 'react-hook-form';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Customer({customerprop}) {
  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const {
	// 	register,
	// } = useForm({
	// 	mode: 'onChange',
	// });

  // //update
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address_line1, setAddressLine1] = useState("");
  const [address_line2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("");
  const [is_active, setIsActive] = useState("");


  const handleUpdate = async (e) => {
    e.preventDefault();

    console.log('handleUpdate In');
    // console.log("e: " + JSON.stringify(e));
    // console.log("customerporp.email: " + customerprop.email);
    // console.log("userprop._id: " + userprop._id);
    const updatedCustomer = {
      userId: customerprop.id,
      profile: customerprop.profile,
      email: customerprop.email,
      first_name,
      last_name,
      password,
      // confirm_password,
      phone_number,
      address_line1,
      address_line2,
      city,
      province,
      postal_code,
      country,
      role,
      is_active,
    };

    try {
      console.log("update try in");
      const res = await axios.put(`http://localhost:8080/user/${customerprop.id}`,
        updatedCustomer
      );
      console.log("res:" + res);
      // console.log("res" + JSON.stringify(res.data.user));
    } catch (err) {
      console.log("catch in");
      console.log("error: " + err);
    }
  };

  //delete
  const handleDelete = (e) => {
    console.log(e);
    e.preventDefault();
    try {
      axios.delete(`http://localhost:8080/user/${customerprop.id}`, {
        data: { userId: customerprop.id },
      });

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: "customer is deleted in successfuly",
      });

      window.location.replace("/admin/customers");
    } catch (err) {
      console.log("err : " + err);
    }
  };

  return (
    <>
      <div className="customer">
        <table className="customer_table">
          <tbody>
            <tr>
              <td className="customer_table_td">{customerprop.id}</td>
              <td className="customer_table_td">
                <div className="customer_profile_div">
                  <img
                    className="customer_img"
                    src={customerprop.profile}
                    alt={customerprop.first_name}
                  />
                </div>
              </td>
              <td className="customer_table_td">{customerprop.email}</td>
              <td className="customer_table_td">
                {customerprop.first_name} {customerprop.last_name}
              </td>
              <td className="customer_table_td">{customerprop.phone_number}</td>
              <td className="customer_table_td">
                {customerprop.address_line1} {customerprop.address_line2}
              </td>
              <td className="customer_table_td">{customerprop.city}</td>
              <td className="customer_table_td">{customerprop.province}</td>
              <td className="customer_table_td">{customerprop.postal_code}</td>
              <td className="customer_table_td">{customerprop.country}</td>
              <td className="customer_table_td">
                {customerprop.role == 3 && "Customer"}
              </td>
              <td className="customer_table_td">
                {customerprop.is_active == true ? "Active" : "In Active"}
              </td>
              <td className="customer_table_td">
                <div className="manage_icon">
                  <EditIcon
                    className="manage_icon_edit"
                    key={customerprop.id}
                    customerprop={customerprop}
                    onClick={handleOpen}
                  />
                  <ClearIcon
                    fontSize="large"
                    className="manage_icon_delete"
                    onClick={handleDelete}
                  />

                  {/* Update Modal */}
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <form onSubmit={handleUpdate}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          sx={{
                            marginLeft: "1rem",
                            marginBottom: "1rem",
                            fontWeight: "semiBold",
                            fontSize: "20px",
                          }}
                        >
                          Update Account
                        </Typography>
                        <TextField
                          id="outlined-required"
                          label="Email"
                          sx={{
                            margin: "0.5rem",
                            width: "617px",
                          }}
                          defaultValue={customerprop.email}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                        <TextField
                          required
                          id="outlined-required"
                          label="Password"
                          sx={{
                            margin: "0.5rem",
                            width: "300px",
                          }}
                          defaultValue="password"
                          // {...register('password')}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                          required
                          id="outlined-required"
                          label="Confirm Password"
                          sx={{
                            margin: "0.5rem",
                            width: "300px",
                          }}
                          // onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <TextField
                          required
                          id="outlined-required"
                          label="First Name"
                          margin="normal"
                          sx={{
                            margin: "0.5rem",
                            width: "300px",
                          }}
                          defaultValue={customerprop.first_name}
                          // {...register('first_name')}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                          required
                          id="outlined-required"
                          label="Last Name"
                          sx={{
                            margin: "0.5rem",
                            width: "300px",
                          }}
                          defaultValue={customerprop.last_name}
                          
                          // {...register('last_name')}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField
                          required
                          id="outlined-required"
                          label="Phone"
                          sx={{
                            fullWidth: "true",
                            margin: "0.5rem",
                            width: "617px",
                          }}
                          defaultValue={customerprop.phone_number}
                          
                          // {...register('phone_number')}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <TextField
                          required
                          id="outlined-required"
                          label="Address Line1"
                          sx={{
                            margin: "0.5rem",
                            width: "300px",
                          }}
                          defaultValue={customerprop.address_line1}
                          
                          // {...register('address_line1')}
                          onChange={(e) => setAddressLine1(e.target.value)}
                        />
                        <TextField
                          required
                          id="outlined-required"
                          label="Address Line2"
                          sx={{
                            margin: "0.5rem",
                            width: "300px",
                          }}
                          defaultValue={customerprop.address_line2}
                          
                          // {...register('address_line2')}
                          onChange={(e) => setAddressLine2(e.target.value)}
                        />
                        <TextField
                          required
                          id="outlined-required"
                          label="City"
                          sx={{
                            margin: "0.5rem",
                            width: "300px",
                          }}
                          defaultValue={customerprop.city}
                          
                          // {...register('city')}
                          onChange={(e) => setCity(e.target.value)}
                        />
                        <TextField
                          required
                          id="outlined-required"
                          label="Province"
                          sx={{
                            margin: "0.5rem",
                            width: "300px",
                          }}
                          defaultValue={customerprop.province}
                          
                          // {...register('province')}
                          onChange={(e) => setProvince(e.target.value)}
                        />
                        <TextField
                          required
                          id="outlined-required"
                          label="Postal Code"
                          sx={{
                            margin: "0.5rem",
                            width: "300px",
                          }}
                          defaultValue={customerprop.postal_code}
                          
                          // {...register('postal_code')}
                          onChange={(e) => setPostalCode(e.target.value)}
                        />
                        <TextField
                          required
                          id="outlined-required"
                          label="Country"
                          sx={{
                            margin: "0.5rem",
                            width: "300px",
                          }}
                          defaultValue={customerprop.country}
                          
                          // {...register('country')}
                          onChange={(e) => setCountry(e.target.value)}
                        />
                        <Select
                          value={role}
                        
                          sx={{
                            margin: "0.5rem",
                            width: "300px",
                          }}
                          
                          // {...register('role')}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <MenuItem value={1}>Admin</MenuItem>
                          <MenuItem value={2}>Employee</MenuItem>
                          <MenuItem value={3}>Customer</MenuItem>
                        </Select>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          sx={{
                            margin: "0.5rem",
                            width: "300px",
                          }}
                          // value={customerprop.is_active}
                          value={is_active}
                          label="Active"
                          
                          // {...register('is_active')}
                          onChange={(e) => setIsActive(e.target.value)}
                        >
                          <MenuItem value={1}>Active</MenuItem>
                          <MenuItem value={2}>In Active</MenuItem>
                        </Select>

                        <Typography align="center">
                          <Button
                            sx={{
                              marginTop: "1rem",
                              width: "100px",
                              backgroundColor: "black",
                              color: "white",
                            }}
                            type="submit"
                          >
                            Update
                          </Button>
                        </Typography>
                      </form>
                    </Box>
                  </Modal>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
