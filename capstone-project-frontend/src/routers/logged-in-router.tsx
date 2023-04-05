/** @format */

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// client
import { Home } from "../pages/home";
import { Header } from "../components/header";
import { NotFound } from "../pages/404";
import { ContactUs } from "../pages/contactUs";
import { OurWork } from "../pages/our-work";
import { Reservation } from "../pages/reservation";

import Dashboard from "../admin/scenes/dashboard";
import ManageCustomers from "../admin/scenes/customer/manage-customers";
import ManageEmployees from "../admin/scenes/employee/manage-employees";
import { ColorModeContext, useMode } from "../admin/theme";
import { EditProfile } from "../pages/user/edit-profile";
import { SignIn } from "../pages/signin";
import ReservationForm from "../pages/reservation-form";

//customer routes
const clientRoutes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/signIn",
    component: <SignIn />,
  },
  {
    path: "/reservation",
    component: <Reservation />,
  },
  {
    path: "/reservation-form",
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
  {
    path: "/edit-profile",
    component: <EditProfile />,
  },
];

//admin routes
const adminRoutes = [
  { path: "/admin", component: <Dashboard /> },
  { path: "/admin/customers", component: <ManageCustomers /> },
  { path: "/admin/employees", component: <ManageEmployees /> },
];

export const LoggedInRouter = () => {
  const isAuth = useSelector((state: RootState) => state.auth);
  const token = isAuth.userToken;

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          {clientRoutes.map((route) => (
            <Route
              key={route.path}
              path={`${route.path}`}
              element={route.component}
            />
          ))}
          <Route path="*" element={<NotFound />} />
          {token?.role === 1 &&
            adminRoutes.map((route) => (
              <Route
                key={route.path}
                path={`${route.path}`}
                element={route.component}
              />
            ))}
          {token?.role === 2 &&
            adminRoutes.map((route) => (
              <Route
                key={route.path}
                path={`${route.path}`}
                element={route.component}
              />
            ))}
        </Routes>
      </Router>
    </div>
  );
};
