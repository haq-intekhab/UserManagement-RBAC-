import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-[2000] bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-full max-w-md mx-4 sm:mx-0 sm:w-2/3 relative">
        <button
          onClick={onClose}
          className="text-red-500 absolute top-2 right-3 text-3xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
