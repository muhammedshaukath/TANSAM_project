import "./teachersidebar.css";

function Teachersidebar() {

 return(

  <div className="teachersidebar">

   <h3>Teacher Panel</h3>

   <ul>

    <a href="/teacherdashboard">Dashboard</a>

    <a href="/teacherreports">Reports</a>

    <a href="/teachernotes">Notes</a>

    <a href="/teachertimetable">Time Table</a>

   </ul>

  </div>

 );

}

export default Teachersidebar;