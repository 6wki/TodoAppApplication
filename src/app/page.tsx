// Import necessary dependencies and components
"use client";
import styles from "./page.module.css";
import TaskTile from "@/components/TaskTile/TaskTile";
import { addTask } from "@/redux/taskSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { useState, useEffect } from "react";
import { Task } from "../../types";
import { IconButton } from "@mui/material";
import AddTaskDialog from "@/components/AddTaskDialog/AddTaskDialog";
import Loading from "@/components/Loading/Loading";
import EmptyState from "@/components/EmptyState/EmptyState";

// Define the Home component
export default function Home() {
  // Retrieve tasks from the Redux store
  const tasks = useAppSelector((state) => state.tasks);
  // Initialize useDispatch hook to dispatch actions
  const dispatch = useDispatch();

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

  // State variable to control the visibility of the add task dialog
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // State variable to track whether the component is running on the client-side
  const [isClient, setIsClient] = useState(false);

  // Effect to set isClient to true when the component mounts on the client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Render the component JSX
  return (
    <main className={styles.main}>
      {isClient ? ( // Check if the component is running on the client-side
        <>
          {" "}
          {/* Fragment shorthand */}
          {tasks.length > 0 ? ( // Check if there are tasks to display
            <div className={styles.tasks}>
              {/* Map over the tasks array and render TaskTile components */}
              {tasks.map((task: Task) => (
                <TaskTile task={task} key={task.id} />
              ))}
            </div>
          ) : (
            <EmptyState /> // Render the EmptyState component if no tasks are available
          )}
          {/* Render the AddTaskDialog component */}
          <AddTaskDialog
            open={isAddDialogOpen}
            onClose={() => setIsAddDialogOpen(false)} // Close the dialog
            onAdd={handleAddTask} // Pass the handleAddTask function as a callback to add a new task
          />
          {/* Render the IconButton component for adding a new task */}
          <IconButton
            onClick={() => setIsAddDialogOpen(true)} // Open the add task dialog
            className={styles.addButton}
          >
            + {/* Plus icon for adding a new task */}
          </IconButton>
        </>
      ) : (
        <Loading /> // Render the Loading component if the page is still loading on the client-side
      )}
    </main>
  );
}
