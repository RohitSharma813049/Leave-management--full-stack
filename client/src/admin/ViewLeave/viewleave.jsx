import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader";

export default function ViewLeave() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    const fetchLeaves = async () => {
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
          setLeaves(Array.isArray(data) ? data : []);
        } else {
          console.error("Failed to fetch leaves");
        }
      } catch (error) {
        console.error("Error fetching leaves:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  async function handleApprove(id) {
    setProcessingId(id);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/leave/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "Approved" }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        // Update local state
        setLeaves((prevLeaves) =>
          prevLeaves.map((leave) =>
            leave.id === id ? { ...leave, status: "Approved" } : leave
          )
        );
      } else {
        const error = await response.json();
        alert(error.error || "Failed to approve leave request");
      }
    } catch (error) {
      console.error("Error approving leave:", error);
      alert("Something went wrong!");
    } finally {
      setProcessingId(null);
    }
  }

  async function handleReject(id) {
    setProcessingId(id);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/leave/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "Rejected" }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        // Update local state
        setLeaves((prevLeaves) =>
          prevLeaves.map((leave) =>
            leave.id === id ? { ...leave, status: "Rejected" } : leave
          )
        );
      } else {
        const error = await response.json();
        alert(error.error || "Failed to reject leave request");
      }
    } catch (error) {
      console.error("Error rejecting leave:", error);
      alert("Something went wrong!");
    } finally {
      setProcessingId(null);
    }
  }

  if (loading) {
    return <Loader text="Loading leave requests..." size="large" />;
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6">Leave Requests</h2>
      {leaves.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No leave requests found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Employee</th>
                <th className="py-2 px-4 text-left">Type</th>
                <th className="py-2 px-4 text-left">From</th>
                <th className="py-2 px-4 text-left">To</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
              <tr key={leave.id} className="border-b">
                <td className="py-2 px-4">{leave.employee}</td>
                <td className="py-2 px-4">{leave.type}</td>
                <td className="py-2 px-4">{leave.from}</td>
                <td className="py-2 px-4">{leave.to}</td>
                <td
                  className={`py-2 px-4 font-semibold ${
                    leave.status === "Approved"
                      ? "text-green-600"
                      : leave.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {leave.status}
                </td>
                <td className="py-2 px-4">
                  {leave.status === "Pending" ? (
                    <div className="flex gap-2">
                      <button
                        disabled={processingId === leave.id}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleApprove(leave.id)}
                      >
                        {processingId === leave.id ? (
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                          </div>
                        ) : (
                          "Approve"
                        )}
                      </button>
                      <button
                        disabled={processingId === leave.id}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleReject(leave.id)}
                      >
                        {processingId === leave.id ? (
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                          </div>
                        ) : (
                          "Reject"
                        )}
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-400">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}
