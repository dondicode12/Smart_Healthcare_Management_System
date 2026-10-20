import { Link } from 'react-router-dom'
function Layout({ children }) {
    return (
        <div className="flex min-h-screen">
            <div className="w-60 bg-blue-900 p-4 text-white">
                <h2 className="text-xl font-bold">BLASTCARE</h2>
                <Link to="/patient/dashboard" className="mt-4 block">Dashboard</Link>
                <Link to="/patient/appointments" className="mt-2 block">My Appointments</Link>
                <Link to="/patient/prescriptions" className="mt-2 block">My Prescriptions</Link>
                <Link to="/patient/book" className="mt-2 block">Book Appointment</Link>
                <Link to="/patient/bills" className="mt-2 block">My Bills</Link>
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between border-b bg-white p-4">
                    <span>Patient Portal</span>
                    <Link to="/" className="text-blue-700 hover:underline">Logout</Link>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    )
}

export default Layout    