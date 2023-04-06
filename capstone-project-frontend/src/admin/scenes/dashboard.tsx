import { useEffect, useState } from "react";
import axios from "axios";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockTransactions } from "../data/mockData";

// Icon
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

// Component
import Header from "../components/Header";
import LineChart from "../components/LineChart";
import StatBox from "../components/StatBox";
import AdminSidebar from "./global/admin-sidebar";
import AdminHeader from "./global/admin-header";

// Google Maps
import Map from "../components/Map";
import { useJsApiLoader } from "@react-google-maps/api";
import { Loading } from "../../components/loading";

const Dashboard: any = () => {
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

  useEffect(() => {
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
    };
    fetchNewEmployees();
  }, []);

  return isLoaded? (
    <Box display="flex" height="100%">
      <AdminSidebar />
      <Box display="flex" flexDirection="column" width="100%" height="100%">
        <AdminHeader />
        <Box m="20px" className="content">
          <Box display="flex">
            <Header title="Weekly" subtitle="Report" />
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
              // backgroundColor="white"
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
              // backgroundColor={colors.primary[400]}
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
              // backgroundColor={colors.primary[400]}
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
              // backgroundColor={colors.primary[400]}
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

            {/* ROW 2 */}
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              // backgroundColor={colors.primary[400]}
            >
              <Box
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Data Generated
                  </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <DownloadOutlinedIcon
                      sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <LineChart isDashboard={true} />
              </Box>
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              // backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                // borderBottom={`4px solid ${colors.primary[500]}`}
                // colors={colors.grey[100]}
                p="15px"
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                >
                  Recent Transactions
                </Typography>
              </Box>
              {mockTransactions.map((transaction, i) => (
                <Box
                  key={`${transaction.txId}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  // borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transaction.txId}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {transaction.user}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.date}</Box>
                  <Box
                    // backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    ${transaction.cost}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Box>
            Google Maps
            <Map />
          </Box>
        </Box>
      </Box>
    </Box>
  ): <Loading />;
};

export default Dashboard;
