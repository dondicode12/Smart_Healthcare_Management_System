import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import PatientDashboard from './pages/Pisyent/PatientDashboard'
import PatientAppointments from './pages/Pisyent/PatientAppointments'
import PatientPrescriptions from './pages/Pisyent/PatientPrescriptions'
import BookAppointment from './pages/Pisyent/BookAppointment'
import PatientBills from './pages/Pisyent/PatientBills'
import DoctorDashboard from './pages/Doctah/DoctorDashboard'
import DoctorPatients from './pages/Doctah/DoctorPatients'
import DoctorPatientRecord from './pages/Doctah/DoctorPatientRecord'
import DoctorWritePrescription from './pages/Doctah/DoctorWritePrescription'
import AdminDashboard from './pages/Adumin/AdminDashboard'
import AdminUsers from './pages/Adumin/AdminUsers'
import NotFound from './pages/NotFound'
import Unauthorized from './pages/Unauthorized'
import SessionExpired from './pages/SessionExpired'
import StatesPreview from './pages/StatesPreview'
import Profile from './pages/Profile'
import AdminDoctors from './pages/Adumin/AdminDoctors'
import AdminPatients from './pages/Adumin/AdminPatients'
import AdminAppointments from './pages/Adumin/AdminAppointments'
import AdminBilling from './pages/Adumin/AdminBilling'
import AdminReports from './pages/Adumin/AdminReports'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient/dashboard" element={<ProtectedRoute role="patient"><PatientDashboard /></ProtectedRoute>} />
        <Route path="/patient/appointments" element={<ProtectedRoute role="patient"><PatientAppointments /></ProtectedRoute>} />
        <Route path="/patient/prescriptions" element={<ProtectedRoute role="patient"><PatientPrescriptions /></ProtectedRoute>} />
        <Route path="/patient/book" element={<ProtectedRoute role="patient"><BookAppointment /></ProtectedRoute>} />
        <Route path="/patient/bills" element={<ProtectedRoute role="patient"><PatientBills /></ProtectedRoute>} />
        <Route path="/doctor/dashboard" element={<ProtectedRoute role="doctor"><DoctorDashboard /></ProtectedRoute>} />
        <Route path="/doctor/patients" element={<ProtectedRoute role="doctor"><DoctorPatients /></ProtectedRoute>} />
        <Route path="/doctor/patients/:id" element={<ProtectedRoute role="doctor"><DoctorPatientRecord /></ProtectedRoute>} />
        <Route path="/doctor/prescriptions/new" element={<ProtectedRoute role="doctor"><DoctorWritePrescription /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsers /></ProtectedRoute>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/session-expired" element={<SessionExpired />} />
        <Route path="/states" element={<StatesPreview />} />
        <Route path="/admin/doctors" element={<ProtectedRoute role="admin"><AdminDoctors /></ProtectedRoute>} />
        <Route path="/admin/patients" element={<ProtectedRoute role="admin"><AdminPatients /></ProtectedRoute>} />
        <Route path="/admin/appointments" element={<ProtectedRoute role="admin"><AdminAppointments /></ProtectedRoute>} />
        <Route path="/admin/billing" element={<ProtectedRoute role="admin"><AdminBilling /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute role="admin"><AdminReports /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App