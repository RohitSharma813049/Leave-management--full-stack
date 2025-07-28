import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";

function LeaveHistory() {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/leave/all", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLeaveHistory(Array.isArray(data) ? data : []);
        } else {
          console.error("Failed to fetch leave history");
        }
      } catch (error) {
        console.error("Error fetching leave history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveHistory();
  }, []);

  const statusColors = {
    Pending: "#f59e0b",
    Approved: "#10b981",
    Rejected: "#ef4444",
  };

  if (loading) {
    return <Loader text="Loading leave history..." size="large" />;
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #eee" }}>
      <h2 style={{ marginBottom: 24 }}>Leave History</h2>
      {leaveHistory.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>No leave history found</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: 12, borderBottom: "1px solid #ddd" }}>Type</th>
              <th style={{ padding: 12, borderBottom: "1px solid #ddd" }}>From</th>
              <th style={{ padding: 12, borderBottom: "1px solid #ddd" }}>To</th>
              <th style={{ padding: 12, borderBottom: "1px solid #ddd" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveHistory.map((leave) => (
              <tr key={leave.id}>
                <td style={{ padding: 12, borderBottom: "1px solid #eee" }}>{leave.type}</td>
                <td style={{ padding: 12, borderBottom: "1px solid #eee" }}>{leave.from}</td>
                <td style={{ padding: 12, borderBottom: "1px solid #eee" }}>{leave.to}</td>
                <td style={{ padding: 12, borderBottom: "1px solid #eee", color: statusColors[leave.status] }}>
                  {leave.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LeaveHistory;