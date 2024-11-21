import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((response) => setUsers(response.data));
  }, []);

  const addUser = (user) => {
    axios.post("http://localhost:5000/users", user).then((response) => {
      setUsers([...users, response.data]);
    });
  };

  const updateUser = (id, updatedData) => {
    console.log("update",updatedData)
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...user, ...updatedData } : user))
    );
  };

  const deleteUser = (userId) => {
    axios.delete(`http://localhost:5000/users/${userId}`).then(() => {
      setUsers(users.filter((user) => user.id !== userId));
    });
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};
