import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import { useAppDispatch } from "../../../redux/hook";
import { signOut } from "../../../redux/reducer/authSlice";
import { useMe } from "../../../hooks/useMe";

// icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";


import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  img: {
    width: "90px",
    height: "90px",
    objectFit: "cover",
    borderRadius: "50%",
    margin: "0",
    padding: "0",
    alignItem: "center",
    justifyContent: "center",
  }
});


const Item = ({ title, to, icon, selected, setSelected }: any) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const AdminSidebar = () => {
  const classes = useStyles();
  const { data } = useMe();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar width="100%" collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
                position="relative"
                flexDirection="row"
              >
                <Typography variant="h3" fontWeight="bold" color={colors.grey[0]}>
                  <NavLink to="/admin">
                    B&H
                  </NavLink>
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="relative"
              >
                <img
                  alt=""
                  className={classes.img}
                  width="100px"
                  height="100px"
                  src={data?.user.profile}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  sx={{ m: "10px 0 0 0" }}
                >
                  {data?.user.first_name} {data?.user.last_name}
                </Typography>
                <Typography variant="h6" color={colors.greenAccent[500]}>
                  {data?.user.role === 1 ? "Admin" : "Employee"}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : ""}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Employees"
              to="/admin/employees"
              icon={<AdminPanelSettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Customers"
              to="/admin/customers"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Reservations"
              to="/admin/reservations"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <NavLink to="/"> */}
            <Item
              title="Sign Out"
              onClick={() => dispatch(signOut())}
              to="/"
              icon={<ExitToAppIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* </NavLink> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AdminSidebar;
