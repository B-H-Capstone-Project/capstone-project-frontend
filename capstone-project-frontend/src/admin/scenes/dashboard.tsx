import { useEffect, useState } from "react";
import axios from "axios";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

// Icon
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { ClipLoader } from "react-spinners";

// Component
import Title from "../components/title";
import StatBox from "../components/StatBox";
import AdminSidebar from "../components/admin-sidebar";

// Google Maps
import Map from "../components/Map";
import { useJsApiLoader } from "@react-google-maps/api";

const Dashboard: any = () => {
  const [loading, setLoading] = useState<any>();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDa4ZNjAcA6NEACcDSrpXbt2IY7Bz6cNI4",
  });

  const theme: any = useTheme();
  const colors: any = tokens(theme.palette.mode);

  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [pendingReservations, setPendingReservations] = useState([]);

  // %
  const [employeesPercentage, setEmployeesPercentage] = useState([]);
  const [customersPercentage, setCustomersPercentage] = useState([]);
  const [reservationsPercentage, setReservationsPercentage] = useState([]);
  const [pendingReservationsPercentage, setPendingReservationsPercentage] =
    useState([]);

  const [employeeCount, setEmployeeCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [reservationCount, setReservationCount] = useState(0);
  const [pendingReservationCount, setPendingReservationCount] = useState(0);

  const fetchNewEmployees = async () => {
    try {
      // New Employees
      const resEmployee = await axios.get(
        "http://localhost:8080/users/newemployee"
      );
      setEmployees(resEmployee.data.users);
      const employeeCount = resEmployee.data.users.length;
      setEmployeeCount(employeeCount);
      // % New Employees
      const resEmployeesPercentage = await axios.get(
        "http://localhost:8080/users/newemployee/percentage"
      );
      setEmployeesPercentage(resEmployeesPercentage.data.employeesPercentage);

      // New Customers
      const resCustomer = await axios.get(
        "http://localhost:8080/users/newcustomer"
      );
      setCustomers(resCustomer.data.users);
      const customerCount = resCustomer.data.users.length;
      setCustomerCount(customerCount);
      // % New Customers
      const resCustomersPercentage = await axios.get(
        "http://localhost:8080/users/newcustomer/percentage"
      );
      setCustomersPercentage(resCustomersPercentage.data.customersPercentage);

      // New Reservations
      const resReservation = await axios.get(
        "http://localhost:8080/newreservations"
      );
      setReservations(resCustomer.data.reservations);
      const reservationCount = resReservation.data.reservations.length;
      setReservationCount(reservationCount);
      // % New Reservation
      const resReservationPercentage = await axios.get(
        "http://localhost:8080/newreservations/percentage"
      );
      setReservationsPercentage(
        resReservationPercentage.data.reservationPercentage
      );

      // Pending Reservations
      const resPendingReservation = await axios.get(
        "http://localhost:8080/newpendingreservations"
      );
      setPendingReservations(resPendingReservation.data.reservations);
      const pendingReservationCount =
        resPendingReservation.data.reservations.length;
      setPendingReservationCount(pendingReservationCount);
      // % Pending Reservations
      const resPendingReservationPercentage = await axios.get(
        "http://localhost:8080/newpendingreservations/percentage"
      );
      setPendingReservationsPercentage(
        resPendingReservationPercentage.data.reservationPercentage
      );
    } catch (err) {
      console.log(err);
    }
    setLoading(true);
  };
  useEffect(() => {
    fetchNewEmployees();
  }, []);

  return isLoaded && loading ? (
    <Box display="flex" height="100%">
      <AdminSidebar />
      <Box display="flex" flexDirection="column" width="100%" height="100%">
        <Box m="20px" className="content">
          <Box display="flex">
            <Title title="Weekly" subtitle="Report" />
          </Box>

          {/* GRID & CHARTS */}
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="10px"
            height="100%"
          >
            {/* ROW 1 - New Datas StatBox */}
            <Box
              gridColumn="span 3"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={employeeCount}
                subtitle="New Employees"
                increase={`${employeesPercentage} from last week`}
                icon={
                  <PersonAddIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>

            <Box
              gridColumn="span 3"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={customerCount}
                subtitle="New Customers"
                increase={`${customersPercentage} from last week`}
                icon={
                  <PersonAddIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>

            <Box
              gridColumn="span 3"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={reservationCount}
                subtitle="New Reservations"
                increase={`${reservationsPercentage} from last week`}
                icon={
                  <CalendarTodayOutlinedIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>

            <Box
              gridColumn="span 3"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={pendingReservationCount}
                subtitle="Pending Reservations"
                increase={`${pendingReservationsPercentage} from last week`}
                icon={
                  <CalendarTodayOutlinedIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            {/* Row 3 */}
            <Box gridColumn="span 8" gridRow="span 2">
              Google Maps
              <Map />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  ) : (
    <Box
      style={{
        backgroundColor: '#EDFAD6',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%"
      }}
    >
      <ClipLoader color={"black"} size={150} />
    </Box>
  );
};

export default Dashboard;
