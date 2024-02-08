import React from "react";
import styles from "./taskCard.module.css";

// Define the TaskCard component
interface TaskCardProps {
  title: string;
  description?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        {/* Render task title */}
        <p className={styles.cardTitle}>{title}</p>
        {/* Render task description or a default message if no description provided */}
        <p className={styles.cardPara}>
          {description ? description : "No description"}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
