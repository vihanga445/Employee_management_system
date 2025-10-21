import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/add" element={<EmployeeForm isEdit={false} />} />
        <Route path="/edit/:id" element={<EmployeeForm isEdit={true} />} />
      </Routes>
    </Router>
  );
}

export default App;
