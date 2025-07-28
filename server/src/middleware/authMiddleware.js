const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const raw = req.header("Authorization");
  const token = raw?.startsWith("Bearer ") ? raw.slice(7) : null;
  if (!token) return res.status(401).json({ error: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token is not valid" });
  }
};
