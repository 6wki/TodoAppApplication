// Import necessary dependencies and components
"use client";
import styles from "./page.module.css";
import TaskTile from "@/components/TaskTile/TaskTile";
import { useAppSelector } from "@/redux/store";
import { useState, useEffect } from "react";
import { Task } from "../../types";
import Loading from "@/components/Loading/Loading";
import EmptyState from "@/components/EmptyState/EmptyState";
import { Button } from "@mui/material";
import Link from "next/link";

// Define the Home component
export default function Home() {
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
          <div className={styles.landing}>
            <h1>Todo App</h1>
            <div className={styles.actions}>
              <Link target="_blank" href={"/add-task"}>
                <Button variant="contained">Add new task</Button>
              </Link>
              <Link target="_blank" href={"/view-all"}>
                <Button variant="outlined">View all tasks</Button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <Loading /> // Render the Loading component if the page is still loading on the client-side
      )}
    </main>
  );
}
