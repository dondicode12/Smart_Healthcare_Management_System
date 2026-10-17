import { Link } from "react-router-dom";
function Register() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-blue-100 py-8">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
                <h1 className="text-center text-2xl font-bold text-blue-900">BLASTCARE</h1>
                <p className="mb-6 text-center text-gray-500">Create your account</p>
                <form>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                    type="text"
                    placeholder="Panfilo Lacson"
                    className="mb-4 mt-1 w-full rounded border border-b-gray-300 p-2"/>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                    type="email"
                    placeholder="Blastoise@email.com"
                    className="mb-4 mt-1 w-full rounded border border-gray-300 p-2"/>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                    type="tel"
                    placeholder="09XX XXX XXXX"
                    className="mb-4 mt-1 w-full rounded border border-gray-300 p-2"/>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                    type="date"
                    className="mb-4 mt-1 w-full rounded border border-gray-300 p-2"/>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                    type="password"
                    placeholder="Create a password"
                    className="mb-4 mt-1 w-full rounded border border-gray-300 p-2"/>
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                    type="password"
                    placeholder="Re-enter  your password"
                    className="mb-6 mt-1 w-full rounded border border-gray-300 p-2"/>
                    <button
                    type="submit"
                    className="w-full rounded bg-blue-900 p-2 font-semibold text-white hover:bg-blue-800">
                        Create Account
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-500">
                    Already have an account? <Link to="/" className="text-blue-700">Sign in</Link>
                </p>
            </div>
        </div>

    )
}

export default Register