import styles from "./sidebar.module.css";
import Logo from "./logo";
import NavList from "./nav/nav";
import Profile from "./profile";

export default function SideBar() {
  return (
    <aside className={styles.sidebar}>
      <Logo></Logo>
      <NavList></NavList>
      <Profile></Profile>
    </aside>
  );
}
