"use client";

import { House, Search, List, Notebook } from "lucide-react";
import NavItem from "./nav-item";
import styles from "./nav.module.css";

export default function NavList() {
  return (
    <ul className={styles.navList}>
      <li>
        <NavItem Icon={House} path={"/"} label="Home"></NavItem>
      </li>
      <li>
        <NavItem Icon={Search} path={"/shows"} label="Discover"></NavItem>
      </li>
      <li>
        <NavItem Icon={List} path={"/lists"} label="Lists"></NavItem>
      </li>
      <li>
        <NavItem Icon={Notebook} path={"/diary"} label="Diary"></NavItem>
      </li>
    </ul>
  );
}
