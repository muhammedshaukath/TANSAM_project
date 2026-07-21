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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Roles() {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState("");

  const fetchRoles = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/roles", {
        headers: {
          authorization: localStorage.getItem("token")
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }
      const data = await response.json();
      setRoles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setRoles([]);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const addRole = async () => {
    if (!roleName.trim()) {
      alert("Role name cannot be empty");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/api/auth/roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({
          role_name: roleName
        })
      });
      const data = await response.json();
      alert(data.message || "Role added");
      setRoleName("");
      fetchRoles();
    } catch (err) {
      console.error(err);
      alert("Failed to add role");
    }
  };

  return (
    <div className="roles-container">
      <h2>Roles Management</h2>
      <div className="role-input-group" style={{ display: 'flex', gap: '10px', width: '40%', justifyContent: 'center', marginBottom: '30px' }}>
        <input
          placeholder="Role Name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          style={{ width: '60%' }}
        />
        <button onClick={addRole} style={{ width: '35%', marginTop: 0 }}>
          Add Role
        </button>
      </div>

      <div className="roles-list" style={{ width: '40%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {roles.map(role => (
          <div key={role.id} style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '12px 20px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            color: 'white'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8', marginRight: '15px', boxShadow: '0 0 8px #38bdf8' }}></span>
            <span style={{ textTransform: 'capitalize', fontWeight: 500 }}>{role.role_name}</span>
          </div>
        ))}
      </div>
      <Link to="/superadmin-dashboard" style={{ color: '#38bdf8', marginTop: '30px', textDecoration: 'none', fontWeight: 500 }}>
        &larr; Back to Dashboard
      </Link>
    </div>
  );
}

export default Roles;