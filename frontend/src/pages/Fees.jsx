import { useState, useEffect } from "react";
import axios from "axios";

function Fees({ setPage }) {
  const [student, setStudent] = useState("");
  const [amount, setAmount] = useState("");
  const [search, setSearch] = useState("");
  const [fees, setFees] = useState([]);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/fees"
      );

      setFees(response.data);
    } catch (error) {
      console.error("Error fetching fees:", error);
    }
  };

  const addFee = async () => {
    if (!student || !amount) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/fees",
        {
          student,
          amount,
        }
      );

      setStudent("");
      setAmount("");

      fetchFees();

      alert("Fee record added successfully");
    } catch (error) {
      console.error("Error adding fee:", error);
    }
  };

  const deleteFee = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/fees/${id}`
      );

      fetchFees();
    } catch (error) {
      console.error("Error deleting fee:", error);
    }
  };

  const filteredFees = fees.filter((fee) =>
    fee.student
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

      <h1>Fee Management</h1>

      <div className="form-container">
        <input
          type="text"
          placeholder="Student Name"
          value={student}
          onChange={(e) =>
            setStudent(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Fee Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <br />
        <br />

        <button onClick={addFee}>
          Add Fee
        </button>
      </div>

      <hr />

      <h2>Total Fee Records: {fees.length}</h2>

      <input
        type="text"
        placeholder="Search Student"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <h2>Fee Records</h2>

      {filteredFees.length === 0 ? (
        <p>No fee records found.</p>
      ) : (
        filteredFees.map((fee) => (
          <div
            key={fee.id}
            className="fee-card"
          >
            <p>
              <strong>Student:</strong>{" "}
              {fee.student}
            </p>

            <p>
              <strong>Amount:</strong> ₹
              {fee.amount}
            </p>

            <button
              className="delete-btn"
              onClick={() =>
                deleteFee(fee.id)
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

export default Fees;