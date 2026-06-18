import "./teacherdashboard.css";
import Teachersidebar from "../teachersidebar/teachersidebar";
import Header from "../../../components/header";

function Teacherdashboard() {

  return (

    <div className="layout">
      <Teachersidebar />
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

export default Teacherdashboard;