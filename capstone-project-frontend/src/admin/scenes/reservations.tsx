import { useCallback, useEffect, useState } from "react";
import FullCalendar, { formatDate, EventApi, EventInput } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../components/Header";
import { tokens } from "../theme";
import axios from "../../api/axios";
import ReservationModal from "./reservationsComponents/reservationModal";

export interface IReservation {
  id: number;
  user_id: number;
  address_id: string;
  type: string;
  date: Date;
  description: string;
}

export interface IReservationWithUser {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  province: string;
  country: string;
  postal_code: string;
  profile: string;
  reservation_id: number;
  type: string;
  date: Date;
  description: string;
}

const Reservations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState<IReservationWithUser[]>([]);
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>();
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    const fecthAllCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/users/customer");
        setCustomers(res.data.users);
      } catch (err) {
        console.log(err);
      }
    };


    const fetchAllReservations = async () => {
      try {
        const res = await axios.get("http://localhost:8080/reservationsUsers");
        console.log(res.data.reservations);
        setCurrentEvents(res.data.reservations);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllReservations();
    fecthAllCustomers();
  }, [setCurrentEvents]);

  const eventsOnCalendar: EventInput[] = currentEvents.map((reservation: IReservationWithUser) => {
    return {
      id: reservation.reservation_id.toString(),
      title: reservation.type,
      start: reservation.date
    };
  });

    const handleDateClick = useCallback((arg: DateClickArg) => {
      setSelectedDate(arg.date.toISOString().slice(0, -8));
    }, []);

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
            {currentEvents.map((event: IReservationWithUser) => (
              <ListItem
                key={event.reservation_id}
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
            select={(selected)=> handleOpen()}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            // eventsSet={(events:IReservation) => setCurrentEvents(events)}
            events={eventsOnCalendar}
            // eventSources={currentEvents}
          />
        </Box>
      </Box>
    </Box>
    <ReservationModal customers={customers} selectedDate={selectedDate} setSelectedDate={setSelectedDate} open={open} setOpen={setOpen}/> 
    </>
  );
};

export default Reservations;
