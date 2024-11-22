import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Modal from "./Modal";
import UserForm from "./UserForm";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

const UserList = () => {
  const { users, setUsers, deleteUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortType, setSortType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openEditForm = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    console.log(sortValue);
    setSortType(sortValue);
    sortData(sortValue);
  };

  const sortData = (type) => {
    let newData = [...users];
    switch (type) {
      case "Name":
        newData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Email":
        newData.sort((a, b) => a.email.localeCompare(b.email));
        break;
      case "Status":
        newData.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default:
        break;
    }
    setUsers(newData);
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
        {filteredUsers.length === 0 && (
          <p className="text-center mt-4 text-[#1C2434] text-[14px] font-semibold">No users found.</p>
        )}
        {currentPageData()?.map((user, i) => (
          <div key={i} className="w-full flex gap-2 px-1 py-4 md:p-4 border-b">
            <div className="w-[40%] md:w-[50%] flex gap-2 md:justify-between items-center">
              <div className="w-[40%] flex">
                <p className="text-[#1C2434] text-[14px] font-semibold overflow-hidden">
                  {user.name}
                </p>
              </div>
              <div className="w-[55%] md:w-[60%] flex">
                <p className="text-[#1C2434] text-[14px] font-semibold overflow-auto">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="w-[60%] md:w-[50%] flex gap-2 md:justify-between items-center">
              <div className="w-[50%] flex justify-evenly">
                <p
                  className={`text-[14px] font-semibold ${
                    user.role === "Admin" ? "text-[#10B981]" : "text-[#ef703a]"
                  }`}
                >
                  {user.role}
                </p>
                <p
                  className={`text-[14px] font-semibold ${
                    user.status === "active"
                      ? "text-[#10B981]"
                      : "text-[#ED7770]"
                  }`}
                >
                  {user.status}
                </p>
              </div>
              <div className="w-[50%] flex flex-col md:flex-row gap-1 md:gap-4 justify-center">
                <button
                  onClick={() => openEditForm(user)}
                  className="bg-[#61e0b6] text-white py-1 md:px-6 md:py-2 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
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
      <div className="w-full flex gap-4 sm:px-6 px-4">
        <div className="w-full flex justify-between items-center bg-[#F7F9FC] pt-2 pb-4 px-4">
          <div className="relative sm:w-[20%] w-full flex items-center rounded-md border border-[#3ad7d7]">
            <select
              name="sort_by"
              value={sortType}
              onChange={handleSortChange}
              className="w-full sm:py-2 py-4 px-2 rounded-lg outline-none"
            >
              <option value="">Sort By</option>
              <option value="Name">Name</option>
              <option value="Email">Email</option>
              <option value="Status">Status</option>
            </select>
          </div>
          <div className="relative sm:w-[35%] w-full flex items-center rounded-md border border-[#3ad7d7]  ">
            <input
              className="w-full sm:py-2 py-4 px-8 rounded-lg"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users ..."
            />
            <CiSearch className="absolute text-[1.3rem] font-semibold ml-2 " />
          </div>
        </div>
      </div>
      <div className="w-full mb-6 mt-3 px-4">
        <div className="w-full h-fit bg-white px-1 py-4 shadow-md">
          <div className="w-full bg-[#F7F9FC] flex p-4">
            <div className="w-[40%] md:w-[50%] flex justify-between items-center">
              <div className="w-[40%] flex">
                <p className="text-[#64748B] text-[12px] font-semibold">Name</p>
              </div>
              <div className="w-[60%] flex">
                <p className="text-[#64748B] text-center text-[12px] font-semibold">
                  Email
                </p>
              </div>
            </div>
            <div className="w-[60%] md:w-[50%] flex justify-between items-center">
              <div className="w-[50%] flex justify-evenly">
                <p className="text-[#64748B] text-[12px] font-semibold">Role</p>
                <p className="text-[#64748B] text-[12px] font-semibold">
                  Status
                </p>
              </div>
              <div className="w-[50%]">
                <p className="text-[#64748B] text-center text-[12px] font-semibold">
                  Action
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-fit ">
            <Pagination data={filteredUsers} />
          </div>
        </div>
      </div>

      {showModal && (
        <Modal onClose={closeModal}>
          <UserForm user={selectedUser} onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default UserList;
