import "./register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";  // useNavigate is a hook from react-router-dom that allows us to programmatically navigate to different routes in our application. We will use it to redirect the user to the login page after successful registration.
import BASE_URL from "../../services/api";

function Register() {

 const navigate = useNavigate();

 const [form,setForm] = useState({

   name:"",
   email:"",
   password:"",
   age:"",
   role:"admin"

 });

 const handleChange = (e)=>{ // handleChange is a function that updates the form state whenever the user types in the input fields. It uses the name attribute of the input fields to determine which field to update in the form state.

   setForm({
     ...form,
     [e.target.name]:e.target.value
   });

 };

 const handleSubmit = async(e)=>{ // handleSubmit is an asynchronous function that is called when the user submits the registration form. It sends a POST request to the backend API with the form data to create a new user. If the registration is successful, it alerts the user with a message and navigates them to the login page.

   e.preventDefault();

   const response = // We use the fetch API to send a POST request to the backend API at the /register endpoint. We include the form data in the request body as a JSON string, and set the Content-Type header to application/json.
   await fetch(
    `${BASE_URL}/register`,
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

   navigate("/"); // After successful registration, we use the navigate function to redirect the user to the login page ("/").

 };

 return(

  <div class="register-container">

    <h1>To-do Task manager</h1>

   <h2>Register</h2>

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

    <select name="role" onChange={handleChange} required>
      <option value="" hidden >Select your Role:</option>
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>

    <input
     name="age"
     placeholder="Age"
     onChange={handleChange}
    />

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

export default Register;