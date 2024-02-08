"use client";

import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { addTask } from "@/redux/taskSlice";
import Loading from "@/components/Loading/Loading";
import styles from "./taskAdd.module.css";

const page = () => {
  const dispatch = useDispatch();

  // State variables to manage the title and description inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // State variable for loading
  const [loading, setLoading] = useState<boolean>(true);

  // Function to handle adding a new task
  const handleAddTask = (title: string, description: string) => {
    // Dispatch an action to add a new task with a unique ID
    dispatch(
      addTask({
        id: String(crypto.randomUUID()), // Generate a unique ID for the new task
        title,
        description,
        completed: false, // Initialize the new task as incomplete
      })
    );
  };

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
        handleAddTask(title, description);
        // Display success toast
        toast.success("Task added successfully!");
        // Clear the input fields and close the dialog
        setTitle("");
        setDescription("");
      }
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className={styles.addTaskContainer}>
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Add New Task</h1>
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
          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
        </form>
      )}
    </div>
  );
};

export default page;
