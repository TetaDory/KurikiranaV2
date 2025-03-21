const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "expense_manager",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err);
    return;
  }
  console.log("Connected to database");
});

// API endpoint to get expenses
app.get("/api/expenses", (req, res) => {
  db.query("SELECT * FROM expenses", (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database query failed" });
    } else {
      res.json(results);
    }
  });
});

// API endpoint to add a new expense
app.post("/api/expenses", (req, res) => {
  const { category, date, description, amount } = req.body;
  const query = "INSERT INTO expenses (category, date, description, amount) VALUES (?, ?, ?, ?)";
  db.query(query, [category, date, description, amount], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Failed to add expense" });
    } else {
      res.json({ message: "Expense added successfully", id: result.insertId });
    }
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
