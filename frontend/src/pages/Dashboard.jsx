import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:8080/api/employees", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEmployees(res.data))
      .catch(() => navigate("/login"));
  }, [navigate]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-3/4">
      <h2 className="text-2xl font-semibold mb-4">Employee Dashboard</h2>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id} className="border-b py-2">
            {emp.name} — {emp.position}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
