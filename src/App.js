// // src/App.js
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { UserProvider } from "./context/UserContext";
// import { RoleProvider } from "./context/RoleContext";
// import UserList from "./components/UserList";
// import RoleList from "./components/RoleList";
// import Modal from "./components/Modal";
// import UserForm from "./components/UserForm";
// import RoleForm from "./components/RoleForm";
// import { Link } from "react-router-dom";

// const App = () => {
//   const [showModal, setShowModal] = React.useState(false);
//   const [modalContent, setModalContent] = React.useState(null);

//   const openUserForm = () => {
//     setModalContent(<UserForm onClose={() => setShowModal(false)} />);
//     setShowModal(true);
//   };

//   const openRoleForm = () => {
//     setModalContent(<RoleForm onClose={() => setShowModal(false)} />);
//     setShowModal(true);
//   };

//   return (
//     <Router>
//       <UserProvider>
//         <RoleProvider>
//           <div className="container mx-auto p-4">
//             <nav className="mb-4">
//               <Link to="/" className="mr-4">
//                 Users
//               </Link>
//               <Link to="/roles" className="mr-4">
//                 Roles
//               </Link>
//             </nav>
//             <div className="mb-4">
//               <button
//                 onClick={openUserForm}
//                 className="bg-green-500 text-white px-4 py-2 rounded mr-2"
//               >
//                 Add User
//               </button>
//               <button
//                 onClick={openRoleForm}
//                 className="bg-green-500 text-white px-4 py-2 rounded"
//               >
//                 Add Role
//               </button>
//             </div>

//             <Routes>
//               <Route path="/" element={<UserList />} />
//               <Route path="/roles" element={<RoleList />} />
//             </Routes>

//             {showModal && <Modal onClose={() => setShowModal(false)}>{modalContent}</Modal>}
//           </div>
//         </RoleProvider>
//       </UserProvider>
//     </Router>
//   );
// };

// export default App;

// // src/App.js
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { UserProvider } from "./context/UserContext";
// import { RoleProvider } from "./context/RoleContext";
// import UserList from "./components/UserList";
// import RoleList from "./components/RoleList";
// import Modal from "./components/Modal";
// import UserForm from "./components/UserForm";
// import RoleForm from "./components/RoleForm";
// import NavBar from "./components/Navbar"; // Import the NavBar component

// const App = () => {
//   const [showModal, setShowModal] = React.useState(false);
//   const [modalContent, setModalContent] = React.useState(null);

//   const openUserForm = () => {
//     setModalContent(<UserForm onClose={() => setShowModal(false)} />);
//     setShowModal(true);
//   };

//   const openRoleForm = () => {
//     setModalContent(<RoleForm onClose={() => setShowModal(false)} />);
//     setShowModal(true);
//   };

//   return (
//     <Router>
//       <UserProvider>
//         <RoleProvider>
//           <div className="container mx-auto p-4">
//             {/* Use the NavBar component here */}
//             <NavBar />

//             <div className="mb-4">
//               <button
//                 onClick={openUserForm}
//                 className="bg-green-500 text-white px-4 py-2 rounded mr-2"
//               >
//                 Add User
//               </button>
//               <button
//                 onClick={openRoleForm}
//                 className="bg-green-500 text-white px-4 py-2 rounded"
//               >
//                 Add Role
//               </button>
//             </div>

//             <Routes>
//               <Route path="/" element={<UserList />} />
//               <Route path="/roles" element={<RoleList />} />
//             </Routes>

//             {showModal && <Modal onClose={() => setShowModal(false)}>{modalContent}</Modal>}
//           </div>
//         </RoleProvider>
//       </UserProvider>
//     </Router>
//   );
// };

// export default App;


// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { RoleProvider } from "./context/RoleContext";
import NavBar from "./components/Navbar"; // Import the NavBar component
import UsersPage from "./pages/UserPage"; // Import UsersPage
import RolesPage from "./pages/RolePage"; // Import RolesPage
import HomePage from "./pages/HomePage";
import './App.css';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <RoleProvider>
          <div >
            <NavBar />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/roles" element={<RolesPage />} />
            </Routes>
          </div>
        </RoleProvider>
      </UserProvider>
    </Router>
  );
};

export default App;
