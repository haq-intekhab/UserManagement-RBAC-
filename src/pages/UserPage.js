import {React, useState} from "react";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import Modal from "../components/Modal";

const UsersPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openUserForm = () => {
    setModalContent(<UserForm onClose={() => setShowModal(false)} />);
    setShowModal(true);
  };

  return (
    <div className="w-full mt-[70px]">
      <div className="flex px-8 py-4 justify-between items-center">
        <p className="text-xl font-semibold mb-4">User List</p>
        <button
          onClick={openUserForm}
          className="bg-[#3ad7d7] text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>

      <UserList />

      {/* Modal for adding user */}
      {showModal && <Modal onClose={() => setShowModal(false)}>{modalContent}</Modal>}
    </div>
  );
};

export default UsersPage;
