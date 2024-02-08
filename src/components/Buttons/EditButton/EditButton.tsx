import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "@/redux/taskSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the props interface for EditButton component
interface EditButtonProps {
  taskId: string; // Task ID to be edited
}

// Define the EditButton component
const EditButton: React.FC<EditButtonProps> = ({ taskId }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setTitle(task.title);
      setDescription(task.description ? task.description : "");
    }
  }, [tasks, taskId]);

  // Function to handle edit button click
  const handleEditClick = () => {
    setOpen(true);
  };

  // Function to handle dialog close
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle confirm edit action
  const handleConfirmEdit = () => {
    if (!title) {
      // Display error toast notification if title is empty
      toast.error("Please fill in the title.");
      return; // Exit early if title is empty
    }

    // Create a partial task object with updated title and description
    const updatedTaskPartial = { id: taskId, title, description };

    // Find the task with the matching ID from the tasks array
    const existingTaskIndex = tasks.findIndex((task) => task.id === taskId);

    if (existingTaskIndex !== -1) {
      // Get the existing task object
      const existingTask = tasks[existingTaskIndex];

      // Merge the updated fields into the existing task object
      const updatedTask = { ...existingTask, ...updatedTaskPartial };

      // Dispatch edit task action with the updated task object
      dispatch(updateTask(updatedTask));

      // Close the dialog
      setOpen(false);

      // Display success toast notification
      toast.success("Task updated successfully!");
    }
  };

  // Render the component JSX
  return (
    <>
      <button className="Btn" onClick={handleEditClick}>
        {" "}
        Edit
        {/* SVG icon for edit */}
        <svg className="svg" viewBox="0 0 512 512">
          <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
        </svg>
      </button>
      {/* Edit task dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            inputProps={{ maxLength: 30 }}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            inputProps={{ maxLength: 50 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleConfirmEdit}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditButton;
