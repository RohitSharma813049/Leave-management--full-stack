import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";

const Dashboard = () => {

  const [totalEmployees, setTotalEmployees] = useState(0);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    // Fetch total employees
    fetch("/api/employees/count", { headers })
      .then((res) => res.json())
      .then((data) => setTotalEmployees(data.totalEmployees))
      .catch((err) => console.error("Error fetching employees:", err));

    // Fetch leaves
    fetch("/api/leave/all", { headers })
      .then((res) => res.json())
      .then((data) => {
        console.log("Leaves data:", data);
        setLeaves(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error fetching leaves:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader text="Loading dashboard data..." size="large" />;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1 className="font-bold text-2xl">Admin Dashboard</h1>
      <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
        <div style={{ flex: 1, background: "#f5f5f5", padding: "1rem", borderRadius: "8px" }}>
          <h2>Total Employees</h2>
          <p>{totalEmployees}</p> {/* Dynamic count */}
        </div>
        <div style={{ flex: 1, background: "#f5f5f5", padding: "1rem", borderRadius: "8px" }}>
          <h2>Pending Leave Requests</h2>
          <p>{Array.isArray(leaves) ? leaves.filter(l => l.status === "Pending").length : 0}</p>
        </div>
        <div style={{ flex: 1, background: "#f5f5f5", padding: "1rem", borderRadius: "8px" }}>
          <h2>Approved Leaves</h2>
          <p>{Array.isArray(leaves) ? leaves.filter(l => l.status === "Approved").length : 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
