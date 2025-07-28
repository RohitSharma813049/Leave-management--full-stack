import { useRef, useState } from "react";

export function LeaveApply() {
  const leaveTypeRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const reasonRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLeaveApply(e) {
    e.preventDefault();
    setIsLoading(true);

    const leaveData = {
      type: leaveTypeRef.current.value,
      startDate: startDateRef.current.value,
      endDate: endDateRef.current.value,
      reason: reasonRef.current.value,
    };

    try {
      const res = await fetch("/api/leave/applyleave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(leaveData),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Leave request submitted successfully!");
      } else {
        alert(data.error || "Failed to submit leave request");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }

    leaveTypeRef.current.value = "";
    startDateRef.current.value = "";
    endDateRef.current.value = "";
    reasonRef.current.value = "";
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        id="leaveForm"
        onSubmit={handleLeaveApply}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Apply for Leave</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Leave Type</label>
          <select ref={leaveTypeRef} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">-- Select Leave Type --</option>
            <option value="Casual">Casual Leave</option>
            <option value="Sick">Sick Leave</option>
            <option value="Earned">Earned Leave</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Start Date</label>
          <input type="date" ref={startDateRef} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">End Date</label>
          <input type="date" ref={endDateRef} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Reason</label>
          <textarea ref={reasonRef} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </div>
          ) : (
            "Submit Leave Request"
          )}
        </button>
      </form>
    </div>
  );
}
