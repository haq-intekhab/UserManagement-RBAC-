import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  //fetching all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.message || error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user function
  const addUser = async (user) => {
    try {
      const response = await axios.post("http://localhost:5000/users", user);
      setUsers([...users, response.data]);
      toast.success('User added successfully.')
    } catch (error) {
      console.error("Error adding user:", error.message || error);
      toast.error("Failed to add user. Please try again.");
    }
  };

  // Update user function
  const updateUser = (id, updatedData) => {
    try {
      axios.put(`http://localhost:5000/users/${id}`, updatedData).then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, ...updatedData } : user
          )
        );
        toast.success('User updated successfully.')
      });
    } catch (error) {
      console.error("Error updating user:", error.message || error);
      toast.error("Failed to update user. Please try again.");
    }
  };

  //delete user function
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
      toast.success('User deleted successfully.');
      console.log("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error.message || error);
      alert("Failed to delete the user. Please try again.");
    }
  };
  

  return (
    <UserContext.Provider value={{ users,setUsers, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};
