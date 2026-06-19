import "./admindashboard.css";
import Adminsidebar from "../adminsidebar/adminsidebar";
import Header from "../../../components/header";
import { useEffect, useState } from "react";

function Admindashboard() {
   const [count, setCount] = useState({
      totalStudents: 0,
      totalAdmins: 0
    });
  
    useEffect(() => {
  
      fetch(
        "http://localhost:3001/api/auth/dashboard-count",
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
    <Adminsidebar />

    <div className="content">

        <Header />

        { <div className="cards">

          <div className="card">
            <p>Total Students</p>
            <h2>{count.totalStudents}</h2>
          </div>

          <div className="card">
            <p>Total Staffs</p>
            <h2>{count.totalStaffs}</h2>
          </div>

          <div className="card">
            <p>Fee Pending</p>
            <h2>-</h2>
          </div>

        </div> }

      </div>
    </div>
  );

}

export default Admindashboard;