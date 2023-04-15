/** @format */

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// client
import { Home } from '../pages/home';
import { Header } from '../components/header';
import { NotFound } from '../pages/404';
import { ContactUs } from '../pages/contactUs';
import { OurWork } from '../pages/our-work';

import Dashboard from '../admin/scenes/dashboard';
import ManageCustomers from '../admin/scenes/customer/manage-customers';
import ManageEmployees from '../admin/scenes/employee/manage-employees';
import AdminReservations from '../admin/scenes/reservation/reservations';
import { EditProfile } from '../pages/user/edit-profile';
import { SignIn } from '../pages/signin';

import ReservationForm from '../pages/reservation/reservation-form';
import { Reservation } from '../pages/reservation/reservation';
import { Footer } from '../components/footer';
import ManageReservationsStatus from "../admin/scenes/reservation/manage-reservations-status";

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
  { path: "/admin/reservations", component: <AdminReservations /> },
  { path: "/admin/reservations-status", component: <ManageReservationsStatus /> },
];

export const LoggedInRouter = () => {
	const isAuth = useSelector((state: RootState) => state.auth);
	const token = isAuth.userToken;
	console.log(token);
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
					<Route
						path='our-work/:id'
						element={<OurWork />}
					/>
					<Route
						path='*'
						element={<NotFound />}
					/>
				</Routes>
				<Footer />
			</Router>
		</div>
	);
};
