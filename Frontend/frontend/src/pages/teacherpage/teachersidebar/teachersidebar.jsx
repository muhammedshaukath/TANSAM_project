import "./teachersidebar.css";
import { Link, useLocation } from "react-router-dom";

function Teachersidebar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="teachersidebar">
      <h3>Teacher Panel</h3>
      <ul>
        <li>
          <Link to="/teacherdashboard" className={path === "/teacherdashboard" ? "active" : ""}>Dashboard</Link>
        </li>
        <li>
          <Link to="/login" onClick={() => { localStorage.clear(); }} className="logout-link">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default Teachersidebar;