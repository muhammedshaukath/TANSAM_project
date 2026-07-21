import React, { useEffect, useState } from "react";
import "./studentdashboard.css";
import Studentsidebar from "../studentsidebar/studentsidebar";
import Header from "../../../components/header";

function Studentdashboard() {
  const [user, setUser] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    // Load local storage user
    const localUser = JSON.parse(localStorage.getItem("user"));
    setUser(localUser);

    // Mock Announcements
    setAnnouncements([
      { id: 1, title: "Semester Exam Schedule Out", content: "The final semester exams begin on August 10th. Please download the date sheet from the timetable tab.", date: "July 20, 2026" },
      { id: 2, title: "Science Fair Registration", content: "All students interested in participating in the annual school Science Exhibition can register their teams by Friday.", date: "July 18, 2026" }
    ]);

    // Mock Timetable
    setTimetable([
      { day: "Monday", period1: "Mathematics (9:00 AM)", period2: "Physics (10:30 AM)", period3: "English (1:00 PM)" },
      { day: "Tuesday", period1: "Chemistry (9:00 AM)", period2: "Biology (10:30 AM)", period3: "History (1:00 PM)" },
      { day: "Wednesday", period1: "Computer Science (9:00 AM)", period2: "Mathematics (10:30 AM)", period3: "Physical Ed (1:00 PM)" },
      { day: "Thursday", period1: "Physics (9:00 AM)", period2: "Chemistry (10:30 AM)", period3: "English (1:00 PM)" },
      { day: "Friday", period1: "Biology (9:00 AM)", period2: "Arts & Crafts (10:30 AM)", period3: "Project Work (1:00 PM)" }
    ]);
  }, []);

  return (
    <div className="student-layout">
      <Studentsidebar />

      <div className="content">
        <Header />

        <div className="student-workspace">
          <div className="student-hero">
            <div className="hero-text">
              <h1>Welcome, {user?.name || "Student"}!</h1>
              <p>Keep track of your classes, review notices, and access course resources.</p>
            </div>
            <div className="student-info-badge">
              <span>🎓 Role: Student</span>
              <span>🎂 Age: {user?.age || "N/A"}</span>
              <span>📧 {user?.email}</span>
            </div>
          </div>

          <div className="grid-panels">
            {/* Timetable Panel */}
            <div className="workspace-panel timetable-panel">
              <h2>Weekly Timetable</h2>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Period 1</th>
                      <th>Period 2</th>
                      <th>Period 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timetable.map((t, idx) => (
                      <tr key={idx}>
                        <td className="day-highlight">{t.day}</td>
                        <td>{t.period1}</td>
                        <td>{t.period2}</td>
                        <td>{t.period3}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Announcements Panel */}
            <div className="workspace-panel announcements-panel">
              <h2>Notice Board</h2>
              <div className="announcements-list">
                {announcements.map((a) => (
                  <div key={a.id} className="announcement-item">
                    <div className="announcement-meta">
                      <span className="announcement-pin">📌</span>
                      <span className="announcement-date">{a.date}</span>
                    </div>
                    <h4>{a.title}</h4>
                    <p>{a.content}</p>
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

export default Studentdashboard;