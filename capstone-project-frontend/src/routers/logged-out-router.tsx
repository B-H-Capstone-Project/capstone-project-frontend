/** @format */

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NotFound } from "../pages/404";
import { Home } from "../pages/home";
import { SignIn } from "../pages/signin";
import { SignUp } from "../pages/signup";
import { Header } from '../components/header';
import { OurWork } from "../pages/our-work";
import VerifyEmail from "../components/verifyEmail";
import CheckYourEmail from "../components/checkYourEmail";
import { ContactUs } from "../pages/contactUs";

// Admin Dashboard
import AdminApp from "../admin/AdminApp";
import Dashboard from "../admin/scenes/dashboard";
import Employees from "../admin/scenes/employees";
import Customers from "../admin/scenes/customers";
import Contacts from "../admin/scenes/contacts";
import Invoices from "../admin/scenes/invoices";
import Form from "../admin/scenes/form";
import Bar from "../admin/scenes/bar";
import Pie from "../admin/scenes/pie";
import Line from "../admin/scenes/line";
import FAQ from "../admin/scenes/faq";
import Reservations from "../admin/scenes/reservations/reservations";
import Geography from "../admin/scenes/geography";
import '../admin/index.css';
export const LoggedOutRouter = () => {
	return (
		<div className='bg-gradient-to-t from-slate-100 via-lime-100 to-slate-100'>
			<Router>
				<Header />
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/signup'
						element={<SignUp />}
					/>
					<Route
						path='/signin'
						element={<SignIn />}
					/>
					<Route
						path='/verify-email'
						element={<VerifyEmail />}
					/>
					<Route
						path='/our-work'
						element={<OurWork />}
					/>
					<Route
						path='/contact-us'
						element={<ContactUs />}
					/>
					<Route
						path='*'
						element={<NotFound />}
					/>
				</Routes>
			</Router>
		</div>
	);
  return (
    <>
      <div className="bg-gradient-to-t from-slate-100 via-lime-100 to-slate-100">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/check-your-email" element={<CheckYourEmail />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/our-work" element={<OurWork />} />
            <Route path="/contact-us" element={<ContactUs />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Router>
      </div>
      {/* Admin Dashboard */}
      <div className="app">
        <Router>
          <Routes>
            <Route path="/admin" element={<AdminApp />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/employees" element={<Employees />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/reservations" element={<Reservations />} />
            <Route path="/admin/contacts" element={<Contacts />} />
            <Route path="/admin/invoices" element={<Invoices />} />
            <Route path="/admin/form" element={<Form />} />
            <Route path="/admin/bar" element={<Bar />} />
            <Route path="/admin/pie" element={<Pie />} />
            <Route path="/admin/line" element={<Line />} />
            <Route path="/admin/faq" element={<FAQ />} />
            <Route path="/admin/geography" element={<Geography />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};
