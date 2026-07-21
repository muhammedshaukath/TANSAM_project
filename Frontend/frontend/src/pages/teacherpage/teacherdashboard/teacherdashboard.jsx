import React, { useEffect, useState } from "react";
import "./teacherdashboard.css";
import Teachersidebar from "../teachersidebar/teachersidebar";
import Header from "../../../components/header";

function Teacherdashboard() {
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [notices, setNotices] = useState([
    { id: 1, topic: "Math Homework Assignment", content: "Solve exercises 4.1 to 4.5 from the geometry textbook. Submit by Friday.", date: "2026-07-21" }
  ]);
  const [newNotice, setNewNotice] = useState({ topic: "", content: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const localUser = JSON.parse(localStorage.getItem("user"));
    setUser(localUser);

    fetch("http://localhost:3001/api/auth/students", {
      headers: { authorization: token }
    })
      .then((res) => res.json())
      .then((data) => {
        setStudents(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error fetching students for teacher:", err));
  }, []);

  const handleNoticeSubmit = (e) => {
    e.preventDefault();
    if (!newNotice.topic || !newNotice.content) {
      alert("Please fill in all notice fields");
      return;
    }
    const createdNotice = {
      id: Date.now(),
      topic: newNotice.topic,
      content: newNotice.content,
      date: new Date().toISOString().split('T')[0]
    };
    setNotices([createdNotice, ...notices]);
    setNewNotice({ topic: "", content: "" });
    alert("Notice published successfully!");
  };

  return (
    <div className="teacher-layout">
      <Teachersidebar />

      <div className="content">
        <Header />

        <div className="teacher-workspace">
          <div className="teacher-hero">
            <div className="hero-text">
              <h1>Welcome, {user?.name || "Teacher"}!</h1>
              <p>Post classroom announcements, review student lists, and upload lectures.</p>
            </div>
            <div className="teacher-info">
              <span>👨‍🏫 Role: Educator</span>
              <span>🎓 Students Managed: {students.length}</span>
            </div>
          </div>

          <div className="teacher-grid">
            {/* Left Column: Form and Notices */}
            <div className="left-column">
              {/* Notice Publisher */}
              <div className="workspace-panel publish-panel">
                <h2>Publish New Notice</h2>
                <form onSubmit={handleNoticeSubmit}>
                  <input
                    type="text"
                    placeholder="Notice Title / Subject"
                    value={newNotice.topic}
                    onChange={(e) => setNewNotice({ ...newNotice, topic: e.target.value })}
                  />
                  <textarea
                    placeholder="Type detailed class announcement here..."
                    rows="4"
                    value={newNotice.content}
                    onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                  ></textarea>
                  <button type="submit">Publish Announcement</button>
                </form>
              </div>

              {/* Notice Board */}
              <div className="workspace-panel notice-list-panel">
                <h2>Active Notices</h2>
                <div className="notices-list">
                  {notices.map((n) => (
                    <div key={n.id} className="notice-card">
                      <div className="notice-header">
                        <h4>{n.topic}</h4>
                        <span className="notice-date">{n.date}</span>
                      </div>
                      <p>{n.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Students List */}
            <div className="right-column">
              <div className="workspace-panel students-list-panel">
                <h2>Student Roster ({students.length})</h2>
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
                      {students.map((s) => (
                        <tr key={s.id}>
                          <td className="student-name">{s.name}</td>
                          <td>{s.email}</td>
                          <td>{s.age} yrs</td>
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
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Teacherdashboard;