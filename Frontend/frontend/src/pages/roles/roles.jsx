// import "./roles.css";

// import { useState } from "react";

// import {
//  useNavigate
// } from "react-router-dom";

// import BASE_URL from "../../services/api.js";

// function Roles() {

//   const [showModal, setShowModal] =
//   useState(false);

//   const [role, setRole] =
//   useState("");

//   const handleSave = () => {

//     if(role.trim() === ""){
//       alert("Please enter a role");
//       return;
//     }

//     alert(`Role "${role}" added`);

//     setRole("");
//     setShowModal(false);

//   };

//   return (

//     <div className="roles-page">

//       <div className="roles-header">

//         <h2>Roles Management</h2>

//         <button
//           className="add-role-btn"
//           onClick={() => setShowModal(true)}
//         >
//           + Add Role
//         </button>

//       </div>

//       <div className="roles-content">

//         <p>
//           Manage user roles and permissions.
//         </p>

//       </div>

//       {showModal && (

//         <div className="modal-overlay">

//           <div className="modal">

//             <h2>Add Role</h2>

//             <input
//               type="text"
//               placeholder="Enter role name"
//               value={role}
//               onChange={(e) =>
//                 setRole(e.target.value)
//               }
//             />

//             <div className="modal-buttons">

//               <button
//                 className="save-btn"
//                 onClick={handleSave}
//               >
//                 Save
//               </button>

//               <button
//                 className="cancel-btn"
//                 onClick={() => {
//                   setShowModal(false);
//                   setRole("");
//                 }}
//               >
//                 Cancel
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//     </div>

//   );

// }

// export default Roles;


import "./roles.css";
import { useEffect,useState } from "react";
import {
 useNavigate
} from "react-router-dom";

import BASE_URL from "../../services/api.js";

function Roles(){

 const [roles,setRoles] =
 useState([]);

 const [roleName,setRoleName] =
 useState("");

useEffect(() => {
  fetch("http://localhost:3001/api/auth/roles", {
    headers: {
      authorization: localStorage.getItem("token")
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      setRoles(Array.isArray(data) ? data : []);
    })
    .catch(err => {
      console.error(err);
      setRoles([]);
    });
}, []);

 const addRole = async()=>{

   await fetch(
    "http://localhost:3001/api/auth/roles",
    {
      method:"POST",
      headers:{
        "Content-Type":
        "application/json",
        authorization:
        localStorage.getItem(
          "token"
        )
      },
      body:JSON.stringify({
        role_name:roleName
      })
    }
   );

 };

 return(

  <div class="roles-container">

   <h2>Roles</h2>

   <input
    placeholder="Role Name"
    onChange={(e)=>
      setRoleName(
       e.target.value
      )
    }
   />

   <button
    onClick={addRole}
   >
    Add Role
   </button>

   {
    roles.map(role=>(

      <p key={role.id}>
        {role.role_name}
      </p>

    ))
   }

  </div>

 );

}

export default Roles;