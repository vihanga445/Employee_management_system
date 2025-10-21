import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const res = await axios.get("http://localhost:8080/api/v1/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this employee?")) {
      await axios.delete(`http://localhost:8080/api/v1/employees/${id}`);
      alert("Employee deleted successfully");
      fetchEmployees();
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>
      <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow-md">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">First Name</th>
            <th className="py-2 px-4 border">Last Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="text-center border-b hover:bg-gray-100">
              <td className="py-2 px-4 border">{emp.id}</td>
              <td className="py-2 px-4 border">{emp.firstName}</td>
              <td className="py-2 px-4 border">{emp.lastName}</td>
              <td className="py-2 px-4 border">{emp.emailId}</td>
              <td className="py-2 px-4 border space-x-2">
                <Link
                  to={`/edit/${emp.id}`}
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(emp.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
