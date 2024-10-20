import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './FE/context/AuthContext';
import Login from './FE/components/common/Login';
import DashboardHost from './FE/components/host/DashboardHost';
import DashboardCuidador from './FE/components/cuidadores/DashboardCuidador';
import ProtectedRoute from './FE/components/common/ProtectedRoute';
import Unauthorized from './FE/components/common/Unauthorized';
import DetalleOportunidad from './FE/components/host/DetalleOportunidad';
import BuscarOportunidades from './FE/components/cuidadores/BuscarOportunidades';
import SolicitudesEnviadas from './FE/components/cuidadores/SolicitudesEnviadas';
import PublishCareNeed from './FE/components/host/PublishCareNeed';
import NotificacionesCuidadores from './FE/components/host/NotificacionesCuidadores';
import PerfilCuidador from './FE/components/profile/PerfilCuidador';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          <Route element={<ProtectedRoute allowedRoles={['host']} />}>
            <Route path="/host-dashboard" element={<DashboardHost />} />
            <Route path="/publicar-necesidad" element={<PublishCareNeed />} />
            <Route path="/notificaciones-cuidadores/:id" element={<NotificacionesCuidadores />} />
            <Route path="/perfil-cuidador/:id" element={<PerfilCuidador />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['cuidador']} />}>
            <Route path="/cuidador-dashboard" element={<DashboardCuidador />} />
            <Route path="/detalle-oportunidad/:id" element={<DetalleOportunidad />} />
            <Route path="/buscar-oportunidades" element={<BuscarOportunidades />} />
            <Route path="/solicitudes-enviadas" element={<SolicitudesEnviadas />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;