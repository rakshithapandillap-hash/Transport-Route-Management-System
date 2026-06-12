import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Routes from "./pages/Routes";
import Drivers from "./pages/Drivers";
import Fees from "./pages/Fees";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <>
      {page === "dashboard" && (
        <Dashboard setPage={setPage} />
      )}

      {page === "students" && (
        <Students setPage={setPage} />
      )}

      {page === "routes" && (
        <Routes setPage={setPage} />
      )}

      {page === "drivers" && (
        <Drivers setPage={setPage} />
      )}

      {page === "fees" && (
        <Fees setPage={setPage} />
      )}
    </>
  );
}

export default App;