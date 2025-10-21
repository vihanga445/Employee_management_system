import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeForm = ({ isEdit }) => {
  const [employee, setEmployee] = useState({ firstName: "", lastName: "", emailId: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:8080/api/v1/employees/${id}`)
        .then(res => setEmployee(res.data));
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await axios.put(`http://localhost:8080/api/v1/employees/${id}`, employee);
      alert("Employee updated successfully");
    } else {
      await axios.post("http://localhost:8080/api/v1/employees", employee);
      alert("Employee added successfully");
    }
    navigate("/");
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit Employee" : "Add New Employee"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded shadow"
      >
        <label className="block mb-2 text-gray-700">First Name</label>
        <input
          type="text"
          value={employee.firstName}
          onChange={(e) => setEmployee({ ...employee, firstName: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2 text-gray-700">Last Name</label>
        <input
          type="text"
          value={employee.lastName}
          onChange={(e) => setEmployee({ ...employee, lastName: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2 text-gray-700">Email</label>
        <input
          type="email"
          value={employee.emailId}
          onChange={(e) => setEmployee({ ...employee, emailId: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
        >
          {isEdit ? "Update Employee" : "Add Employee"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
