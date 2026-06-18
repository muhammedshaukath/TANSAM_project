import "./sidebar.css";

function Sidebar() {

 return(

  <div className="sidebar">

   <h3>Admin Panel</h3>

   <ul>

    <a href="/dashboard">Dashboard</a>

    <a href="/roles">Roles</a>

    <a href="/users">Users</a>

    <a href="/admindashboard">Admins</a>

    <a href="/settings">Settings</a>

   </ul>

  </div>

 );

}

export default Sidebar;