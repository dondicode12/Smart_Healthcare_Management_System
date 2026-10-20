import Layout from '../../components/Layout'

function PatientDashboard() {
    return (
        <Layout>
            <h2 className="mb-6 text-2xl font-bold">Patient Dashboard</h2>
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-white p-6 shadow">
                    <p className="text-lg text-gray-500 font-semibold">Upcoming Appointments</p>
                    <p className="text-3xl font-bold text-blue-900">2</p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow">
                    <p className=" text-gray-500">Active Prescriptions</p>
                    <p className="text-3xl font-bold text-blue-900">3</p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow">
                    <p className="text-gray-500">Unpaid Bills</p>
                    <p className="text-3xl font-bold text-blue-900">1</p>
                </div>
            </div>
        </Layout>
    )
}

export default PatientDashboard