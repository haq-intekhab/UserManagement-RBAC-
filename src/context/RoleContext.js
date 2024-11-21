import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/roles").then((response) => setRoles(response.data));
  }, []);

  const addRole = (role) => {
    axios.post("http://localhost:5000/roles", role).then((response) => {
      setRoles([...roles, response.data]);
    });
  };

  // const updateRole = (role) => {
  //   axios.put(`http://localhost:5000/roles/${role.id}`, role).then((response) => {
  //     setRoles(roles.map((r) => (r.id === role.id ? response.data : r)));
  //   });
  // };
  const updateRole = (id, updatedRoleData) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === id ? { ...role, ...updatedRoleData } : role
      )
    );
  };

  const deleteRole = (roleId) => {
    axios.delete(`http://localhost:5000/roles/${roleId}`).then(() => {
      setRoles(roles.filter((role) => role.id !== roleId));
    });
  };

  return (
    <RoleContext.Provider value={{ roles, addRole, updateRole, deleteRole }}>
      {children}
    </RoleContext.Provider>
  );
};
