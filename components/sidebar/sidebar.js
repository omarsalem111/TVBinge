import styles from "./sidebar.module.css";
import Logo from "./logo";
import NavList from "./nav/nav";
import Profile from "./profile";
import { Suspense } from "react";

export default function SideBar() {
  return (
    <aside className={styles.sidebar}>
      <Logo></Logo>
      <NavList></NavList>
      <Suspense fallback={<p>Please Wait...</p>}>
        <Profile></Profile>
      </Suspense>
    </aside>
  );
}
