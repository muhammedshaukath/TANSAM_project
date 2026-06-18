import "./principaldashboard.css";
import Principalsidebar from "../pricipalsidebar/principalsidebar";
import Header from "../../../components/header";

function Principaldashboard() {

  return (
    <div className="layout">
      <Principalsidebar />
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

export default Principaldashboard;