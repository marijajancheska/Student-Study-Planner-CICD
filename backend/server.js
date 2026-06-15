const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "studyplanner",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres"
});

app.get("/health", (req, res) => {
  res.json({ status: "Backend is running" });
});

app.get("/api/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.post("/api/tasks", async (req, res) => {
  const { title, subject, deadline } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, subject, deadline, completed) VALUES ($1, $2, $3, false) RETURNING *",
      [title, subject, deadline]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

app.patch("/api/tasks/:id/complete", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "UPDATE tasks SET completed = true WHERE id = $1 RETURNING *",
      [id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});