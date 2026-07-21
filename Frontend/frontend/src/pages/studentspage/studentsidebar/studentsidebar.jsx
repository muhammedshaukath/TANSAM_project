import "./studentsidebar.css";
import { Link, useLocation } from "react-router-dom";

function Studentsidebar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="studentsidebar">
      <h3>Student Panel</h3>
      <ul>
        <li>
          <Link to="/studentdashboard" className={path === "/studentdashboard" ? "active" : ""}>Dashboard</Link>
        </li>
        <li>
          <Link to="/login" onClick={() => { localStorage.clear(); }} className="logout-link">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default Studentsidebar;