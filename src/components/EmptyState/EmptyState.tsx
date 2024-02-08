import emptyState from "@/../public/emptyState.svg";
import styles from "./emptyState.module.css";

// Define the EmptyState component
const EmptyState = () => {
  return (
    <div className={styles.emptyState}>
      <h1>There are no tasks currently</h1>
      {/* Render the empty state image */}
      <img src={emptyState.src} alt="empty state" />
    </div>
  );
};

export default EmptyState;
