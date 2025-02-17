const db = require("../db");
const express = require("express");
const router = express.Router();

router.get("/stats", (req, res) => {
  const userId = req.query.userId || null;
  const isAdmin = req.query.isAdmin === "true";
  const userCondition = userId && !isAdmin ? `user_id = ${db.escape(userId)}` : null;

  // Queries for total counts (Admins get all products, users get their own)
  const queries = {
    totalProducts: `SELECT COUNT(*) AS total FROM products ${userCondition ? `WHERE ${userCondition}` : ""}`,
    totalUsers: "SELECT COUNT(*) AS total FROM users",
    createdThisMonth: `SELECT COUNT(*) AS total FROM products ${userCondition ? `WHERE ${userCondition} AND` : "WHERE"} MONTH(CreatedAt) = MONTH(CURDATE()) AND YEAR(CreatedAt) = YEAR(CURDATE())`,
    createdToday: `SELECT COUNT(*) AS total FROM products ${userCondition ? `WHERE ${userCondition} AND` : "WHERE"} DATE(CreatedAt) = CURDATE()`,
    createdThisWeek: `SELECT COUNT(*) AS total FROM products ${userCondition ? `WHERE ${userCondition} AND` : "WHERE"} YEARWEEK(CreatedAt, 1) = YEARWEEK(CURDATE(), 1)`
  };

  const stats = {};
  let queryCount = Object.keys(queries).length;
  let completedQueries = 0;
  let hasError = false;

  Object.entries(queries).forEach(([key, query]) => {
    if (hasError) return;

    db.query(query, (err, results) => {
      if (err) {
        console.error(`Database query error for ${key}:`, err.message);
        hasError = true;
        return res.status(500).json({ error: `Database query error for ${key}: ${err.message}` });
      }

      stats[key] = results[0]?.total || 0;
      completedQueries++;

      if (completedQueries === queryCount) {
        res.json(stats);
      }
    });
  });
});

module.exports = router;
