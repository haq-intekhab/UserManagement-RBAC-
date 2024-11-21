// import React, { useContext } from "react";
// import { RoleContext } from "../context/RoleContext";

// const RoleList = () => {
//   const { roles, deleteRole } = useContext(RoleContext);

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Roles</h2>
//       <table className="min-w-full table-auto">
//         <thead>
//           <tr>
//             <th className="px-4 py-2">Role</th>
//             <th className="px-4 py-2">Permissions</th>
//             <th className="px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {roles.map((role) => (
//             <tr key={role.id}>
//               <td className="border px-4 py-2">{role.name}</td>
//               <td className="border px-4 py-2">{role.permissions.join(", ")}</td>
//               <td className="border px-4 py-2">
//                 <button
//                   onClick={() => deleteRole(role.id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RoleList;

import React, { useContext, useState } from "react";
import { RoleContext } from "../context/RoleContext";
import RoleForm from "./RoleForm"; // Assuming you have a RoleForm component to handle add/edit
import Modal from "./Modal";

const RoleList = () => {
  const { roles, deleteRole, updateRole } = useContext(RoleContext); // Assuming updateRole is in context
  const [isEditing, setIsEditing] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  // Function to handle editing a role
  const handleEdit = (role) => {
    setEditingRole(role);
    setIsEditing(true);
  };

  // Function to close the edit modal
  const closeEditModal = () => {
    setIsEditing(false);
    setEditingRole(null);
  };

  return (
    <div>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Permissions</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="border px-4 py-2">{role.name}</td>
              <td className="border px-4 py-2">{role.permissions.join(", ")}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(role)} // Trigger edit action
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteRole(role.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show RoleForm in edit mode if isEditing is true */}
      {isEditing && (
        <Modal onClose={closeEditModal}>
            <RoleForm
          onClose={closeEditModal}
          role={editingRole} // Pass the role being edited to the form
        />
        </Modal>
        
      )}
    </div>
  );
};

export default RoleList;
