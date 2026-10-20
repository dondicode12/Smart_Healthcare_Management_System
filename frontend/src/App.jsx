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
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/appointments" element={<PatientAppointments />} />
        <Route path="/patient/prescriptions" element={<PatientPrescriptions />} />
        <Route path="/patient/book" element={<BookAppointment />} />
        <Route path="/patient/bills" element={<PatientBills />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/patients" element={<DoctorPatients />} />
        <Route path="/doctor/patients/record" element={<DoctorPatientRecord />} />
        <Route path="/doctor/prescriptions/new" element={<DoctorWritePrescription />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App