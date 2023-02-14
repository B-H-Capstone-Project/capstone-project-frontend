/** @format */

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NotFound } from "../pages/404";


// Admin Dashboard
import AdminApp from "../admin/AdminApp";
import Dashboard from "../admin/scenes/dashboard";
import Team from "../admin/scenes/team";
import Contacts from "../admin/scenes/contacts";
import Invoices from "../admin/scenes/invoices";
import Form from "../admin/scenes/form";
import Bar from "../admin/scenes/bar";
import Pie from "../admin/scenes/pie";
import Line from "../admin/scenes/line";
import FAQ from "../admin/scenes/faq";
import Calendar from "../admin/scenes/calendar/calendar";
import Geography from "../admin/scenes/geography";
import '../admin/index.css';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../admin/theme";
import { useState } from "react";
import Sidebar from "../admin/scenes/global/sidebar";
import Topbar from "../admin/scenes/global/topbar";

export const AdminLoggedInRouter = () => {
    const [theme, colorMode] :any = useMode();
    // const [isSidebar, setIsSidebar] : any = useState(true);
  return (
    <>

      {/* Admin Dashboard */}
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        <Sidebar  />
          <main className="content">
            <Topbar />
          <Routes>
            <Route path="/admin" element={<AdminApp />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/team" element={<Team />} />
            <Route path="/admin/contacts" element={<Contacts />} />
            <Route path="/admin/invoices" element={<Invoices />} />
            <Route path="/admin/form" element={<Form />} />
            <Route path="/admin/bar" element={<Bar />} />
            <Route path="/admin/pie" element={<Pie />} />
            <Route path="/admin/line" element={<Line />} />
            <Route path="/admin/faq" element={<FAQ />} />
            <Route path="/admin/calendar" element={<Calendar />} />
            <Route path="/admin/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </>
    );
};
