const express = require("express");
const User = require("../schema/User");
const router = express.Router();

router.get("/count", async (req, res) => {
  const totalEmployees = await User.countDocuments({});
  res.json({ totalEmployees });
});

module.exports = router;
