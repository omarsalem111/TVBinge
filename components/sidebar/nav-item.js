import Link from "next/link";
import styles from "./sidebar.module.css";

export default function NavItem({ Icon, path, label }) {
  return (
    <div className={styles.navItem}>
      <Icon size={24}></Icon>
      <Link href={path}>{label}</Link>
    </div>
  );
}
