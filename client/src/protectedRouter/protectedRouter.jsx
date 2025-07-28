import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { fetchMe } from "../store/authSlice";
import Loader from "../components/Loader";

export default function ProtectedRoute({ roles, children }) {
  const dispatch = useDispatch();
  const { token, user, loading } = useSelector((s) => s.auth);

  console.log("ProtectedRoute - token:", token);
  console.log("ProtectedRoute - user:", user);
  console.log("ProtectedRoute - loading:", loading);

  useEffect(() => {
    if (token && !user) {
      console.log("Fetching user data...");
      dispatch(fetchMe());
    }
  }, [token, user, dispatch]);

  if (!token) {
    console.log("No token, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (loading || !user) {
    console.log("Loading or no user, showing loading...");
    return <Loader text="Authenticating..." size="large" />;
  }

  if (roles && !roles.includes(user.role)) {
    console.log("User role not authorized:", user.role);
    return <Navigate to="/login" replace />;
  }

  console.log("User authorized, rendering protected content");
  return <>{children}</>;
}
