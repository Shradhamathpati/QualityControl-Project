import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import MainLayout from "./components/Layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Configuration from "./pages/Configuration";
import UserConfiguration from "./pages/UserConfiguration";
import Reports from "./pages/Reports";
import Clinical from "./pages/Clinical";
import Lab from "./pages/Lab";
import AuditTrail from "./pages/AuditTrail";

import EquipmentPage from "./components/Configuration/EquipmentPage";
import AddParameterPage from "./components/Configuration/AddParameterPage";
import EquipmentViewPage from "./components/Configuration/EquipmentViewPage"; // ✅ FIXED IMPORT

import { initializeMockData } from "@/utils/mockData";

function App() {

  useEffect(() => {
    initializeMockData(1); // clinic_id = 1
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>

        {/* Default Redirect */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* Main Menus */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="admin-dashboard" element={<AdminDashboard />} />

        {/* Configuration */}
        <Route path="configuration" element={<Configuration />} />

        {/* ✅ Equipment Routes */}
        <Route path="configuration/equipments" element={<EquipmentPage />} />
        <Route path="configuration/add-parameter" element={<AddParameterPage />} />
        <Route path="configuration/equipment/view" element={<EquipmentViewPage />} />

        {/* Other sections */}
        <Route path="user-configuration" element={<UserConfiguration />} />
        <Route path="clinical" element={<Clinical />} />
        <Route path="lab" element={<Lab />} />
        <Route path="reports" element={<Reports />} />
        <Route path="audit-trail" element={<AuditTrail />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />

      </Route>
    </Routes>
  );
}

export default App;
