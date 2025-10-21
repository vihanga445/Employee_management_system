import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Employee Admin</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home Tab</Link>
          <Link to="/add" className="hover:underline">Add Employee</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
