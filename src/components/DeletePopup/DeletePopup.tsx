import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

// Define the props interface for DeletePopup component
interface DeletePopupProps {
  taskId: string; // ID of the task to be deleted
  open: boolean; // Boolean to control the visibility of the popup
  onClose: () => void; // Function to handle popup close
  onConfirmDelete: () => void; // Function to handle delete confirmation
}

// Define the DeletePopup component
const DeletePopup: React.FC<DeletePopupProps> = ({
  taskId,
  open,
  onClose,
  onConfirmDelete,
}) => {
  // Retrieve the task from the Redux store using taskId
  const task = useSelector((state: RootState) =>
    state.tasks.find((task) => task.id === taskId)
  );

  // Function to handle delete confirmation
  const handleConfirmDelete = () => {
    if (task) {
      // Call onConfirmDelete function
      onConfirmDelete();
      // Close the popup
      onClose();
      // Display success toast notification
      toast.success(`Task "${task.title}" deleted successfully!`);
    } else {
      // Display error toast notification if task is not found
      toast.error("Task not found.");
    }
  };

  // Render the component JSX
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        {task
          ? `Are you sure you want to delete the task "${task.title}"?`
          : "Task not found"}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {/* Button to confirm delete action */}
        <Button onClick={handleConfirmDelete} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePopup;
