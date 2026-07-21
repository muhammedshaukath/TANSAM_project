import "./principalsidebar.css";
import { Link, useLocation } from "react-router-dom";

function Principalsidebar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="principalsidebar">
      <h3>Principal Panel</h3>
      <ul>
        <li>
          <Link to="/principaldashboard" className={path === "/principaldashboard" ? "active" : ""}>Dashboard</Link>
        </li>
        <li>
          <Link to="/login" onClick={() => { localStorage.clear(); }} className="logout-link">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default Principalsidebar;