import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);

  //fetch all roles
  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/roles");
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error.message || error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // Add role function
  const addRole = async (role) => {
    try {
      const response = await axios.post("http://localhost:5000/roles", role);
      setRoles([...roles, response.data]);
      toast.success("Role added successfully.")
    } catch (error) {
      console.error("Error adding role:", error.message || error);
      toast.error("Failed to add role. Please try again.");
    }
  };

  // Update role function
  const updateRole = async (id, updatedRoleData) => {
    try {
      await axios.put(`http://localhost:5000/roles/${id}`, updatedRoleData);
      setRoles((prevRoles) =>
        prevRoles.map((role) =>
          role.id === id ? { ...role, ...updatedRoleData } : role
        )
      );
      toast.success("Role updated successfully.")
    } catch (error) {
      console.error("Error updating role:", error.message || error);
      toast.error("Failed to update role. Please try again.");
    }
  };

  // Delete role function
  const deleteRole = async (roleId) => {
    try {
      await axios.delete(`http://localhost:5000/roles/${roleId}`);
      setRoles((prevRoles) => prevRoles.filter((role) => role.id !== roleId));
      toast.success("Role deleted successfully.")
    } catch (error) {
      console.error("Error deleting role:", error.message || error);
      toast.error("Failed to delete role. Please try again.");
    }
  };

  return (
    <RoleContext.Provider value={{ roles, addRole, updateRole, deleteRole }}>
      {children}
    </RoleContext.Provider>
  );
};
