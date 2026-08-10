"use client";

import Link from "next/link";
import styles from "./nav.module.css";
import { usePathname } from "next/navigation";

export default function NavItem({ Icon, path, label }) {
  const urlPath = usePathname();
  return (
    <div
      className={
        urlPath === path
          ? `${styles.navItem} ${styles.active}`
          : `${styles.navItem}`
      }
    >
      <Icon size={24}></Icon>
      <Link href={path}>{label}</Link>
    </div>
  );
}
