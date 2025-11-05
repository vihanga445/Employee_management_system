
import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setOpen(false);
    navigate("/");
  };

  const linkClass = (isActive) =>
    `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">EM</div>
              <span className="text-lg font-semibold text-gray-800">Employee Management</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            <NavLink to="/" className={({ isActive }) => linkClass(isActive)}>
              Home
            </NavLink>
            {token && (
              <NavLink to="/list" className={({ isActive }) => linkClass(isActive)}>
                Employee List
              </NavLink>
            )}
            {token && (
              <NavLink to="/add" className={({ isActive }) => linkClass(isActive)}>
                Add Employee
              </NavLink>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {!token ? (
              <>
                <NavLink to="/signup" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
                  Sign up
                </NavLink>
                <NavLink to="/login" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
                  Login
                </NavLink>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-700">Signed in</div>
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm font-medium"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100"
              aria-expanded={open}
            >
              <span className="sr-only">Open menu</span>
              {/* Hamburger icon */}
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink to="/" onClick={() => setOpen(false)} className={({ isActive }) => `block ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Home</NavLink>
            {token && <NavLink to="/list" onClick={() => setOpen(false)} className={({ isActive }) => `block ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Employee List</NavLink>}
            {token && <NavLink to="/add" onClick={() => setOpen(false)} className={({ isActive }) => `block ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Add Employee</NavLink>}
            {!token ? (
              <>
                <NavLink to="/signup" onClick={() => setOpen(false)} className={({ isActive }) => `block ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Sign up</NavLink>
                <NavLink to="/login" onClick={() => setOpen(false)} className={({ isActive }) => `block ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>Login</NavLink>
              </>
            ) : (
              <button onClick={handleLogout} className="w-full text-left text-gray-700 hover:text-blue-600">Sign Out</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
