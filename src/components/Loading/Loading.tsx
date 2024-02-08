import styles from "./loading.module.css";

// Define the Loading component
const Loading = () => {
  return (
    <>
      <div
        aria-label="Orange and tan hamster running in a metal wheel"
        role="img"
        className={styles.wheelAndHamster}
      >
        {/* Render the wheel and hamster animation */}
        <div className={styles.wheel}></div>
        <div className={styles.hamster}>
          <div className={styles.hamsterBody}>
            <div className={styles.hamsterHead}>
              <div className={styles.hamsterEar}></div>
              <div className={styles.hamsterEye}></div>
              <div className={styles.hamsterNose}></div>
            </div>
            {/* Render hamster limbs */}
            <div
              className={`${styles.hamsterLimb} ${styles.hamsterLimbFr}`}
            ></div>
            <div
              className={`${styles.hamsterLimb} ${styles.hamsterLimbFl}`}
            ></div>
            <div
              className={`${styles.hamsterLimb} ${styles.hamsterLimbBr}`}
            ></div>
            <div
              className={`${styles.hamsterLimb} ${styles.hamsterLimbBl}`}
            ></div>
            {/* Render hamster tail */}
            <div className={styles.hamsterTail}></div>
          </div>
        </div>
        {/* Render wheel spoke */}
        <div className={styles.spoke} />
      </div>
    </>
  );
};

export default Loading;
