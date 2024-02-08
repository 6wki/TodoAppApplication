import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./deleteButton.module.css";
import DeletePopup from "@/components/DeletePopup/DeletePopup";

// Define the props interface for DeleteButton component
interface DeleteButtonProps {
  taskId: string; // Task ID to be deleted
  onDelete: (taskId: string) => void; // Callback function for deleting a task
}

// Define the DeleteButton component
const DeleteButton: React.FC<DeleteButtonProps> = ({ taskId, onDelete }) => {
  const [open, setOpen] = useState(false);

  // Function to handle delete button click
  const handleDeleteClick = () => {
    setOpen(true);
  };

  // Function to handle close event of delete popup
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle confirm delete action
  const handleConfirmDelete = () => {
    onDelete(taskId); // Call onDelete callback with the taskId parameter
    setOpen(false); // Close the delete popup
  };

  // Render the component JSX
  return (
    <>
      <button
        className={`${styles.deleteColor} Btn`}
        onClick={handleDeleteClick}
      >
        Delete
        {/* SVG icon for delete */}
        <svg
          className="svg"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M6 5H18M9 5V5C10.5769 3.16026 13.4231 3.16026 15 5V5M9 20H15C16.1046 20 17 19.1046 17 18V9C17 8.44772 16.5523 8 16 8H8C7.44772 8 7 8.44772 7 9V18C7 19.1046 7.89543 20 9 20Z"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </svg>
      </button>
      {/* DeletePopup component */}
      <DeletePopup
        taskId={taskId}
        open={open}
        onClose={handleClose}
        onConfirmDelete={handleConfirmDelete}
      />
    </>
  );
};

export default DeleteButton;
