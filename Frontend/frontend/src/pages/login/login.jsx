import "./login.css";

import { useState } from "react";

import {
 useNavigate
} from "react-router-dom";

import BASE_URL from "../../services/api";

function Login() { // The Login component is a functional component that renders a login form. It uses the useState hook to manage the form state, and the useNavigate hook to programmatically navigate to the dashboard page after successful login.

 const navigate =
 useNavigate();

 const [form,setForm] =
 useState({

   email:"",
   password:""

 });

 const handleChange=(e)=>{ // handleChange is a function that updates the form state whenever the user types in the input fields. It uses the name attribute of the input fields to determine which field to update in the form state.

   setForm({
    ...form,
    [e.target.name]:
    e.target.value
   });

 };

 const handleSubmit= // handleSubmit is an asynchronous function that is called when the user submits the login form. It sends a POST request to the backend API with the form data to authenticate the user. If the login is successful, it stores the token and user information in localStorage, and navigates the user to the dashboard page.
 async(e)=>{

  e.preventDefault(); // e.preventDefault() is called to prevent the default form submission behavior, which would cause the page to reload. We want to handle the form submission with our own logic instead.

  const response=
  await fetch(
   `${BASE_URL}/login`,
   {
    method:"POST",
    headers:{
      "Content-Type":
      "application/json"
    },
    body:
    JSON.stringify(form)
   }
  );

  const data=
  await response.json();

  localStorage.setItem( // If the login is successful, we store the token and user information in localStorage. This allows us to persist the user's authentication state across page reloads and sessions. We can use this token to authenticate subsequent API requests to protected routes in our backend.
   "token",
   data.token
  );

  localStorage.setItem(
   "user",
   JSON.stringify(
    data.user
   )
  );

  navigate("/dashboard");

 };

 return(

  <div className="login-container"> 

   <h2>Login</h2>

   <form
    onSubmit={
      handleSubmit
    }
   >
    

    <input
      name="email"
      placeholder="Email"
      onChange={
        handleChange
      }
    />

    <input
      name="password"
      placeholder="Password"
      onChange={
        handleChange
      }
    />

    <button>
      Login
    </button>

    

   </form>

  </div>

 );

}

export default Login;