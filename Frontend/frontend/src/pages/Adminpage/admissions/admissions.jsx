import "./admissions.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";  // useNavigate is a hook from react-router-dom that allows us to programmatically navigate to different routes in our application. We will use it to redirect the user to the login page after successful registration.
import BASE_URL from "../../../services/api";

function Admissions() {

 const navigate = useNavigate();

 const [form,setForm] = useState({

   name:"",
   email:"",
   password:"",
   age:"",
   role:"student"

 });

 const handleChange = (e)=>{ // handleChange is a function that updates the form state whenever the user types in the input fields. It uses the name attribute of the input fields to determine which field to update in the form state.

   setForm({
     ...form,
     [e.target.name]:e.target.value
   });

 };

 const handleSubmit = async(e)=>{ // handleSubmit is an asynchronous function that is called when the user submits the registration form. It sends a POST request to the backend API with the form data to create a new user. If the registration is successful, it alerts the user with a message and navigates them to the login page.

   e.preventDefault();

    const response = await fetch(
     `${BASE_URL}/register`,
     {
       method:"POST",
       headers:{
         "Content-Type":"application/json"
       },
       body:JSON.stringify(form)
     }
    );

    const data = await response.json();

    alert(data.message || "Registration response received");

    if (response.ok) {
      navigate("/admindashboard");
    }
  };

 return(

  <div className="admissions-container">

   <h2>Student Admission</h2>

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
     type="password"
     onChange={handleChange}
    />

    <input
     name="age"
     placeholder="Age"
     onChange={handleChange}
    />
    
    <button type="submit">Register</button>
    
    <p>
</p>

   </form>

  </div>

 );

}

export default Admissions;