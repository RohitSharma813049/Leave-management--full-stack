import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../store/authSlice";
import Loader from "../../components/Loader";

export default function Login() {
  const email = useRef("");
  const password = useRef("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

async function handleLogin(e) {
  e.preventDefault();
  setIsLoading(true);
  try {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    const result = await dispatch(loginThunk({ email: emailValue, password: passwordValue }));
    
    if (loginThunk.fulfilled.match(result)) {
      const { user } = result.payload;
      console.log("Login successful:", user);
      console.log("User role:", user?.role);
      
      const role = user?.role?.toLowerCase();
      console.log("Normalized role:", role);
      
      if (role === "manager") {
        console.log("Navigating to manager page");
        navigate("/manager");
      } else if (role === "employee") {
        console.log("Navigating to employee page");
        navigate("/employee");
      } else {
        console.warn("Unknown role:", role);
        console.log("Navigating to employee page as fallback");
        navigate("/employee"); // fallback
      }
    } else {
      console.error("Login failed:", result.payload);
      alert(result.payload || "Login failed");
    }
  } catch (err) {
    console.error("Login Error:", err);
    alert("Something went wrong!");
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
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  ref={email}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-blue-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  ref={password}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-blue-600 sm:text-sm"
                />
              </div>
            </div>

            <div className="text-sm">
                          <Link className="font-semibold text-blue-600 hover:text-blue-500">
              Forgot password?
            </Link>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-blue-500 focus:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/"
              className="font-semibold text-blue-600 hover:text-blue-500"
            >
              Registration
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
