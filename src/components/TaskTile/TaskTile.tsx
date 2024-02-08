import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTaskCompletion } from "@/redux/taskSlice";
import trash from "@/../public/trash.svg";
import link from "@/../public/open-link.svg";
import styles from "./taskTile.module.css";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import DeletePopup from "../DeletePopup/DeletePopup";
import { Task } from "../../../types";

// Define the TaskTile component
interface TaskTileProps {
  task: Task;
}

const TaskTile: React.FC<TaskTileProps> = ({ task }) => {
  const dispatch = useDispatch();

  // Function to toggle task completion status
  const handleToggleCompletion = (id: string) => {
    dispatch(toggleTaskCompletion(id));
  };

  const [open, setOpen] = useState(false);

  // Function to handle delete button click
  const handleDeleteClick = () => {
    setOpen(true);
  };

  // Function to handle dialog close
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle confirm delete action
  const handleConfirmDelete = () => {
    dispatch(deleteTask(task.id));
    setOpen(false);
  };

  return (
    <div className={styles.taskTileContainer}>
      <div key={task.id} className={styles.task}>
        {/* Checkbox section */}
        <div className={styles.checkboxWrapper}>
          <div className={styles.cbx}>
            <input
              type="checkbox"
              id={`cbx-${task.id}`}
              checked={task.completed}
              onChange={() => handleToggleCompletion(task.id)}
            />
            <label htmlFor={`cbx-${task.id}`}></label>
            <svg fill="none" viewBox="0 0 15 14" height="14" width="15">
              <path d="M2 8.36364L6.23077 12L13 2"></path>
            </svg>
          </div>
          {/* End of checkbox section */}
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="goo-12">
                <feGaussianBlur
                  result="blur"
                  stdDeviation="4"
                  in="SourceGraphic"
                ></feGaussianBlur>
                <feColorMatrix
                  result="goo-12"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                  mode="matrix"
                  in="blur"
                ></feColorMatrix>
                <feBlend in2="goo-12" in="SourceGraphic"></feBlend>
              </filter>
            </defs>
          </svg>
        </div>
        {/* Render task title */}
        <p
          onClick={() => handleToggleCompletion(task.id)}
          className={task.completed ? styles.done : ""}
        >
          {task.title}
        </p>
      </div>

      {/* Actions section */}
      <div className={styles.actions}>
        {/* Delete button */}
        <IconButton onClick={() => handleDeleteClick()}>
          <img width={20} src={trash.src} alt="trash" />
        </IconButton>
        {/* Link button */}
        <Link href={task.id} target="_blank">
          <IconButton>
            <img width={20} src={link.src} alt="link" />
          </IconButton>
        </Link>
      </div>

      {/* Delete confirmation popup */}
      <DeletePopup
        taskId={task.id}
        open={open}
        onClose={handleClose}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default TaskTile;
