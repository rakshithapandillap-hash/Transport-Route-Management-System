import { useState, useEffect } from "react";
import axios from "axios";

function Drivers({ setPage }) {
  const [driverName, setDriverName] = useState("");
  const [phone, setPhone] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/drivers"
      );

      setDrivers(response.data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const addDriver = async () => {
    if (!driverName || !phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editId !== null) {
        await axios.put(
          `http://localhost:5000/drivers/${editId}`,
          {
            name: driverName,
            phone,
          }
        );

        alert("Driver updated successfully");

        setEditId(null);
      } else {
        await axios.post(
          "http://localhost:5000/drivers",
          {
            name: driverName,
            phone,
          }
        );

        alert("Driver added successfully");
      }

      setDriverName("");
      setPhone("");

      fetchDrivers();
    } catch (error) {
      console.error("Error saving driver:", error);
    }
  };

  const deleteDriver = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/drivers/${id}`
      );

      fetchDrivers();
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  const editDriver = (driver) => {
    setDriverName(driver.name);
    setPhone(driver.phone);

    setEditId(driver.id);
  };

  const filteredDrivers = drivers.filter((driver) =>
    driver.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => setPage("dashboard")}
      >
        ← Back to Dashboard
      </button>

      <h1>Driver Management</h1>

      <div className="form-container">
        <input
          type="text"
          placeholder="Driver Name"
          value={driverName}
          onChange={(e) =>
            setDriverName(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        <br />
        <br />

        <button onClick={addDriver}>
          {editId !== null
            ? "Update Driver"
            : "Add Driver"}
        </button>
      </div>

      <hr />

      <h2>Total Drivers: {drivers.length}</h2>

      <input
        type="text"
        placeholder="Search Driver"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <h2>Drivers List</h2>

      {filteredDrivers.length === 0 ? (
        <p>No drivers found.</p>
      ) : (
        filteredDrivers.map((driver) => (
          <div
            key={driver.id}
            className="driver-card"
          >
            <p>
              <strong>Driver:</strong>{" "}
              {driver.name}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {driver.phone}
            </p>

            <button
              onClick={() =>
                editDriver(driver)
              }
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() =>
                deleteDriver(driver.id)
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

export default Drivers;