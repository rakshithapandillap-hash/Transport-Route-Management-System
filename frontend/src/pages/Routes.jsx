import { useState, useEffect } from "react";
import axios from "axios";

function Routes({ setPage }) {
  const [routeName, setRouteName] = useState("");
  const [search, setSearch] = useState("");
  const [routes, setRoutes] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/routes"
      );

      setRoutes(response.data);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  const addRoute = async () => {
    if (routeName.trim() === "") {
      alert("Please enter a route name");
      return;
    }

    try {
      if (editId !== null) {
        await axios.put(
          `http://localhost:5000/routes/${editId}`,
          {
            name: routeName,
          }
        );

        alert("Route updated successfully");
        setEditId(null);
      } else {
        await axios.post(
          "http://localhost:5000/routes",
          {
            name: routeName,
          }
        );

        alert("Route added successfully");
      }

      setRouteName("");
      fetchRoutes();
    } catch (error) {
      console.error("Error saving route:", error);
    }
  };

  const deleteRoute = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/routes/${id}`
      );

      fetchRoutes();
    } catch (error) {
      console.error("Error deleting route:", error);
    }
  };

  const editRoute = (route) => {
    setRouteName(route.name);
    setEditId(route.id);
  };

  const filteredRoutes = routes.filter((route) =>
    route.name
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

      <h1>Route Management</h1>

      <div className="form-container">
        <input
          type="text"
          placeholder="Route Name"
          value={routeName}
          onChange={(e) =>
            setRouteName(e.target.value)
          }
        />

        <br />
        <br />

        <button onClick={addRoute}>
          {editId !== null
            ? "Update Route"
            : "Add Route"}
        </button>
      </div>

      <hr />

      <h2>Total Routes: {routes.length}</h2>

      <input
        type="text"
        placeholder="Search Route"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <h2>Routes List</h2>

      {filteredRoutes.length === 0 ? (
        <p>No routes found.</p>
      ) : (
        filteredRoutes.map((route) => (
          <div
            key={route.id}
            className="route-card"
          >
            <p>
              <strong>Route:</strong>{" "}
              {route.name}
            </p>

            <button
              onClick={() =>
                editRoute(route)
              }
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() =>
                deleteRoute(route.id)
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

export default Routes;