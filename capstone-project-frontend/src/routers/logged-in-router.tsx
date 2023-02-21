/** @format */

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { CssBaseline, ThemeProvider } from "@mui/material";

// client
import { Home } from "../pages/home";
import { Header } from "../components/header";
import { NotFound } from "../pages/404";
import { ContactUs } from "../pages/contactUs";
import { OurWork } from "../pages/our-work";
import { Reservation } from "../pages/reservation";
import ReservationForm from "../pages/reservation-form";

// admin
import AdminApp from "../admin/AdminApp";
import Dashboard from "../admin/scenes/dashboard";
import Customers from "../admin/scenes/customers";
import Employees from "../admin/scenes/employees";
import Reservations from "../admin/scenes/reservations";
import Invoices from "../admin/scenes/invoices";
import Contacts from "../admin/scenes/contacts";
import Bar from "../admin/scenes/bar";
import Form from "../admin/scenes/form";
import Pie from "../admin/scenes/pie";
import Line from "../admin/scenes/line";
import FAQ from "../admin/scenes/faq";
import Geography from "../admin/scenes/geography";
import { ColorModeContext, useMode } from "../admin/theme";

// user test
// let admin = "admin";

//customer routes
const clientRoutes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/reservation",
    component: <Reservation />,
  },
  {
    path: "/reservation/form",
    component: <ReservationForm />,
  },
  {
    path: "/contact-us",
    component: <ContactUs />,
  },
  {
    path: "/our-work",
    component: <OurWork />,
  },
];

//admin routes
const adminRoutes = [
  { path: '/admin', component: <AdminApp /> },
  { path: "/admin/dashboard", component: <Dashboard /> },
  { path: "/admin/customers", component: <Customers /> },
  { path: "/admin/employees", component: <Employees /> },
  { path: "/admin/reservations", component: <Reservations /> },
  { path: "/admin/contacts", component: <Contacts /> },
  { path: "/admin/invoices", component: <Invoices /> },
  { path: "/admin/form", component: <Form /> },
  { path: "/admin/bar", component: <Bar /> },
  { path: "/admin/pie", component: <Pie /> },
  { path: "/admin/line", component: <Line /> },
  { path: "/admin/faq", component: <FAQ /> },
  { path: "/admin/geography", component: <Geography /> },
];


export const LoggedInRouter = () => {
  const { loading, data } = useMe();
  const [theme, colorMode]: any = useMode();

  return (
    <div>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
			<Header />
            {/* <AdminApp /> */}
            <Routes>
              {clientRoutes.map((route) => (
                <Route path={`${route.path}`} element={route.component} />
              ))}
              {adminRoutes.map((route) => (
                <Route path={`${route.path}`} element={route.component} />
              ))}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
};
