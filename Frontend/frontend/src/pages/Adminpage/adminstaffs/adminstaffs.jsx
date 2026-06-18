import "./adminstaffs.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";       // to redirect to login page after registration
import BASE_URL from "../../../services/api.js";         

function Adminstaffs() {

 const navigate = useNavigate();

 const [form,setForm] = useState({        // form is an object that will store the values of the input fields

   name:"",
   email:"",
   password:"",
   age:"",
   role:""

 });

 const handleChange = (e)=>{

   setForm({
     ...form,
     [e.target.name]:e.target.value
   });

 };

 const handleSubmit = async(e)=>{

   e.preventDefault();

   const response =
   await fetch(
    `${BASE_URL}/adminstaffs`,
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(form)
    }
   );

   const data =
   await response.json();

   alert(data.message);

   navigate("/");

 };

 return(

  <div className="adminstaffs-container">

   <h2>Staffs Registration</h2>

   <form
    onSubmit={handleSubmit}
   >

    <input
     name="name"
     placeholder="Name"
     onChange={handleChange}
    />

    <input
     name="email"
     placeholder="Email"
     onChange={handleChange}
    />

    <input
     name="password"
     placeholder="Password"
     onChange={handleChange}
    />

    <input
     name="age"
     placeholder="Age"
     onChange={handleChange}
    />

    <select name="role" onChange={handleChange} defaultValue="">
       <option value="" disabled hidden>Select Role</option>
       <option value="teacher">Teacher</option>
      <option value="principal">Principal</option>
    </select>


    <button>
      Register
    </button>
    <p>
 Already have an account?
 <a href="/login">
  Login
 </a>
</p>

   </form>

  </div>

 );

}

export default Adminstaffs;