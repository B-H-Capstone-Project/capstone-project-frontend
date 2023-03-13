import { useState } from "react";
// icon
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import "./customer.css";

//modal
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

//update
import { useMutation, useQueryClient } from "react-query";
// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";

interface ICustomer {
  // id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address_line1: string;
  address_line2?: string;
  postal_code: string;
  city: string;
  province: string;
  country: string;
  role: number;
  is_active: boolean;
}

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

export default function Customer({ customerprop }: any) {
  const queryClient = useQueryClient();
  // const isAuth = useSelector((state) => state.auth);
  // const navigate = useNavigate();
  const customerId = customerprop.id;

  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      first_name: customerprop.first_name,
      last_name: customerprop.last_name,
      phone_number: customerprop.phone_number,
      password: customerprop.password,
      confirm_password: customerprop.password,
      address_line1: customerprop.address_line1,
      address_line2: customerprop.address_line2,
      postal_code: customerprop.postal_code,
      city: customerprop.city,
      province: customerprop.province,
      country: customerprop.country,
      role: customerprop.role,
      is_active: customerprop.is_active,
    },
  });

  const { isLoading, mutate } = useMutation(
    async (updateCustomer) => {
      return (
        await axios.put(
          `http://localhost:8080/user/${customerId}`,
          updateCustomer
        )
      ).data;
    },
    {
      onSuccess: (data) => {
        const message = "success";
        alert(message);
        window.location.replace("/admin/customers");
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
    console.log(data);
    const updateCustomer: any = {
      ...data,
    };
    mutate(updateCustomer);
  };

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //delete
  const handleDelete = (e: any) => {
    console.log(e);
    e.preventDefault();
    try {
      axios.delete(`http://localhost:8080/user/${customerprop.id}`, {
        data: { userId: customerprop.id },
      });
      const message = "success";
      alert(message);
      handleClose();
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
              <td className="customer_table_td_id">{customerprop.id}</td>
              <td className="customer_table_td_img">
                <div className="customer_profile_div">
                  <img
                    className="customer_img"
                    src={customerprop.profile}
                    alt={customerprop.first_name}
                  />
                </div>
              </td>
              <td className="customer_table_td_email">{customerprop.email}</td>
              <td className="customer_table_td_name">
                {customerprop.first_name} {customerprop.last_name}
              </td>
              <td className="customer_table_td_phone">
                {customerprop.phone_number}
              </td>
              <td className="customer_table_td_address">
                {customerprop.address_line1} {customerprop.address_line2}
              </td>
              <td className="customer_table_td_city">{customerprop.city}</td>
              <td className="customer_table_td_province">
                {customerprop.province}
              </td>
              <td className="customer_table_td_postalcode">
                {customerprop.postal_code}
              </td>
              <td className="customer_table_td_country">
                {customerprop.country}
              </td>
              <td className="customer_table_td_role">
                {customerprop.role == 3 && "Customer"}
              </td>
              <td className="customer_table_td_active">
                {customerprop.is_active == true ? "Active" : "In Active"}
              </td>
              <td className="customer_table_td_actions">
                <div className="manage_icon">
                  <EditIcon
                    className="manage_icon_edit"
                    // key={customerprop.id}
                    // customerprop={customerprop}
                    onClick={handleOpen}
                  />
                  <ClearIcon
                    fontSize="large"
                    className="manage_icon_delete"
                    onClick={handleDelete}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              placeholder="••••••••"
              sx={{
                margin: "0.5rem",
                width: "300px",
              }}
              {...register("password")}
            />
            <TextField
              required
              id="outlined-required"
              label="Confirm Password"
              sx={{
                margin: "0.5rem",
                width: "300px",
              }}
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
              placeholder={customerprop.first_name}
              {...register("first_name")}
            />
            <TextField
              required
              id="outlined-required"
              label="Last Name"
              sx={{
                margin: "0.5rem",
                width: "300px",
              }}
              placeholder={customerprop.last_name}
              {...register("last_name")}
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
              placeholder={customerprop.phone_number}
              {...register("phone_number")}
            />
            <TextField
              required
              id="outlined-required"
              label="Address Line1"
              sx={{
                margin: "0.5rem",
                width: "300px",
              }}
              placeholder={customerprop.address_line1}
              {...register("address_line1")}
            />
            <TextField
              required
              id="outlined-required"
              label="Address Line2"
              sx={{
                margin: "0.5rem",
                width: "300px",
              }}
              placeholder={customerprop.address_line2}
              {...register("address_line2")}
            />
            <TextField
              required
              id="outlined-required"
              label="City"
              sx={{
                margin: "0.5rem",
                width: "300px",
              }}
              placeholder={customerprop.city}
              {...register("city")}
            />
            <TextField
              required
              id="outlined-required"
              label="Province"
              sx={{
                margin: "0.5rem",
                width: "300px",
              }}
              placeholder={customerprop.province}
              {...register("province")}
            />
            <TextField
              required
              id="outlined-required"
              label="Postal Code"
              sx={{
                margin: "0.5rem",
                width: "300px",
              }}
              placeholder={customerprop.postal_code}
              {...register("postal_code")}
            />
            <TextField
              required
              id="outlined-required"
              label="Country"
              sx={{
                margin: "0.5rem",
                width: "300px",
              }}
              placeholder={customerprop.country}
              {...register("country")}
            />
            <Select
              required
              placeholder={customerprop.role}
              sx={{
                margin: "0.5rem",
                width: "300px",
              }}
              {...register("role")}
            >
              <MenuItem value={1}>Admin</MenuItem>
              <MenuItem value={2}>Employee</MenuItem>
              <MenuItem value={3}>Customer</MenuItem>
            </Select>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{
                margin: "0.5rem",
                width: "300px",
              }}
              placeholder={customerprop.is_active}
              {...register("is_active")}
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
    </>
  );
}
