import "./users.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";  // useNavigate is a hook from react-router-dom that allows us to programmatically navigate to different routes in our application. We will use it to redirect the user to the login page after successful registration.
import BASE_URL from "../../services/api";
