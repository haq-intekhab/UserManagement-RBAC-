import React, { useState, useEffect, useContext } from "react";
import { RoleContext } from "../context/RoleContext";

const RoleForm = ({ onClose, role }) => {
  const { addRole, updateRole } = useContext(RoleContext);

  const [formData, setFormData] = useState({
    name: "",
    permissions: [],
  });

  const availablePermissions = ["create", "read", "write", "delete"];

  // Set the form data if editing a role
  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name,
        permissions: role.permissions,
      });
    }
  }, [role]);

  // Handle changes to form input fields
  const handleChange = (e) => {
    const { name, checked, value } = e.target;

    if (name === "permissions") {
      // Handle checkbox selection for permissions
      if (checked) {
        setFormData((prev) => ({
          ...prev,
          permissions: [...prev.permissions, value],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          permissions: prev.permissions.filter((perm) => perm !== value),
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role) {
      updateRole(role.id, formData); // If editing, update the existing role
    } else {
      addRole(formData); // If adding, add a new role
    }
    onClose();
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">{role ? "Edit Role" : "Add Role"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Role Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter role name"
            value={formData.name}
            onChange={handleChange}
            className="border w-full px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Permissions</label>
          <div className="space-y-2">
            {availablePermissions.map((permission) => (
              <div key={permission} className="flex items-center">
                <input
                  type="checkbox"
                  name="permissions"
                  value={permission}
                  checked={formData.permissions.includes(permission)}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label>{permission}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <button type="button" onClick={onClose} className="mr-4">
            Cancel
          </button>
          <button type="submit" className="bg-[#3ad7d7] text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoleForm;

