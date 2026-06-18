import "./users.css";

import { useEffect, useState } from "react";

import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

function Dashboard() {

  const [count, setCount] = useState({
    totalUsers: 0,
    totalAdmins: 0
  });

  useEffect(() => {

    fetch(
      "http://localhost:3001/api/auth/users-count",
      {
        headers: {
          authorization:
            localStorage.getItem("token")
        }
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCount(data);
      });

  }, []);

  return (

    <div className="layout">

      <Sidebar />

      <div className="content">

        <Header />

        <div className="cards">

          <div className="card">
            <p>Total Users</p>
            <h2>{count.totalUsers}</h2>
          </div>

          <div className="card">
            <p>Total Admins</p>
            <h2>{count.totalAdmins}</h2>
          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;