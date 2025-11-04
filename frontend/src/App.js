import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import Home from "./pages/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<EmployeeList />} />
        <Route path="/add" element={<EmployeeForm isEdit={false} />} />
        <Route path="/edit/:id" element={<EmployeeForm isEdit={true} />} />

      </Routes>
    </Router>
  );
}

export default App;
