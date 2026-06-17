import "./header.css";

function Header() {

 const user=
 JSON.parse(
  localStorage.getItem(
   "user"
  )
 );

 return(

  <div className="header">

   <h2>
    Welcome
   </h2>

   <h4>
    {user?.Name}
   </h4>

  </div>

 );

}

export default Header;