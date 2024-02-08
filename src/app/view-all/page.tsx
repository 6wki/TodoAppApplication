// Import necessary dependencies and components
"use client";
import styles from "./viewAll.module.css";
import TaskTile from "@/components/TaskTile/TaskTile";
import { useAppSelector } from "@/redux/store";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading/Loading";
import EmptyState from "@/components/EmptyState/EmptyState";
import { Task } from "../../../types";

// Define the Home component
export default function page() {
  // Retrieve tasks from the Redux store
  const tasks = useAppSelector((state) => state.tasks);

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
        </>
      ) : (
        <Loading /> // Render the Loading component if the page is still loading on the client-side
      )}
    </main>
  );
}
