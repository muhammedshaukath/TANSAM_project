import {
 BrowserRouter,
 Routes,
 Route
} from "react-router-dom";

import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Dashboard from "./pages/dashboard/dashboard";
import Roles from "./pages/roles/roles";
import Admindashboard from "./pages/Adminpage/admindashboard/admindashboard"  
import Studentdashboard from "./pages/studentspage/studentdashboard/studentdashboard";
import Principaldashboard from "./pages/principalpage/principaldashboard/principaldashboard";
import Teacherdashboard from "./pages/teacherpage/teacherdashboard/teacherdashboard";
import Admissions from "./pages/Adminpage/admissions/admissions";
import Adminstaffs from "./pages/Adminpage/adminstaffs/adminstaffs";

function App() {

 return (

  <BrowserRouter>

   <Routes>

    <Route
      path="/"
      element={<Login />}
    />

    <Route
      path="/login"
      element={<Login />}
    />

    <Route
      path="/register"
      element={<Register />}
    />

    <Route
      path="/dashboard"
      element={<Dashboard />}
    />

    <Route
      path="/roles"
      element={<Roles/>}
    />

    <Route
      path="/admindashboard"
      element={<Admindashboard/>}
    />

    <Route
      path="/studentdashboard"
      element={<Studentdashboard/>}
    />
    
    <Route
      path="/principaldashboard"
      element={<Principaldashboard/>}
    />
    
    <Route
      path="/teacherdashboard"
      element={<Teacherdashboard/>}
    />
    
    <Route
      path="/admissions"
      element={<Admissions/>}
    />
    
    <Route
      path="/adminstaffs"
      element={<Adminstaffs/>}
    />

   </Routes>

  </BrowserRouter>

 );

}

export default App;