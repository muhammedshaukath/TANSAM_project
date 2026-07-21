import "./sidebar.css";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="sidebar">
      <h3>Control Panel</h3>
      <ul>
        <li>
          <Link to="/dashboard" className={path === "/dashboard" ? "active" : ""}>Dashboard</Link>
        </li>
        <li>
          <Link to="/roles" className={path === "/roles" ? "active" : ""}>Roles</Link>
        </li>
        <li>
          <Link to="/admindashboard" className={path === "/admindashboard" ? "active" : ""}>Admins</Link>
        </li>
        <li>
          <Link to="/login" onClick={() => { localStorage.clear(); }} className="logout-link">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;