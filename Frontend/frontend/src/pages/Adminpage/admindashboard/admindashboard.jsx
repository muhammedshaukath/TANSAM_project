import "./admindashboard.css";
import Header from "../../../components/header";

function Admindashboard() {

  return (

    <div className="layout">

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

  );

}

export default Admindashboard;