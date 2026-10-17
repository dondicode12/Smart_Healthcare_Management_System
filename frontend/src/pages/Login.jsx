import { Link } from "react-router-dom"
function Login() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-blue-100">
            <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow border border-blue-300">
                <h1 className="text-center text-2xl font-bold text-blue-900">BLASTCARE</h1>
                <p className="mb-6 text-center text-gray-500">Sign in to your account</p>
                <form>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                    type="email"
                    placeholder="Blastoise@email.com"
                    className="mb-4 mt-1 w-full rounded border border-gray-300 p-2"/>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                    type="password"
                    placeholder="Your password"
                    className="mb-6 mt-1 w-full rounded border border-gray-300 p-2"/>
                    <button
                    type="submit"
                    className="w-full rounded bg-blue-900 p-2 font-semibold text-white hover:bg-blue-800">
                        Sign In
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-500">
                    Don't have an account? <Link to="/register" className="text-blue-700">Sign up</Link>
                </p>
            </div>
        </div>
    )    
}

export default Login