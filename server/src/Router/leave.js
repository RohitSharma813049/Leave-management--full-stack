const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

let leaves = []; // use DB later

router.post("/applyleave", authMiddleware, (req, res) => {
  const { type, startDate, endDate, reason } = req.body;

  const newLeave = {
    id: leaves.length + 1,
    userId: req.user.id,
    type,
    from: startDate,
    to: endDate,
    reason,
    status: "Pending",
  };
  leaves.push(newLeave);

  res.json({ message: "Leave application submitted successfully in My Leave Management System", data: newLeave });
});

router.get("/all", authMiddleware, (req, res) => {
  res.json(leaves);
});

// Update leave status
router.put("/:id/status", authMiddleware, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const leaveIndex = leaves.findIndex(leave => leave.id === parseInt(id));
  
  if (leaveIndex === -1) {
    return res.status(404).json({ error: "Leave request not found" });
  }
  
  leaves[leaveIndex].status = status;
  
  res.json({ 
    message: `Leave request ${status.toLowerCase()} successfully`,
    leave: leaves[leaveIndex]
  });
});

module.exports = router;
