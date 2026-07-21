import React, { useEffect, useState } from "react";
import "./superadmindashboard.css";
import Header from "../../../components/header";
import { Link, useNavigate } from "react-router-dom";

function Superadmindashboard() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    superAdmins: 0,
    admins: 0,
    teachers: 0,
    principals: 0,
    students: 0,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Fetch all students (role=student)
      const studentsRes = await fetch("http://localhost:3001/api/auth/students", {
        headers: { authorization: token },
      });
      const studentsData = await studentsRes.json();

      // Fetch all staffs (admin, teacher, principal)
      const staffsRes = await fetch("http://localhost:3001/api/auth/staffs", {
        headers: { authorization: token },
      });
      const staffsData = await staffsRes.json();

      // Combine users (and add the superadmin self)
      const currentUser = JSON.parse(localStorage.getItem("user"));
      let combined = [];
      if (Array.isArray(studentsData)) combined = [...combined, ...studentsData];
      if (Array.isArray(staffsData)) combined = [...combined, ...staffsData];
      if (currentUser) {
        // Ensure superadmin is in the list
        if (!combined.some(u => u.email === currentUser.email)) {
          combined.push(currentUser);
        }
      }
      setUsers(combined);

      // Calculate stats
      const counts = {
        totalUsers: combined.length,
        superAdmins: combined.filter(u => u.role === "superadmin").length,
        admins: combined.filter(u => u.role === "admin").length,
        teachers: combined.filter(u => u.role === "teacher").length,
        principals: combined.filter(u => u.role === "principal").length,
        students: combined.filter(u => u.role === "student").length,
      };
      setStats(counts);

      // Fetch roles
      const rolesRes = await fetch("http://localhost:3001/api/auth/roles", {
        headers: { authorization: token },
      });
      if (rolesRes.ok) {
        const rolesData = await rolesRes.json();
        setRoles(rolesData);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch system data");
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="superadmin-layout">
      {/* Sidebar */}
      <aside className="superadmin-sidebar">
        <div className="sidebar-brand">
          <h2>SuperConsole</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/superadmin-dashboard" className="nav-item active">
            <span className="icon">📊</span> Dashboard
          </Link>
          <Link to="/roles" className="nav-item">
            <span className="icon">🔑</span> Manage Roles
          </Link>
          <Link to="/register" className="nav-item">
            <span className="icon">➕</span> Add Admin
          </Link>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="superadmin-content">
        <Header />

        <div className="content-container">
          <div className="welcome-banner">
            <h1>System Administrator Control Panel</h1>
            <p>Real-time analytics and global user management platform.</p>
          </div>

          {error && <div className="error-alert">{error}</div>}

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card total">
              <div className="stat-info">
                <h3>Total Accounts</h3>
                <p className="stat-number">{stats.totalUsers}</p>
              </div>
              <div className="stat-icon">👥</div>
            </div>
            <div className="stat-card admin">
              <div className="stat-info">
                <h3>Admins</h3>
                <p className="stat-number">{stats.admins}</p>
              </div>
              <div className="stat-icon">⚙️</div>
            </div>
            <div className="stat-card teacher">
              <div className="stat-info">
                <h3>Teachers</h3>
                <p className="stat-number">{stats.teachers}</p>
              </div>
              <div className="stat-icon">👨‍🏫</div>
            </div>
            <div className="stat-card student">
              <div className="stat-info">
                <h3>Students</h3>
                <p className="stat-number">{stats.students}</p>
              </div>
              <div className="stat-icon">🎓</div>
            </div>
            <div className="stat-card principal">
              <div className="stat-info">
                <h3>Principals</h3>
                <p className="stat-number">{stats.principals}</p>
              </div>
              <div className="stat-icon">🏛️</div>
            </div>
          </div>

          {/* Users Table Section */}
          <div className="panel-section">
            <div className="section-header">
              <h2>User Directory ({users.length} accounts found)</h2>
              <button className="refresh-btn" onClick={fetchData}>
                🔄 Refresh Directory
              </button>
            </div>

            <div className="table-responsive">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td>#{u.id || "N/A"}</td>
                      <td className="font-bold">{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.age || "—"}</td>
                      <td>
                        <span className={`role-badge ${u.role}`}>
                          {u.role ? u.role.toUpperCase() : "USER"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System Roles Available */}
          <div className="panel-section half-width">
            <div className="section-header">
              <h2>Registered System Roles</h2>
              <Link to="/roles" className="action-link">Edit Roles &rarr;</Link>
            </div>
            <div className="roles-list-simple">
              {roles.length > 0 ? (
                roles.map(r => (
                  <div key={r.id} className="role-item-card">
                    <span className="role-dot"></span>
                    <span className="role-name-text">{r.role_name}</span>
                  </div>
                ))
              ) : (
                <p className="no-data">No custom roles defined. Standard roles apply.</p>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Superadmindashboard;
