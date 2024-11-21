import React from "react";
import RoleList from "../components/RoleList";
import RoleForm from "../components/RoleForm";
import Modal from "../components/Modal";

const RolesPage = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(null);

  const openRoleForm = () => {
    setModalContent(<RoleForm onClose={() => setShowModal(false)} />);
    setShowModal(true);
  };

  return (
    <div className="w-full px-8 py-4 mt-[70px]">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-semibold mb-4">Roles</p>
        <button
          onClick={openRoleForm}
          className="bg-[#3ad7d7] text-white px-4 py-2 rounded"
        >
          Add Role
        </button>
      </div>

      <RoleList />

      {/* Modal for adding role */}
      {showModal && <Modal onClose={() => setShowModal(false)}>{modalContent}</Modal>}
    </div>
  );
};

export default RolesPage;
