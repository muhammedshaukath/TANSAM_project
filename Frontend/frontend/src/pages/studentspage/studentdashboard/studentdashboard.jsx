import "./studentdashboard.css";
import Studentsidebar from "../studentsidebar/studentsidebar";
import Header from "../../../components/header";

function Studentdashboard() {

  return (
    <div className="layout">
      <Studentsidebar />

      <div className="content">

        <Header />

        <div className="cards">

          <div className="card">
            <p>Total Users</p>
          </div>

          <div className="card">
            <p>Total Admins</p>
          </div>

        </div>

      </div>
    </div>
  );

}

export default Studentdashboard;