import "./admindashboard.css";
import Adminsidebar from "../adminsidebar/adminsidebar";
import Header from "../../../components/header";
import { useEffect, useState } from "react";

function Admindashboard() {
  const [count, setCount] = useState({
    totalStudents: 0,
    totalStaffs: 0
  });
  const [students, setStudents] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch dashboard counts
    fetch("http://localhost:3001/api/auth/dashboard-count", {
      headers: { authorization: token }
    })
      .then((res) => res.json())
      .then((data) => {
        setCount(data);
      })
      .catch((err) => console.error("Error fetching dashboard count:", err));

    // Fetch students list
    fetch("http://localhost:3001/api/auth/students", {
      headers: { authorization: token }
    })
      .then((res) => res.json())
      .then((data) => {
        setStudents(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error fetching students:", err));

    // Fetch staffs list
    fetch("http://localhost:3001/api/auth/staffs", {
      headers: { authorization: token }
    })
      .then((res) => res.json())
      .then((data) => {
        setStaffs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching staffs:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="admin-layout-container">
      <Adminsidebar />

      <div className="content">
        <Header />

        <div className="admin-workspace">
          <div className="welcome-banner">
            <h2>School Administrator Dashboard</h2>
            <p>Monitor registrations, check staff listings, and manage student admissions.</p>
          </div>

          <div className="cards-grid">
            <div className="dashboard-card students">
              <div className="card-body">
                <h3>Total Students</h3>
                <h2>{count.totalStudents}</h2>
                <span className="card-trend">🎓 Active Enrollments</span>
              </div>
            </div>

            <div className="dashboard-card staffs">
              <div className="card-body">
                <h3>Total Staff Members</h3>
                <h2>{count.totalStaffs}</h2>
                <span className="card-trend">💼 Teachers & Principals</span>
              </div>
            </div>

            <div className="dashboard-card pending">
              <div className="card-body">
                <h3>System Status</h3>
                <h2>Active</h2>
                <span className="card-trend text-green">🟢 Server Online</span>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="loading-state">Loading portal records...</div>
          ) : (
            <div className="data-panels">
              {/* Students Panel */}
              <div className="data-panel">
                <h3>Recent Admissions</h3>
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.slice(0, 5).map((s) => (
                        <tr key={s.id}>
                          <td>{s.name}</td>
                          <td>{s.email}</td>
                          <td>{s.age}</td>
                        </tr>
                      ))}
                      {students.length === 0 && (
                        <tr>
                          <td colSpan="3" className="empty-msg">No students registered yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Staff Panel */}
              <div className="data-panel">
                <h3>School Staff Directory</h3>
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffs.map((st) => (
                        <tr key={st.id}>
                          <td>{st.name}</td>
                          <td>{st.email}</td>
                          <td>
                            <span className={`staff-role-badge ${st.role}`}>
                              {st.role}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {staffs.length === 0 && (
                        <tr>
                          <td colSpan="3" className="empty-msg">No staff registered yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admindashboard;