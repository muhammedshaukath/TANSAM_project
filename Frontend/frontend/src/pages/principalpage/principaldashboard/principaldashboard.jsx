import React, { useEffect, useState } from "react";
import "./principaldashboard.css";
import Principalsidebar from "../pricipalsidebar/principalsidebar";
import Header from "../../../components/header";

function Principaldashboard() {
  const [user, setUser] = useState(null);
  const [count, setCount] = useState({ totalStudents: 0, totalStaffs: 0 });
  const [staffs, setStaffs] = useState([]);
  const [complaints, setComplaints] = useState([
    { id: 1, from: "John Doe (Parent)", subject: "Physics Class Quality", message: "My son mentions they have not covered lab works yet.", status: "Pending" },
    { id: 2, from: "Emily Watson (Student)", subject: "Cafeteria Sanitization", message: "Water dispensers need cleaning.", status: "Resolved" }
  ]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const localUser = JSON.parse(localStorage.getItem("user"));
    setUser(localUser);

    fetch("http://localhost:3001/api/auth/dashboard-count", {
      headers: { authorization: token }
    })
      .then((res) => res.json())
      .then((data) => {
        setCount(data);
      })
      .catch((err) => console.error("Error fetching dashboard count:", err));

    fetch("http://localhost:3001/api/auth/staffs", {
      headers: { authorization: token }
    })
      .then((res) => res.json())
      .then((data) => {
        setStaffs(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error fetching staffs for principal:", err));
  }, []);

  const resolveComplaint = (id) => {
    setComplaints(complaints.map(c => c.id === id ? { ...c, status: "Resolved" } : c));
    alert("Complaint marked as resolved!");
  };

  return (
    <div className="principal-layout">
      <Principalsidebar />

      <div className="content">
        <Header />

        <div className="principal-workspace">
          <div className="principal-hero">
            <div className="hero-text">
              <h1>Welcome, Principal {user?.name || "Administrator"}!</h1>
              <p>Observe school statistics, manage staff records, and address feedback.</p>
            </div>
            <div className="principal-info">
              <span>🏛️ Role: Principal (Leader)</span>
              <span>🎓 Students: {count.totalStudents}</span>
              <span>💼 Staff: {count.totalStaffs}</span>
            </div>
          </div>

          <div className="principal-grid">
            {/* Left: Staff Directory */}
            <div className="workspace-panel staff-panel">
              <h2>Faculty Directory ({staffs.length})</h2>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Designation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffs.map((st) => (
                      <tr key={st.id}>
                        <td className="font-bold">{st.name}</td>
                        <td>{st.email}</td>
                        <td>
                          <span className={`designation-tag ${st.role}`}>
                            {st.role.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {staffs.length === 0 && (
                      <tr>
                        <td colSpan="3" className="empty-msg">No staff records registered.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Complaints Panel */}
            <div className="workspace-panel feedback-panel">
              <h2>Feedback & Complaints Inbox</h2>
              <div className="complaints-list">
                {complaints.map((c) => (
                  <div key={c.id} className="complaint-card">
                    <div className="complaint-meta">
                      <span className="complaint-from">{c.from}</span>
                      <span className={`complaint-status ${c.status.toLowerCase()}`}>
                        {c.status}
                      </span>
                    </div>
                    <h4>{c.subject}</h4>
                    <p>{c.message}</p>
                    {c.status === "Pending" && (
                      <button className="resolve-btn" onClick={() => resolveComplaint(c.id)}>
                        Mark Resolved
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Principaldashboard;