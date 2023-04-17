import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { useAppDispatch } from "../../redux/hook";
import { signOut } from "../../redux/reducer/authSlice";
import { useMe } from "../../hooks/useMe";

// icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";

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
  },

  menuitem: {
    color: "white",
  },

  reservationsStatus: {
    width: "50px",
  },

  prosidebar: {
    width: "200px",
    height: "800px",
    backgroundColor: "black",
  },
});

const Item = ({ title, to, icon, selected, setSelected }: any) => {
  const classes = useStyles();

  return (
    <MenuItem
      className={classes.menuitem}
      onClick={() => setSelected(title)}
      active={selected === title}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const AdminSidebar = () => {
  const { data } = useMe();
  const classes = useStyles();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState();
  const dispatch = useAppDispatch();
  console.log("selected state in AdminSidebar:", selected); // add this line

  return (
    <Box
      sx={{
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "2.5px 35px 2.5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#3CB045 !important",
        },
        "& .pro-menu-item.active": {
          backgroundColor: "#3CB045 !important",
          borderRadius: "10px",
          color: "black",
        },
        "& .pro-menu-item.active: hover": {
          backgroundColor: "white !important",
          borderRadius: "10px",
          color: "black",
        },
      }}
    >
      <ProSidebar
        className={classes.prosidebar}
        width="100%"
        // width="200px"
        collapsed={isCollapsed}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0px 10px 0px",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                position="relative"
                flexDirection="row"
              >
                <IconButton
                  color="success"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Box paddingLeft={isCollapsed ? undefined : ""}>
            {!isCollapsed && (
              <Box
                sx={{
                  paddingLeft: "25px",
                  paddingBottom: "10px",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                  }}
                >
                  {data?.user.first_name} {data?.user.last_name} |{" "}
                  {data?.user.role == 1 ? "Admin" : "Employee"}
                </Typography>
              </Box>
            )}
            <Item
              title="Dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              to="/admin"
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
            <Item
              title="Reservations Status"
              to="/admin/reservations-status"
              icon={<ScheduleSendIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Sign Out"
              onClick={() => dispatch(signOut())}
              to="/"
              icon={<ExitToAppIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AdminSidebar;
