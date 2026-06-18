import "./admindashboard.css";
import Adminsidebar from "../adminsidebar/adminsidebar";
import Header from "../../../components/header";

function Admindashboard() {

  return (
  <div className="layout">
    <Adminsidebar />

    <div className="content">

        <Header />

        { <div className="cards">

          <div className="card">
            <p>Total Users</p>
          </div>

          <div className="card">
            <p>Total Admins</p>
          </div>

        </div> }

      </div>
    </div>
  );

}

export default Admindashboard;