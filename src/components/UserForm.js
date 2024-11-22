import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { RoleContext } from "../context/RoleContext";

const UserForm = ({ onClose, user }) => {
  const { addUser, updateUser } = useContext(UserContext);
  const { roles } = useContext(RoleContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "active",
  });

  // Set the form data if editing an existing user
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    }
  }, [user]);

  // Handle changes to form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (user) {
      updateUser(user.id, formData); // Update existing user if `user` is passed as prop
    } else {
      addUser(formData); // Add new user if `user` is not passed
    }

    onClose();
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">{user ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter user name"
            value={formData.name}
            onChange={handleChange}
            className="border w-full px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter user email"
            value={formData.email}
            onChange={handleChange}
            className="border w-full px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border w-full px-3 py-2"
            required
          >
            <option value="">Select a Role</option>
            {roles && roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border w-full px-3 py-2"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
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

export default UserForm;