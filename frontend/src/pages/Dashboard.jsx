import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaRoute,
  FaUserTie,
  FaMoneyBillWave,
} from "react-icons/fa";

function Dashboard({ setPage }) {
  const [studentCount, setStudentCount] = useState(0);
  const [routeCount, setRouteCount] = useState(0);
  const [driverCount, setDriverCount] = useState(0);
  const [feeCount, setFeeCount] = useState(0);

  const loadData = async () => {
    try {
      const studentsResponse = await axios.get(
        "http://localhost:5000/students"
      );

      const routesResponse = await axios.get(
        "http://localhost:5000/routes"
      );

      const driversResponse = await axios.get(
        "http://localhost:5000/drivers"
      );

      const feesResponse = await axios.get(
        "http://localhost:5000/fees"
      );

      setStudentCount(studentsResponse.data.length);
      setRouteCount(routesResponse.data.length);
      setDriverCount(driversResponse.data.length);
      setFeeCount(feesResponse.data.length);
    } catch (error) {
      console.error(
        "Error loading dashboard data:",
        error
      );
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      {/* App Title */}
      <h1
        style={{
          fontSize: "60px",
          fontWeight: "bold",
          lineHeight: "1.2",
          textAlign: "center",
          marginBottom: "50px",
        }}
      >
        Transport Route
        <br />
        Management System
      </h1>

      {/* Navigation Buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "50px",
        }}
      >
        <button
          onClick={() => setPage("dashboard")}
          style={buttonStyle}
        >
          <FaTachometerAlt />
          Dashboard
        </button>

        <button
          onClick={() => setPage("students")}
          style={buttonStyle}
        >
          <FaUserGraduate />
          Students
        </button>

        <button
          onClick={() => setPage("routes")}
          style={buttonStyle}
        >
          <FaRoute />
          Routes
        </button>

        <button
          onClick={() => setPage("drivers")}
          style={buttonStyle}
        >
          <FaUserTie />
          Drivers
        </button>

        <button
          onClick={() => setPage("fees")}
          style={buttonStyle}
        >
          <FaMoneyBillWave />
          Fees
        </button>
      </div>

      <hr style={{ marginBottom: "40px" }} />

      {/* Dashboard Statistics */}
      <h2
        style={{
          textAlign: "center",
          fontSize: "40px",
          marginBottom: "30px",
        }}
      >
        Dashboard Overview
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Students</h3>
          <h1>{studentCount}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Routes</h3>
          <h1>{routeCount}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Drivers</h3>
          <h1>{driverCount}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Fee Records</h3>
          <h1>{feeCount}</h1>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "10px",
  padding: "15px 25px",
  fontSize: "20px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const cardStyle = {
  backgroundColor: "#f3f4f6",
  padding: "25px",
  borderRadius: "15px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
};

export default Dashboard;