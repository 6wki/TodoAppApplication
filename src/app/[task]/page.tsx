"use client";

// Import necessary dependencies and components
import { useEffect, useState } from "react";
import styles from "./task.module.css";
import { useAppSelector } from "@/redux/store"; // Make sure to export RootState from your store
import Loading from "@/components/Loading/Loading";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "@/redux/taskSlice";
import TaskCard from "@/components/TaskCard/TaskCard";
import EditButton from "@/components/Buttons/EditButton/EditButton";
import DeleteButton from "@/components/Buttons/DeleteButton/DeleteButton";
import { Task } from "../../../types";

// Define the ProductDetail component
export default function ProductDetail({
  params,
}: {
  params: { task: string };
}) {
  // Retrieve tasks from the Redux store
  const tasks = useAppSelector((state) => state.tasks);
  // Define state variables for loading and the current task
  const [loading, setLoading] = useState<boolean>(true);
  const [task, setTask] = useState<Task | null>(null); // Use Task interface for task state

  // Initialize useDispatch hook to dispatch actions
  const dispatch = useDispatch();

  // Fetch the task with the given ID when component mounts
  useEffect(() => {
    const selectedTask = tasks.find((task) => task.id === params.task);
    if (selectedTask) {
      setTask(selectedTask);
    }
    setLoading(false);
  }, [tasks, params]);

  // Function to handle task deletion
  const handleDelete = (taskId: string) => {
    // Dispatch an action to delete the task from the Redux store
    dispatch(deleteTask(taskId));
    // Reset the task state to null
    setTask(null);
  };

  // Render the component JSX
  return (
    <div className={styles.taskContainer}>
      {loading ? ( // Show loading indicator if data is loading
        <Loading />
      ) : (
        <>
          {task ? ( // Render task details if task exists
            <div>
              <div className={styles.top}>
                {/* Render EditButton component with task ID */}
                <EditButton taskId={task.id} />
                {/* Render DeleteButton component with task ID and onDelete callback */}
                <DeleteButton taskId={task.id} onDelete={handleDelete} />
              </div>
              {/* Render TaskCard component with task details */}
              <TaskCard description={task.description} title={task.title} />
            </div>
          ) : (
            <p>No task found with ID {params.task}</p> // Show message if task not found
          )}
        </>
      )}
    </div>
  );
}
