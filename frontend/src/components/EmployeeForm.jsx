import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeForm = ({ isEdit }) => {
  const [employee, setEmployee] = useState({ firstName: "", lastName: "", emailId: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      const token = localStorage.getItem("token");
      axios
        .get(`http://localhost:8080/api/v1/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setEmployee(res.data))
        .catch((err) => {
          console.error("Failed to fetch employee:", err);
          // If unauthorized, redirect to login
          if (err.response && (err.response.status === 401 || err.response.status === 403)) {
            navigate("/login");
          }
        });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (isEdit) {
        await axios.put(
          `http://localhost:8080/api/v1/employees/${id}`,
          employee,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Employee updated successfully");
      } else {
        await axios.post(
          "http://localhost:8080/api/v1/employees",
          employee,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Employee added successfully");
      }
      navigate("/list");
    } catch (err) {
      console.error("Failed to save employee:", err);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        alert("Session expired. Please login again.");
        navigate("/login");
      } else {
        alert("Failed to save employee. See console for details.");
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-md bg-white/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 20h14a1 1 0 001-1v-7a4 4 0 00-4-4H8a4 4 0 00-4 4v7a1 1 0 001 1z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{isEdit ? "Edit Employee" : "Add New Employee"}</h2>
              <p className="text-sm opacity-90">{isEdit ? "Change the employee details and save." : "Add a new employee to the system."}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
              <input
                type="text"
                value={employee.firstName}
                onChange={(e) => setEmployee({ ...employee, firstName: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
              <input
                type="text"
                value={employee.lastName}
                onChange={(e) => setEmployee({ ...employee, lastName: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
            <input
              type="email"
              value={employee.emailId}
              onChange={(e) => setEmployee({ ...employee, emailId: e.target.value })}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
            <p className="mt-2 text-xs text-gray-500">We'll use this email for employee communications (no spam).</p>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium shadow hover:from-blue-700 hover:to-indigo-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {isEdit ? "Update Employee" : "Add Employee"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-3 rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;