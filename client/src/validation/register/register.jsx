import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const name = useRef("");
  const email = useRef("");
  const password = useRef("");
  const role = useRef("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleregister(e) {
    e.preventDefault();
    setIsLoading(true);

    const user = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
      role: role.current.value,
    };

    try {
      console.log("Registering user:", user);
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log("Registration response:", data);
      alert(data.message || "Registration successful!");

      if (res.ok) {
        console.log("Registration successful, navigating to login");
        navigate("/login"); // Redirect after successful registration
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Registration failed!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-center font-bold text-4xl">My Leave Management</h1>
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Create Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleregister} className="space-y-6">

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  name="name"
                  type="text"
                  ref={name}
                  required
                  autoComplete="name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-blue-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  ref={email}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-blue-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  name="password"
                  type="password"
                  ref={password}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-blue-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="regRole" className="block text-sm font-medium text-gray-900">
                Role
              </label>
              <select
                ref={role}
                required
                className="block w-full mt-2 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-blue-600 sm:text-sm"
              >
                <option value="">-- Select Role --</option>
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Registering...
                  </div>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
