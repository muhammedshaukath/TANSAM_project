import "./adminsidebar.css";

function Adminsidebar() {

 return(

  <div className="adminsidebar">

   <h3>Admin Panel</h3>

   <ul>

    <a href="/admindashboard">Dashboard</a>

    <a href="/admissions">Admissions</a>

    <a href="/adminstaffs">Staffs</a>

    <a href="/adminfees">Fees</a>

    <a href="/adminprofile">Profile</a>

   </ul>

  </div>

 );

}

export default Adminsidebar;