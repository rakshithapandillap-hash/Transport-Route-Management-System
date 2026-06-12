const express = require("express");
const cors = require("cors");
const connection = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// ==================== HOME ROUTE ====================

app.get("/", (req, res) => {
  res.send("Transport Route Management Backend Running");
});

// ==================== STUDENTS APIs ====================

// Get All Students
app.get("/students", (req, res) => {
  connection.query(
    "SELECT * FROM students",
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(results);
    }
  );
});

// Add Student
app.post("/students", (req, res) => {
  const { name, phone, pickup } = req.body;

  connection.query(
    "INSERT INTO students (name, phone, pickup) VALUES (?, ?, ?)",
    [name, phone, pickup],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Student added successfully",
        id: result.insertId,
      });
    }
  );
});

// Update Student
app.put("/students/:id", (req, res) => {
  const { name, phone, pickup } = req.body;
  const id = req.params.id;

  connection.query(
    "UPDATE students SET name = ?, phone = ?, pickup = ? WHERE id = ?",
    [name, phone, pickup, id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Student updated successfully",
      });
    }
  );
});

// Delete Student
app.delete("/students/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "DELETE FROM students WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Student deleted successfully",
      });
    }
  );
});

// ==================== ROUTES APIs ====================

// Get All Routes
app.get("/routes", (req, res) => {
  connection.query(
    "SELECT * FROM routes",
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(results);
    }
  );
});

// Add Route
app.post("/routes", (req, res) => {
  const { name } = req.body;

  connection.query(
    "INSERT INTO routes (name) VALUES (?)",
    [name],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Route added successfully",
        id: result.insertId,
      });
    }
  );
});

// Update Route
app.put("/routes/:id", (req, res) => {
  const { name } = req.body;
  const id = req.params.id;

  connection.query(
    "UPDATE routes SET name = ? WHERE id = ?",
    [name, id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Route updated successfully",
      });
    }
  );
});

// Delete Route
app.delete("/routes/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "DELETE FROM routes WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Route deleted successfully",
      });
    }
  );
});

// ==================== DRIVERS APIs ====================

// Get All Drivers
app.get("/drivers", (req, res) => {
  connection.query(
    "SELECT * FROM drivers",
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(results);
    }
  );
});

// Add Driver
app.post("/drivers", (req, res) => {
  const { name, phone } = req.body;

  connection.query(
    "INSERT INTO drivers (name, phone) VALUES (?, ?)",
    [name, phone],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Driver added successfully",
        id: result.insertId,
      });
    }
  );
});

// Update Driver
app.put("/drivers/:id", (req, res) => {
  const { name, phone } = req.body;
  const id = req.params.id;

  connection.query(
    "UPDATE drivers SET name = ?, phone = ? WHERE id = ?",
    [name, phone, id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Driver updated successfully",
      });
    }
  );
});

// Delete Driver
app.delete("/drivers/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "DELETE FROM drivers WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Driver deleted successfully",
      });
    }
  );
});

// ==================== FEES APIs ====================

// Get All Fees
app.get("/fees", (req, res) => {
  connection.query(
    "SELECT * FROM fees",
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(results);
    }
  );
});

// Add Fee
app.post("/fees", (req, res) => {
  const { student, amount } = req.body;

  connection.query(
    "INSERT INTO fees (student, amount) VALUES (?, ?)",
    [student, amount],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Fee added successfully",
        id: result.insertId,
      });
    }
  );
});

// Delete Fee
app.delete("/fees/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "DELETE FROM fees WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Fee deleted successfully",
      });
    }
  );
});

// ==================== START SERVER ====================

app.listen(5000, () => {
  console.log("Server running on port 5000");
});