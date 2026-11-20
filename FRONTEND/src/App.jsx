import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import UserDashboard from "./pages/UserDashboard";
import ReportWaste from "./pages/ReportWaste";
import MyReports from "./pages/MyReports";
import Profile from "./pages/Profile";

import AdminDashboard from "./pages/AdminDashboard";
import AdminReports from "./pages/AdminReports";
import AdminViewReport from "./pages/AdminViewReport";

import ViewReport from "./pages/ViewReport";

import AboutPage from "./pages/AboutPage";
import HowWorksPage from "./pages/HowWorksPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import RootRoute from "./routes/RootRoute";

import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";


const App = () => {

  return (

    <>
      <ScrollToTop />

      <Routes>

        {/* Root Route */}

        <Route path="/" element={<RootRoute />} />


        {/* Public Routes */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="/how-it-works" element={<HowWorksPage />} />


        {/* User Routes */}

        <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />

        <Route path="/report-waste" element={<ProtectedRoute><ReportWaste /></ProtectedRoute>} />

        <Route path="/my-reports" element={<ProtectedRoute><MyReports /></ProtectedRoute>} />

        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        <Route path="/view-report/:id" element={<ProtectedRoute><ViewReport /></ProtectedRoute>} />


        {/* Admin Routes */}

        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

        <Route path="/admin/reports" element={<AdminRoute><AdminReports /></AdminRoute>} />

        <Route path="/admin/view-report/:id" element={<AdminRoute><AdminViewReport /></AdminRoute>} />

      </Routes>

    </>

  );

};

export default App;