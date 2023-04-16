import Title from "../../components/title";
import AdminSidebar from "../../components/admin-sidebar";

//modal
import Box from "@mui/material/Box";
import PendingReservations from "./reservations-status";

const ManageReservationsStatus = () => {
  
  return (
    <>
      <Box sx={{ display: "flex", width: "100%", height: "800px" }}>
        <AdminSidebar />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ margin: "20px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: "30vw",
              }}
            >
              <Title title="Manage Reservation Status" subtitle="" />
              <Box sx={{ display: "flex" }}>
              </Box>
            </Box>
            <Box sx={{ width: "1160px" }}>
              <PendingReservations/>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ManageReservationsStatus;
