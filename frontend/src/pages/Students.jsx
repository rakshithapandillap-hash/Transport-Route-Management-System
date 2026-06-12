import { useState, useEffect } from "react";
import axios from "axios";

function Students({ setPage }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/students"
      );

      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const addStudent = async () => {
    if (!name || !phone || !pickup) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editId !== null) {
        await axios.put(
          `http://localhost:5000/students/${editId}`,
          {
            name,
            phone,
            pickup,
          }
        );

        alert("Student updated successfully");
        setEditId(null);
      } else {
        await axios.post(
          "http://localhost:5000/students",
          {
            name,
            phone,
            pickup,
          }
        );

        alert("Student added successfully");
      }

      setName("");
      setPhone("");
      setPickup("");

      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/students/${id}`
      );

      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const editStudent = (student) => {
    setName(student.name);
    setPhone(student.phone);
    setPickup(student.pickup);

    setEditId(student.id);
  };

  const filteredStudents = students.filter((student) =>
    student.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => setPage("dashboard")}
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Back to Dashboard
      </button>

      <h1>Students Management</h1>

      <div className="form-container">
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Pickup Point"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
        />

        <br />
        <br />

        <button onClick={addStudent}>
          {editId !== null
            ? "Update Student"
            : "Add Student"}
        </button>
      </div>

      <hr />

      <h2>Total Students: {students.length}</h2>

      <input
        type="text"
        placeholder="Search Student"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>Students List</h2>

      {filteredStudents.length === 0 ? (
        <p>No students found.</p>
      ) : (
        filteredStudents.map((student) => (
          <div
            key={student.id}
            className="student-card"
          >
            <p>
              <strong>Name:</strong> {student.name}
            </p>

            <p>
              <strong>Phone:</strong> {student.phone}
            </p>

            <p>
              <strong>Pickup Point:</strong>{" "}
              {student.pickup}
            </p>

            <button
              onClick={() =>
                editStudent(student)
              }
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() =>
                deleteStudent(student.id)
              }
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Students;