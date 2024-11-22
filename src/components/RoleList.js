import React, { useContext, useState } from "react";
import { RoleContext } from "../context/RoleContext";
import RoleForm from "./RoleForm";
import Modal from "./Modal";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

const RoleList = () => {
  const { roles, deleteRole } = useContext(RoleContext);
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

  const Pagination = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const maxPage = Math.ceil(data?.length / itemsPerPage);

    function currentPageData() {
      const startIndex = (currentPage - 1) * itemsPerPage;
      return data?.slice(startIndex, startIndex + itemsPerPage);
    }

    function goToPage(pageNumber) {
      setCurrentPage(pageNumber);
    }

    const renderPageNumbers = () => {
      const pageNumbers = [];
      let itemsToShow = 3; // Number of pages to show before and after the current page
      let start = Math.max(currentPage - itemsToShow, 1);
      let end = Math.min(currentPage + itemsToShow, maxPage);

      if (start > 1) {
        pageNumbers.push(1);
        if (start > 2) {
          pageNumbers.push("...");
        }
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (end < maxPage) {
        if (end < maxPage - 1) {
          pageNumbers.push("...");
        }
        pageNumbers.push(maxPage);
      }

      return pageNumbers?.map((number, index) =>
        number === "..." ? (
          <span key={index} className="page-item dots">
            {number}
          </span>
        ) : (
          <button
            key={index}
            onClick={() => goToPage(number)}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            {number}
          </button>
        )
      );
    };

    return (
      <div>
        {/* Render the current page's data */}
        {currentPageData()?.map((role, i) => (
          <div key={i} className="w-full flex gap-2 px-1 py-4 md:p-4 border-b">
            <div className="w-[70%] flex gap-2 md:justify-between items-center">
              <div className="w-[40%] flex">
                <p className="w-full pl-2 md:pl-10 text-[#1C2434] text-[14px] font-semibold overflow-hidden">
                  {role.name}
                </p>
              </div>
              <div className="w-[60%] flex">
                <p className="w-full pl-2 md:pl-10 text-[#1C2434] text-[14px] font-semibold overflow-auto">
                  {role.permissions.join(", ")}
                </p>
              </div>
            </div>
            <div className="w-[30%] flex ">
              <div className="w-full flex flex-col md:flex-row gap-1 md:gap-4 justify-center">
                <button
                  onClick={() => handleEdit(role)} // Trigger edit action
                  className="bg-[#61e0b6] text-white py-1 md:px-6 md:py-2 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteRole(role.id)}
                  className="bg-[#c4514b] text-white py-1 md:px-4 md:py-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center px-8  mt-7 sm:flex-row flex-col sm:gap-0 gap-4">
          {/* Pagination controls */}
          {/* Dropdown for items per page */}
          <div className="items-per-page">
            <label htmlFor="items-per-page">Items per page:</label>
            <select
              className="border-2 mx-2 rounded-md"
              id="items-per-page"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value="6">6</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
          <div className="flex gap-5">
            <button
              className="page-item"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <GrFormPrevious />
            </button>
            <div className="flex gap-3">{renderPageNumbers()}</div>
            <button
              className="page-item"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === maxPage}
            >
              <MdNavigateNext />
            </button>
          </div>

          <div className="current-page sm:block hidden">
            Page {currentPage} of {maxPage}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-max-screen h-fit relativ sm:mb-0 mb-10 ">
      <div className="w-full mb-6 mt-3 px-4">
        <div className="w-full h-fit bg-white px-1 py-4 shadow-md">
          <div className="w-full bg-[#F7F9FC] flex p-4">
            <div className="w-[70%] flex justify-between items-center">
              <div className="w-[30%] flex">
                <p className="w-full text-[#64748B] text-center text-[12px] font-semibold">
                  Role
                </p>
              </div>
              <div className="w-[70%] flex">
                <p className="w-full text-[#64748B] text-center text-[12px] font-semibold">
                  Permissions
                </p>
              </div>
            </div>
            <div className="w-[30%] flex">
              <p className="w-full text-[#64748B] text-center text-[12px] font-semibold">
                Action
              </p>
            </div>
          </div>

          <div className="w-full h-fit ">
            <Pagination data={roles} />
          </div>
        </div>
      </div>

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
