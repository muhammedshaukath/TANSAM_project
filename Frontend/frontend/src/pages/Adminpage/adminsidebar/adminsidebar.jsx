import "./adminsidebar.css";
import { Link, useLocation } from "react-router-dom";

function Adminsidebar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="adminsidebar">
      <h3>Admin Panel</h3>
      <ul>
        <li>
          <Link to="/admindashboard" className={path === "/admindashboard" ? "active" : ""}>Dashboard</Link>
        </li>
        <li>
          <Link to="/admissions" className={path === "/admissions" ? "active" : ""}>Admissions</Link>
        </li>
        <li>
          <Link to="/adminstaffs" className={path === "/adminstaffs" ? "active" : ""}>Staffs</Link>
        </li>
        <li>
          <Link to="/login" onClick={() => { localStorage.clear(); }} className="logout-link">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default Adminsidebar;