import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "@/redux/store";

// Define the props interface for AddTaskDialog component
interface AddTaskDialogProps {
  open: boolean; // Indicates whether the dialog is open or not
  onClose: () => void; // Function to close the dialog
  onAdd: (title: string, description: string) => void; // Function to add a new task
}

// Define the AddTaskDialog component
const AddTaskDialog: React.FC<AddTaskDialogProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  // State variables to manage the title and description inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Retrieve tasks from the Redux store
  const tasks = useAppSelector((state) => state.tasks);

  // Function to handle adding a new task
  const handleAdd = () => {
    if (tasks.length >= 4) {
      // Display error toast if the maximum number of tasks is reached
      toast.error("You cannot add more than 4 tasks :'(");
    } else {
      if (!title) {
        // Display error toast if title is empty
        toast.error("Please fill in the title.");
      } else {
        // Call the onAdd function to add a new task
        onAdd(title, description);
        // Display success toast
        toast.success("Task added successfully!");
        // Clear the input fields and close the dialog
        setTitle("");
        setDescription("");
        onClose();
      }
    }
  };

  // Render the component JSX
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Task</DialogTitle>
      <DialogContent>
        {/* Title input field */}
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          inputProps={{ maxLength: 30 }}
        />
        {/* Description input field */}
        <TextField
          margin="dense"
          id="description"
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          inputProps={{ maxLength: 50 }}
        />
      </DialogContent>
      <DialogActions>
        {/* Cancel button */}
        <Button onClick={onClose}>Cancel</Button>
        {/* Add button */}
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;
