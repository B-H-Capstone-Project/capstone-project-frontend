import { useCallback, useEffect, useState } from "react";
import FullCalendar, { formatDate, EventApi, EventInput, DateSelectArg } from "@fullcalendar/react";
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

/* export interface IReservation {
  id: number;
  user_id: number;
  address_id: string;
  type: string;
  date: Date;
  description: string;
} */
interface ICustomer {
  id: string;
  first_name: string;
  last_name: string;
  profile:string;
  phone_number: string;
  email: string;
  address_line1: string;
  address_line2?: string;
  postal_code: string;
  city: string;
  province: string;
  country: string;
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
  is_confirmed: number;
}

const Reservations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [reservations, setReservations] = useState<IReservationWithUser[]>([]);
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [existedRes, setExistedRes] = useState<DateSelectArg>();
  const [isNew, setIsNew] = useState(false);
  const [customer, setCustomer] = useState<ICustomer>();

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
        setReservations(res.data.reservations);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllReservations();
    fecthAllCustomers();
  }, [setReservations]);

  const eventsOnCalendar: EventInput[] = reservations
  .filter((reservation: IReservationWithUser) => reservation.is_confirmed === 1)
  .map((reservation: IReservationWithUser) => ({
    extendedProps: reservation,
    id: reservation.reservation_id.toString(),
    title: reservation.type,
    start: reservation.date
  }));

    const handleDateClick = useCallback((arg: DateClickArg) => {
      setSelectedDate(arg.date.toISOString().slice(0, -8));
    }, []);

  const handleEventClick = (selected: any) => {
    setExistedRes(selected.event._def.extendedProps);
    const existedCustomer: ICustomer = {
      id: selected.event._def.extendedProps.id,
      first_name: selected.event._def.extendedProps.first_name,
      last_name: selected.event._def.extendedProps.last_name,
      profile:selected.event._def.extendedProps.profile,
      phone_number: selected.event._def.extendedProps.phone_number,
      email: selected.event._def.extendedProps.email,
      address_line1: selected.event._def.extendedProps.address_line1,
      address_line2: selected.event._def.extendedProps.address_line2,
      postal_code: selected.event._def.extendedProps.postal_code,
      city: selected.event._def.extendedProps.city,
      province: selected.event._def.extendedProps.province,
      country: selected.event._def.extendedProps.country,
    }
    setCustomer(existedCustomer);
    setSelectedDate(selected.event._def.extendedProps.date.slice(0, -8));
    handleOpen();
      // selected.event.remove();

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
          <Typography variant="h5">Pending Reservations</Typography>
          <List>
            {reservations.map((event: IReservationWithUser) => (
              
              event.is_confirmed===0 ? (
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
              </ListItem>) : null
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
            select={(selected)=> {
              setIsNew(true);
              handleOpen()}}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            // eventsSet={(events:IReservation) => setCurrentEvents(events)}
            events={eventsOnCalendar}
            
            // eventSources={currentEvents}
          />
        </Box>
      </Box>
    </Box>
    <ReservationModal customers={customers} selectedDate={selectedDate} setSelectedDate={setSelectedDate} open={open} setOpen={setOpen} isNew={isNew} setIsNew={setIsNew} existedRes={existedRes} setExistedRes={setExistedRes} customer={customer} setCustomer={setCustomer}/>
    </>
  );
};

export default Reservations;
