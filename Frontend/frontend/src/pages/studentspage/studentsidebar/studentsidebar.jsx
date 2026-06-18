import "./studentsidebar.css";

function Studentsidebar() {

 return(

  <div className="studentsidebar">

   <h3>student Panel</h3>

   <ul>

    <a href="/studentdashboard">Dashboard</a>

    <a href="/studentnotes">Notes</a>

    <a href="/studenttimetable">Time Table</a>

    <a href="/studentfees">Fees</a>

    <a href="/studentcomplaints">Complaints</a>

   </ul>

  </div>

 );

}

export default Studentsidebar;