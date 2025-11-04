// import { Link } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";


// const Navbar = () => {
//     const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   return (
//     <nav className="bg-blue-600 p-4 text-white shadow-lg">
//       <div className="container mx-auto flex justify-between items-center">
//         <h1 className="text-xl font-bold">Employee Admin</h1>
//         <div className="space-x-4">
//           <Link to="/" className="hover:underline">Home Tab</Link>
//           <Link to="/add" className="hover:underline">Add Employee</Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl font-semibold">Employee Management</h1>
      <div className="space-x-4">
        {!token ? (
          <>
            <Link to="/signup" className="text-white hover:underline">
              Signup
            </Link>
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
