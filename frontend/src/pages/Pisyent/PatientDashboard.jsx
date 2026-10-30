import Layout from '../../components/Layout'
import { CalendarDays } from 'lucide-react'

function PatientDashboard() {
    return (
        <Layout>
            <h2 className="mb-6 text-2xl font-bold">Patient Dashboard</h2>
            <div className="grid gap-4 md:grid-cols-3">
               <div className="flex items-center justify-between rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md">
                 <div>
                     <p className="text-gray-500">Upcoming Appointments</p>
                     <p className="text-3xl font-bold text-blue-900">2</p>
                 </div>
                 <div className="rounded-full bg-blue-100 p-3 text-blue-900">
                     <CalendarDays size={24} />
                 </div>
               </div>
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md">
                    <p className=" text-gray-500">Active Prescriptions</p>
                    <p className="text-3xl font-bold text-blue-900">3</p>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md">
                    <p className="text-gray-500">Unpaid Bills</p>
                    <p className="text-3xl font-bold text-blue-900">1</p>
                </div>
            </div>
        </Layout>
    )
}

export default PatientDashboard