import { useEffect, useState } from "react";
import FullCalendar, { formatDate, EventApi } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../components/Header";
import { tokens } from "../theme";
import axios from "../../api/axios";
import AdminResForm from "./reservationsComponents/adminResForm";

export interface IReservation {
  id: number;
  user_id: number;
  address_id: string;
  type: string;
  date: Date;
  description: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Reservations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const [currentEvents, setCurrentEvents] = useState<IReservation[]>([]);
  const [currentEvents, setCurrentEvents] = useState<IReservation[]>([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchAllReservations = async () => {
      try {
        const res = await axios.get("http://localhost:8080/reservations");
        console.log(res.data.reservations);
        setCurrentEvents(res.data.reservations);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllReservations();
  }, []);

  const handleDateClick = (selected: any) => {
    console.log('handleDateClick',selected);
    // const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    // if (title) {
    //   calendarApi.addEvent({
    //     id: `${selected.dateStr}-${title}`,
    //     start: selected.startStr,
    //     end: selected.endStr,
    //     allDay: selected.allDay,
    //   });
    }

  const handleEventClick = (selected: any) => {

    console.log('handleEventClick', selected);
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <>
    
    <Box m="20px">
      <Header title="Reservations" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          // backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
          component="span"
        >
          <Typography variant="h5">Manage Reservations</Typography>
          <List>
            {currentEvents.map((event: IReservation) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.type}
                  secondary={
                    <Typography>
                      {formatDate(event.date, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={(selected)=> {handleOpen(); handleDateClick(selected)}}
            eventClick={handleEventClick}
            // eventsSet={(events:IReservation) => setCurrentEvents(events)}
            
            // eventSources={currentEvents}
          />
        </Box>
      </Box>
    </Box>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > 
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Reservation
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <AdminResForm/> 
          </Typography>

        </Box>
      </Modal>
    </>
  );
};

export default Reservations;
