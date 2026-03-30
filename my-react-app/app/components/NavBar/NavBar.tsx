import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <div className={styles.leftSide}>
        <p>HyperTube</p>
      </div>
      <div className={styles.center}></div>
      <div className={styles.rightSide}></div>
    </nav>
  );
};

export default NavBar;
