const db = require("../db");
const express = require("express");
const router = express.Router();

router.get("/visitor", (req, res) => {
  const isNewVisitor = req.query.newVisitor === "true"; // Read from frontend

  if (isNewVisitor) {
    const insertQuery = "INSERT INTO visitors (visit_date) VALUES (CURDATE())";
    db.query(insertQuery, (err) => {
      if (err) {
        console.error("Error logging visitor:", err);
      }
    });
  }

  // Queries for visitor statistics
  const queries = {
    totalVisitors: "SELECT COUNT(*) AS total FROM visitors",
    visitorsToday: "SELECT COUNT(*) AS total FROM visitors WHERE visit_date = CURDATE()",
    visitorsThisWeek: "SELECT COUNT(*) AS total FROM visitors WHERE YEARWEEK(visit_date, 1) = YEARWEEK(CURDATE(), 1)"
  };

  const stats = {};
  let queryCount = Object.keys(queries).length;
  let completedQueries = 0;

  Object.entries(queries).forEach(([key, query]) => {
    db.query(query, (err, results) => {
      if (err) {
        console.error(`Database query error for ${key}:`, err);
        return res.status(500).json({ error: `Database query error for ${key}` });
      }

      stats[key] = results[0].total;
      completedQueries++;

      if (completedQueries === queryCount) {
        res.json(stats);
      }
    });
  });
});

module.exports = router;
